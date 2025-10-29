import { useMemo } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
// Import videos - update these paths when you add the second video
import borderVideo from "../assets/HeaderSectionVideo.mp4"; // Video for rounded border
import backgroundImage from "../assets/Background.png";
// import doDealVideo from "../assets/HeaderSectionVideo.mp4"; // Video for DO DEAL text (temporary - replace with actual DO DEAL video)

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

const Hero = () => {
  const socialMedia = [
    { icon: FaFacebookF, name: "Facebook" },
    { icon: FaInstagram, name: "Instagram" },
    { icon: FaLinkedinIn, name: "LinkedIn" },
    { icon: FaSnapchatGhost, name: "Snapchat" },
    { icon: FaTiktok, name: "TikTok" },
  ];

  // Generate stars once for consistent rendering
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
    }));
  }, []);

  const starClusters = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: 30 + Math.random() * 40,
      top: 40 + Math.random() * 20,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Milky Way Galaxy Stars Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full star-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          ></div>
        ))}

        {/* Additional denser star clusters for galaxy effect */}
        {starClusters.map((cluster) => (
          <div
            key={`cluster-${cluster.id}`}
            className="absolute bg-white rounded-full"
            style={{
              left: `${cluster.left}%`,
              top: `${cluster.top}%`,
              width: `${cluster.size}px`,
              height: `${cluster.size}px`,
              opacity: cluster.opacity,
              animation: `twinkle ${cluster.duration}s ease-in-out infinite`,
              animationDelay: `${cluster.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Dark Round Element Moving Left to Right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute dark-orb"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(10,25,41,0.8) 0%, rgba(10,25,41,0.4) 50%, transparent 100%)",
            filter: "blur(60px)",
            top: "50%",
            left: "-200px",
            transform: "translateY(-50%)",
            animation: "moveLeftToRight 10s linear infinite",
          }}
        ></div>
      </div>

      {/* Rounded Border Video - Background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src={borderVideo} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-20 sm:mt-24 md:mt-32">
        {/* Main Headline - Single Line */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
          <span className="text-white">DO MORE </span>
          <span style={{ color: "rgba(0, 174, 107, 1)" }}>DEALS</span>
          <span className="text-white"> WITH</span>
        </h1>

        {/* DO DEAL Video - Large Text Replacement */}
        <div className="relative mb-6 md:mb-8 flex items-center justify-center w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl h-auto"
          >
            {/* <source src={doDealVideo} type="video/mp4" /> */}
          </video>
        </div>

        {/* Sub-headline */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-4 lg:mt-36">
          From Strategy To Execution, We Help You Unlock Opportunities And
          Exceed Expectations Do More With Every Deal
        </p>

        {/* CTA Button and Social Media Links */}
        <div className="flex flex-col items-center gap-6 md:gap-8 mt-28 sm:mt-16 md:mt-28 lg:mt-44">
          {/* CTA Button */}
          <div
            className="relative cta-button-wrapper group"
            style={{ width: "fit-content" }}
            onMouseEnter={(e) => {
              const particleElement = e.currentTarget.querySelector(
                ".cta-gif-background"
              );
              if (particleElement) particleElement.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const particleElement = e.currentTarget.querySelector(
                ".cta-gif-background"
              );
              if (particleElement) particleElement.style.opacity = "0";
            }}
          >
            {/* Animated Particle Background - Behind button on hover */}
            <ParticleAnimation
              className="cta-gif-background transition-opacity duration-300"
              style={{
                width: "100%",
                minWidth: "250px",
                height: "150px",
                opacity: 0,
                zIndex: 0,
              }}
            />
            {/* Button */}
            <button
              className="cta-connect-button border-2 border-primary-green text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-medium text-sm sm:text-base md:text-lg transition-all relative"
              style={{
                backgroundColor: "rgba(0, 174, 107, 0.2)",
                backdropFilter: "blur(10px)",
                // WebkitBackdropFilter: "blur(10px)",
                zIndex: 50,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 174, 107, 0.85)";
                e.target.style.color = "rgba(@)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0, 174, 107, 0.2)";
                e.target.style.color = "rgba(255, 255, 255, 1)";
              }}
            >
              Connect Now
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className="social-icon-glass-card w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative"
                  aria-label={social.name}
                >
                  <div className="social-icon-glass-card-inner">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
