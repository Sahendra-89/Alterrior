import { useState } from "react";
import "./LeadForm.css";

const BHK_OPTIONS = [
  { id: "kitchen", label: "Modular kitchen", icon: "🍳" },
  { id: "wardrobes", label: "Modular wardrobes", icon: "👔" },
  { id: "furniture", label: "Furniture", icon: "🛋️" },
  { id: "vanity", label: "Vanity", icon: "🪞" },
  { id: "study", label: "Study table", icon: "📚" },
  { id: "door", label: "Modular door with modular frames", icon: "🚪" },
  { id: "crockery", label: "Crockery unit", icon: "🍽️" },
];

const KITCHEN_FINISHES = [
  { id: "laminated", label: "Laminated Kitchen" },
  { id: "acrylic", label: "Acrylic Kitchen" },
  { id: "pu-matte", label: "PU Matte Kitchen" },
  { id: "italian", label: "Italian Kitchen" },
  { id: "pu-european", label: "PU European Kitchen" },
  { id: "veneer", label: "Veneer Kitchen" },
];

const WARDROBE_STYLES = [
  { id: "classic-tv", label: "Classic TV Unit" },
  { id: "contemporary-tv", label: "Contemporary TV Unit" },
  { id: "european-tv", label: "European TV Unit" },
  { id: "modern-tv", label: "Modern TV Unit" },
];

const FURNITURE_STYLES = [
  { id: "modular-bed", label: "Modular Bed" },
  { id: "modular-bed-back", label: "Modular Bed with Back Panel" },
  { id: "modular-dresser", label: "Modular Dresser" },
  { id: "modern-dining", label: "Modern Dining Table with Chair" },
];

const VANITY_STYLES = [
  { id: "double-vanity", label: "Double Vanity" },
  { id: "floating-vanity", label: "Floating Vanity" },
  { id: "modern-vanity", label: "Modern Vanity" },
  { id: "traditional-vanity", label: "Traditional Vanity" },
];

const STUDY_STYLES = [
  { id: "classic-modern-study", label: "Classic Modern Study Table" },
  { id: "classic-veneer-study", label: "Classic Veneer Study Table" },
  { id: "contemporary-study", label: "Contemporary Study Table" },
  { id: "modern-study", label: "Modern Study Table" },
];

const DOOR_STYLES = [
  { id: "classic-modern-door", label: "Classic Modern Door" },
  { id: "classic-veneer-door", label: "Classic Veneer Door" },
  { id: "modular-contemporary-door", label: "Modular Contemporary Door" },
  { id: "modular-metallic-door", label: "Modular Metallic Door" },
  { id: "modern-door", label: "Modern Door" },
];

const CROCKERY_STYLES = [
  { id: "classic-modern-bar", label: "Classic Modern Bar & Unit" },
  { id: "classic-modern-crockery", label: "Classic Modern Crockery Unit" },
  { id: "classic-veneer-bar", label: "Classic Veneer Bar Unit" },
  { id: "classic-veneer-crockery", label: "Classic Veneer Crockery Unit" },
  { id: "modern-bar", label: "Modern Bar Unit" },
  { id: "modern-crockery", label: "Modern Crockery Unit" },
];

function CircleProgress({ step, totalSteps }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = step / totalSteps;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="lf-progress-ring"
      aria-label={`Step ${step} of ${totalSteps}`}
    >
      <svg width="44" height="44">
        <circle
          r={radius}
          cx="22"
          cy="22"
          fill="transparent"
          stroke="var(--color-border)"
          strokeWidth="3"
        />
        <circle
          r={radius}
          cx="22"
          cy="22"
          fill="transparent"
          stroke="var(--color-sage-dark)"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "22px 22px",
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="4px"
          fontSize="9"
          fontWeight="600"
          fill="var(--color-text-muted)"
        >
          {step}/{totalSteps}
        </text>
      </svg>
    </div>
  );
}

export default function LeadForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({
    bhk: "",
    kitchenLayout: "",
    wardrobeStyle: "",
    furnitureStyle: "",
    vanityStyle: "",
    studyStyle: "",
    doorStyle: "",
    crockeryStyle: "",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const views = ["type"];
  if (selected.bhk === "kitchen") views.push("kitchen_finish");
  if (selected.bhk === "wardrobes") views.push("wardrobe_style");
  if (selected.bhk === "furniture") views.push("furniture_style");
  if (selected.bhk === "vanity") views.push("vanity_style");
  if (selected.bhk === "study") views.push("study_style");
  if (selected.bhk === "door") views.push("door_style");
  if (selected.bhk === "crockery") views.push("crockery_style");
  views.push("contact");

  const totalSteps = views.length;
  const currentView = views[step - 1];

  const handleNext = () => {
    if (currentView === "type" && !selected.bhk) {
      setError("Please select your design requirement.");
      return;
    }
    if (currentView === "kitchen_finish" && !selected.kitchenLayout) {
      setError("Please select a kitchen finish.");
      return;
    }
    if (currentView === "wardrobe_style" && !selected.wardrobeStyle) {
      setError("Please select a TV unit style.");
      return;
    }
    if (currentView === "furniture_style" && !selected.furnitureStyle) {
      setError("Please select a furniture style.");
      return;
    }
    if (currentView === "vanity_style" && !selected.vanityStyle) {
      setError("Please select a vanity style.");
      return;
    }
    if (currentView === "study_style" && !selected.studyStyle) {
      setError("Please select a study table style.");
      return;
    }
    if (currentView === "door_style" && !selected.doorStyle) {
      setError("Please select a door style.");
      return;
    }
    if (currentView === "crockery_style" && !selected.crockeryStyle) {
      setError("Please select a crockery/bar unit style.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^\d{10}$/.test(selected.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lf-card lf-success">
        <div className="lf-success-icon">✓</div>
        <h3>Thank You, {selected.name}!</h3>
        <p>Our design consultant will call you within 24 hours.</p>
        {onClose && (
          <button className="lf-close-success" onClick={onClose}>
            Got it
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="lf-card">
      <CircleProgress step={step} totalSteps={totalSteps} />

      {currentView === "type" && (
        <>
          <h3 className="lf-title">What type of Altera Interior?</h3>
          <p className="lf-subtitle">Select your design requirement</p>
          <div className="lf-bhk-grid">
            {BHK_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`lf-bhk-btn${selected.bhk === opt.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({
                    ...s,
                    bhk: opt.id,
                    kitchenLayout: opt.id === "kitchen" ? s.kitchenLayout : "",
                    wardrobeStyle: opt.id === "wardrobes" ? s.wardrobeStyle : "",
                    furnitureStyle: opt.id === "furniture" ? s.furnitureStyle : "",
                    vanityStyle: opt.id === "vanity" ? s.vanityStyle : "",
                    studyStyle: opt.id === "study" ? s.studyStyle : "",
                    doorStyle: opt.id === "door" ? s.doorStyle : "",
                    crockeryStyle: opt.id === "crockery" ? s.crockeryStyle : "",
                  }));
                  setError("");
                }}
              >
                <span className="lf-bhk-icon">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {error && <p className="lf-error">{error}</p>}
          <button className="lf-next-btn" onClick={handleNext}>
            Next →
          </button>
          <p className="lf-disclaimer">
            By continuing, you agree to our{" "}
            <a href="/privacy">privacy policy</a> &amp;{" "}
            <a href="/terms">terms</a>
          </p>
        </>
      )}

      {currentView === "kitchen_finish" && (
        <>
          <h3 className="lf-title">Select Kitchen Finish</h3>
          <p className="lf-subtitle">Choose your preferred material</p>
          <div
            className="lf-rooms-list"
            style={{
              maxHeight: "280px",
              overflowY: "auto",
              paddingRight: "4px",
            }}
          >
            {KITCHEN_FINISHES.map((layout) => (
              <button
                key={layout.id}
                className={`lf-room-btn${selected.kitchenLayout === layout.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, kitchenLayout: layout.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.kitchenLayout === layout.id ? "✓" : ""}
                </span>
                {layout.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "wardrobe_style" && (
        <>
          <h3 className="lf-title">Select TV Unit Style</h3>
          <p className="lf-subtitle">Choose your preferred design</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {WARDROBE_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.wardrobeStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, wardrobeStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.wardrobeStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "furniture_style" && (
        <>
          <h3 className="lf-title">Select Furniture Style</h3>
          <p className="lf-subtitle">Choose your preferred furniture</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {FURNITURE_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.furnitureStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, furnitureStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.furnitureStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "vanity_style" && (
        <>
          <h3 className="lf-title">Select Vanity Style</h3>
          <p className="lf-subtitle">Choose your preferred vanity</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {VANITY_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.vanityStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, vanityStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.vanityStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "study_style" && (
        <>
          <h3 className="lf-title">Select Study Table Style</h3>
          <p className="lf-subtitle">Choose your preferred study table</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {STUDY_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.studyStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, studyStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.studyStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "door_style" && (
        <>
          <h3 className="lf-title">Select Door Style</h3>
          <p className="lf-subtitle">Choose your preferred door</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {DOOR_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.doorStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, doorStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.doorStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "crockery_style" && (
        <>
          <h3 className="lf-title">Select Unit Style</h3>
          <p className="lf-subtitle">Choose your preferred design</p>
          <div className="lf-rooms-list" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
            {CROCKERY_STYLES.map((style) => (
              <button
                key={style.id}
                className={`lf-room-btn${selected.crockeryStyle === style.id ? " selected" : ""}`}
                onClick={() => {
                  setSelected((s) => ({ ...s, crockeryStyle: style.id }));
                  setError("");
                }}
              >
                <span className="lf-check">
                  {selected.crockeryStyle === style.id ? "✓" : ""}
                </span>
                {style.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
            <button className="lf-next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        </>
      )}

      {currentView === "contact" && (
        <>
          <h3 className="lf-title">Get your free design quote</h3>
          <p className="lf-subtitle">Our expert calls you within 24 hrs</p>
          <form onSubmit={handleSubmit} className="lf-contact-form">
            <input
              type="text"
              placeholder="Your Name"
              value={selected.name}
              onChange={(e) => {
                setSelected((s) => ({ ...s, name: e.target.value }));
                setError("");
              }}
              className="lf-input"
            />
            <div className="lf-phone-row">
              <span className="lf-phone-flag">🇮🇳 +91</span>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={selected.phone}
                maxLength={10}
                onChange={(e) => {
                  setSelected((s) => ({
                    ...s,
                    phone: e.target.value.replace(/\D/g, ""),
                  }));
                  setError("");
                }}
                className="lf-input lf-phone-input"
              />
            </div>
            {error && <p className="lf-error">{error}</p>}
            <div className="lf-btn-row">
              <button
                type="button"
                className="lf-back-btn"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </button>
              <button type="submit" className="lf-submit-btn">
                Get Free Quote
              </button>
            </div>
          </form>
          <p className="lf-disclaimer">
            By submitting, you agree to our{" "}
            <a href="/privacy">privacy policy</a> &amp;{" "}
            <a href="/terms">terms</a>
          </p>
        </>
      )}
    </div>
  );
}
