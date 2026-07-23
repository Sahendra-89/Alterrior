import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './BudgetCarousel.css';

const BUDGET_CARDS = [
  {
    id: '1bhk',
    label: '1 BHK',
    price: 'Starting at ₹2.5L*',
    image: '/assets/portfolio/living-room-luxury.jpg',
    rooms: '2 Rooms',
  },
  {
    id: '2bhk',
    label: '2 BHK',
    price: 'Starting at ₹3.5L*',
    image: '/assets/portfolio/bedroom-dark.jpg',
    rooms: '3 Rooms',
  },
  {
    id: '3bhk',
    label: '3 BHK',
    price: 'Starting at ₹5.2L*',
    image: '/assets/portfolio/living-tropical.jpg',
    rooms: '4 Rooms',
  },
  {
    id: '4bhk',
    label: '4 BHK+',
    price: 'Starting at ₹7.8L*',
    image: '/assets/portfolio/living-artdeco.jpg',
    rooms: '5+ Rooms',
  },
  {
    id: 'kitchen',
    label: 'Modular Kitchen',
    price: 'Starting at ₹1.2L*',
    image: '/assets/portfolio/kitchen-ivory.jpg',
    rooms: 'Kitchen Only',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    price: 'Starting at ₹1.5L*',
    image: '/assets/portfolio/bedroom-coastal.jpg',
    rooms: 'Bedroom Only',
  },
  {
    id: 'living',
    label: 'Living Room',
    price: 'Starting at ₹1.0L*',
    image: '/assets/portfolio/dining-terracotta.jpg',
    rooms: 'Living Only',
  },
];


export default function BudgetCarousel() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
    setTimeout(() => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }, 350);
  };

  return (
    <div className="bc-wrapper">
      <div className="bc-track" ref={trackRef}>
        {BUDGET_CARDS.map((card) => (
          <Link key={card.id} to="/services" className="bc-card">
            <div
              className="bc-card-bg"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Dark overlay for readability */}
            <div className="bc-card-darken" />
            {/* Price badge */}
            <div className="bc-price-badge">{card.price}</div>
            {/* Bottom overlay */}
            <div className="bc-overlay">
              <span className="bc-rooms">{card.rooms}</span>
              <span className="bc-label">{card.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrow Controls */}
      {canScrollLeft && (
        <button className="bc-arrow bc-arrow-left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {canScrollRight && (
        <button className="bc-arrow bc-arrow-right" onClick={() => scroll(1)} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}

      <p className="bc-note">*Prices include modular interiors for new homes. Final cost may vary based on specifications.</p>
    </div>
  );
}
