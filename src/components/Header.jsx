import { useState, useMemo } from "react";
import logo from "../assets/DoDealLogo.png";

// Particle Animation Component
const ParticleAnimation = ({ className = "", style = {} }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: ["small", "medium", "large", "x-large"][
        Math.floor(Math.random() * 4)
      ],
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    }));
  }, []);

  return (
    <div className={`particle-animation-container ${className}`} style={style}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`animated-particle ${particle.size}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "About",
    "Services",
    "Cases",
    "Latest",
    "Connect us",
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background:
          "linear-gradient(180deg, rgba(217, 217, 217, 0.04) 0%, rgba(115, 115, 115, 0.04) 100%)",
        backdropFilter: "blur(21.600000381469727px)",
        WebkitBackdropFilter: "blur(21.600000381469727px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[120px] py-4 sm:py-6 md:py-[34px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="DoDeal Logo"
              className="h-8 sm:h-10 md:h-auto w-auto object-contain"
            />
            <span
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #00FF9E 0%, #00D885 25%, #00AE6B 50%, #00FF9E 75%, #00FF9E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(0, 255, 158, 0.3)",
                filter: "drop-shadow(0 0 8px rgba(0, 255, 158, 0.5))",
                animation: "heartbeat 3s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              DoDeal
            </span>
          </div>

          {/* Desktop Navigation - Pill-shaped container */}
          <nav className="hidden lg:flex items-center nav-pill-container">
            <div className="nav-pill-container-inner">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  onClick={() => setActiveLink(link)}
                  className={`relative transition-colors nav-link ${
                    activeLink === link
                      ? "text-primary-green"
                      : "text-[#BBBBBB] hover:text-primary-green"
                  }`}
                >
                  {link}
                  {activeLink === link && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white active-link-bar"></span>
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button - Only show on small/medium screens */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex lg:hidden text-white p-2 z-50"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* CTA Button - Only show on desktop */}
          <div
            className="hidden lg:block relative"
            style={{ width: "182px", height: "53px", zIndex: 1 }}
          >
            {/* Animated Particle Background - Behind button */}
            <ParticleAnimation
              className="absolute rounded-full overflow-visible"
              style={{
                width: "250px",
                height: "150px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: -1,
              }}
            />
            {/* Button with styles - On top of particles */}
            <button
              className="absolute inset-0 text-white rounded-full transition-colors get-in-touch-btn flex items-center justify-center relative"
              style={{
                width: "182px",
                height: "53px",
                padding: "20px 36px",
                backgroundColor: "rgba(0, 174, 107, 0.85)",
                border: "1px solid rgba(3, 255, 158, 1)",
                borderRadius: "999px",
                fontFamily: '"Effra Trial", "Effra", sans-serif',
                fontWeight: 400,
                fontSize: "16px",
                whiteSpace: "nowrap",
                lineHeight: "1",
                letterSpacing: "0px",
                textTransform: "capitalize",
                color: "rgba(255, 255, 255, 1)",
                boxShadow: "0px 0px 20.7px 0px rgba(0, 174, 107, 0.74)",
                zIndex: 1,
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "")}`}
                onClick={() => {
                  setActiveLink(link);
                  setIsMenuOpen(false);
                }}
                className={`block text-white py-2 text-base ${
                  activeLink === link
                    ? "text-primary-green font-semibold"
                    : "text-white/80"
                }`}
              >
                {link}
              </a>
            ))}
            <div
              className="relative w-full mt-4"
              style={{ height: "53px", zIndex: 1 }}
            >
              {/* Animated Particle Background - Behind button */}
              <ParticleAnimation
                className="absolute rounded-full overflow-visible"
                style={{
                  width: "100%",
                  minWidth: "250px",
                  height: "150px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: -1,
                }}
              />
              {/* Button - On top of particles */}
              <button
                className="absolute inset-0 w-full text-white rounded-full flex items-center justify-center relative"
                style={{
                  height: "53px",
                  padding: "20px 36px",
                  backgroundColor: "rgba(0, 174, 107, 0.95)",
                  border: "1px solid rgba(3, 255, 158, 1)",
                  borderRadius: "999px",
                  fontFamily: '"Effra Trial", "Effra", sans-serif',
                  fontWeight: 400,
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                  lineHeight: "1",
                  letterSpacing: "0px",
                  textTransform: "capitalize",
                  color: "rgba(255, 255, 255, 1)",
                  boxShadow: "0px 0px 20.7px 0px rgba(0, 174, 107, 0.74)",
                  zIndex: 1,
                }}
              >
                Get In Touch
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
