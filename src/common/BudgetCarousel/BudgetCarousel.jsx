import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './BudgetCarousel.css';

const BUDGET_CARDS = [
  {
    id: 'kitchen',
    label: 'Modular Kitchen',
    price: 'Starting at ₹1.5L*',
    image: '/assets/portfolio/modular-kitchen.jpg',
    rooms: 'Premium Modular',
  },
  {
    id: 'wardrobes',
    label: 'Modular Wardrobes',
    price: 'Starting at ₹70k*',
    image: '/assets/portfolio/modular-wardrobe.jpg',
    rooms: 'Bespoke Storage',
  },
  {
    id: 'furniture',
    label: 'Furniture',
    price: 'Starting at ₹50k*',
    image: '/assets/portfolio/modular-furniture.jpg',
    rooms: 'Living & Dining',
  },
  {
    id: 'vanity',
    label: 'Vanity',
    price: 'Starting at ₹1.0L*',
    image: '/assets/portfolio/modular-vanity.jpg',
    rooms: 'Bathrooms',
  },
  {
    id: 'study',
    label: 'Study Table',
    price: 'Starting at ₹1.2L*',
    image: '/assets/portfolio/modular-study.jpg',
    rooms: 'Home Office',
  },
  {
    id: 'door',
    label: 'Modular Door & Frames',
    price: 'Starting at ₹80k*',
    image: '/assets/portfolio/modular-door.jpg',
    rooms: 'Entrance & Rooms',
  },
  {
    id: 'crockery',
    label: 'Crockery Unit',
    price: 'Starting at ₹1.3L*',
    image: '/assets/portfolio/modular-crockery.jpg',
    rooms: 'Dining Room',
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
