import { useState, useEffect } from "react";
import BrandingServicesIcon from "../assets/BrandingServices.png";
import PaidCampaignIcon from "../assets/paidCampaign.png";
import DigitalMarketingIcon from "../assets/digitalMarketing.svg";
import SocialMediaIcon from "../assets/socialMedia.png";
import seeMoreArrow from "../assets/seeMoreArrow.png";
import { backgroundImage } from "../constants/assets";

const Services = () => {
  const [selectedService, setSelectedService] = useState("Branding Services");
  const [previousService, setPreviousService] = useState("Branding Services");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Track actual positions of services (can change when services swap positions)
  const [serviceCurrentPositions, setServiceCurrentPositions] = useState({});

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Track previous service for exit animation
  useEffect(() => {
    if (selectedService !== previousService) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousService(selectedService);
      }, 600); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [selectedService, previousService]);

  // All services in order for mobile navigation
  const servicesList = [
    "Branding Services",
    "SEO & SEM",
    "Paid Campaigns",
    "Digital Marketing",
    "Social Media",
  ];

  // Fixed positions for each service around the circle (never change)
  const servicePositions = {
    "SEO & SEM": { top: "-12%", right: "-16%" },
    "Paid Campaigns": { top: "14%", right: "0%" },
    "Branding Services": { top: "52%", left: "15%" },
    "Digital Marketing": { top: "80%", right: "0%" },
    "Social Media": { top: "100%", right: "-16%" },
  };

  // Get position for a service (returns null if selected)
  const getServicePosition = (serviceName, selectedServiceName) => {
    // If this service is selected, don't show it (it's in the button)
    if (serviceName === selectedServiceName) {
      return null;
    }

    // If service has a custom current position (from previous swap), use that
    if (serviceCurrentPositions[serviceName]) {
      return serviceCurrentPositions[serviceName];
    }

    // Otherwise return the fixed position for this service
    return servicePositions[serviceName] || null;
  };

  // All services with their icons
  const allServices = [
    {
      name: "SEO & SEM",
      icon: null,
    },
    {
      name: "Paid Campaigns",
      icon: PaidCampaignIcon,
    },
    {
      name: "Branding Services",
      icon: BrandingServicesIcon,
    },
    {
      name: "Digital Marketing",
      icon: DigitalMarketingIcon,
    },
    {
      name: "Social Media",
      icon: SocialMediaIcon,
    },
  ];

  // Service details mapping
  const serviceDetails = {
    "Branding Services": {
      title: "Branding Services",
      subtitle: "Build A Distinctive & Memorable Identity",
      description:
        "Build A Lasting Impression Through Innovative Branding Strategies And Creative Design",
      icon: BrandingServicesIcon,
      position: { top: "50%", left: "30%" },
      angle: 90,
    },
    "SEO & SEM": {
      title: "SEO & SEM",
      subtitle: "Boost Your Search Visibility",
      description:
        "Optimize your online presence and reach the top of search results with our comprehensive SEO and SEM strategies",
      icon: null,
      position: { top: "0%", right: "0%" },
      angle: 0,
    },
    "Paid Campaigns": {
      title: "Paid Campaigns",
      subtitle: "Maximize Your Advertising ROI",
      description:
        "Drive targeted traffic and conversions with strategically planned and executed paid advertising campaigns",
      icon: PaidCampaignIcon,
      position: { top: "32%", right: "5%" },
      angle: 45,
    },
    "Digital Marketing": {
      title: "Digital Marketing",
      subtitle: "Comprehensive Digital Solutions",
      description:
        "Transform your digital presence with our end-to-end digital marketing solutions tailored to your business needs",
      icon: DigitalMarketingIcon,
      position: { top: "65%", right: "8%" },
      angle: 135,
    },
    "Social Media": {
      title: "Social Media Marketing",
      subtitle: "Amplify Your Brand's Online Impact",
      description:
        "Transform Your Social Media Presence Into A Powerful Marketing Asset With Our Expert Solutions",
      icon: SocialMediaIcon,
      position: { top: "80%", right: "12%" },
      angle: 180,
    },
  };

  const currentService =
    serviceDetails[selectedService] || serviceDetails["Branding Services"];

  const [animatingService, setAnimatingService] = useState(null);
  const [exitingService, setExitingService] = useState(null);

  const handleServiceClick = (serviceName) => {
    if (serviceName !== selectedService) {
      // Get the current position of the service being clicked (before selection changes)
      // This is where the clicked service currently is, and where the exiting service should go
      const clickedServicePosition = getServicePosition(
        serviceName,
        selectedService
      );

      if (clickedServicePosition) {
        // Animate the clicked service moving to center
        setAnimatingService({
          name: serviceName,
          position: clickedServicePosition,
          icon: allServices.find((s) => s.name === serviceName)?.icon,
        });

        // Clear animation after transition
        setTimeout(() => {
          setAnimatingService(null);
        }, 800);

        // Animate the current selected service (from center) moving to clicked service's position
        const exitingServiceData = {
          name: selectedService,
          position: clickedServicePosition, // Go to the clicked service's position
          icon: allServices.find((s) => s.name === selectedService)?.icon,
          startFromCenter: true,
        };

        setExitingService(exitingServiceData);

        // Use double requestAnimationFrame to ensure DOM is updated and browser can optimize
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setExitingService((prev) =>
              prev
                ? {
                    ...prev,
                    startFromCenter: false,
                  }
                : null
            );
          });
        });

        // After animation completes, update the position mapping
        // The exiting service (Branding Services) should now be at clicked service's position
        setTimeout(() => {
          setExitingService(null);
          // Update position mapping:
          // 1. Exiting service (selectedService, e.g., Branding Services) now occupies clicked service's position
          // 2. Clear the clicked service's custom position since it's now in center
          setServiceCurrentPositions((prev) => {
            const updated = { ...prev };
            updated[selectedService] = clickedServicePosition; // Branding Services at clicked service's position
            // Remove clicked service from custom positions since it's now selected (in center)
            delete updated[serviceName];
            return updated;
          });
        }, 850); // Slightly longer than transition duration
      } else {
        // Even if there's no animation overlay, update positions when service changes
        // This handles cases where position tracking needs to be maintained
        setServiceCurrentPositions((prev) => {
          const updated = { ...prev };
          // Clear clicked service's position since it's now selected
          delete updated[serviceName];
          return updated;
        });
      }

      // Update selected service - this will trigger position updates for all services
      setSelectedService(serviceName);
    }
  };

  // Get current service index
  const currentIndex = servicesList.indexOf(selectedService);

  // Navigate to previous service
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedService(servicesList[currentIndex - 1]);
    }
  };

  // Navigate to next service
  const handleNext = () => {
    if (currentIndex < servicesList.length - 1) {
      setSelectedService(servicesList[currentIndex + 1]);
    }
  };

  const isFirstService = currentIndex === 0;
  const isLastService = currentIndex === servicesList.length - 1;

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Top Button */}
        <div className="text-center mb-6">
          <button className="border border-[#00AE6B] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#00AE6B]/10 transition-all">
            Look At Our Services
          </button>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-white">Explore Our </span>
            <span className="text-[#00AE6B]">Services</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            With DODEAL, Your Goals Are Our Mission. From Ground Breaking
            Marketing Campaigns To Seamless Tech Integrations
          </p>
        </div>

        {/* Services Layout */}
        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 lg:gap-16 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          {/* Left Service Detail */}
          <div
            className="w-full lg:w-2/5 max-w-md lg:max-w-none order-2 lg:order-1 mt-8 sm:mt-12 md:mt-20 lg:mt-72 service-details-enter"
            key={selectedService}
          >
            <h3 className="text-[#00AE6B] text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 service-title-enter">
              {currentService.title}
            </h3>
            <p className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 service-subtitle-enter">
              {currentService.subtitle}
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 service-description-enter">
              {currentService.description}
            </p>
            <button
              className="border border-[#00AE6B] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#00AE6B]/10 transition-all flex items-center gap-2 service-button-enter"
              style={{
                backgroundColor: "rgba(0, 174, 107, 0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 174, 107, 0.85)";
                e.target.style.color = "rgba(255, 255, 255, 1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0, 174, 107, 0.2)";
                e.target.style.color = "rgba(255, 255, 255, 1)";
              }}
            >
              See More
              <img
                src={seeMoreArrow}
                alt="arrow"
                className="w-6 h-auto"
                style={{ imageRendering: "crisp-edges" }}
              />
            </button>
          </div>

          {/* Right Section with Circle and Services */}
          <div className="lg:w-3/5 order-1 lg:order-2 relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex justify-center lg:justify-end">
            {/* Full Circle SVG - Right Aligned */}
            <svg
              className="absolute pointer-events-none z-20 hidden lg:block"
              style={{
                width: "1000px",
                height: "1000px",
                left: "90%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              viewBox="0 0 500 500"
            >
              <defs>
                {/* Border gradient: linear-gradient(180deg, #00D885 0%, #57FFBE 100%) */}
                <linearGradient
                  id="circleBorderGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#00D885" />
                  <stop offset="100%" stopColor="#57FFBE" />
                </linearGradient>
                {/* Inset shadow filter */}
                <filter
                  id="insetShadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="19.05" result="offset-blur" />
                  <feFlood
                    floodColor="rgba(0, 216, 133, 0.56)"
                    floodOpacity="1"
                    result="color"
                  />
                  <feComposite
                    in="color"
                    in2="offset-blur"
                    operator="in"
                    result="shadow"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="shadow"
                    operator="over"
                  />
                </filter>
              </defs>
              {/* Background circle with inset shadow */}
              <circle
                cx="250"
                cy="250"
                r="195"
                fill="rgba(1, 26, 38, 1)"
                filter="url(#insetShadow)"
              />
              {/* Border circle with gradient */}
              <circle
                cx="250"
                cy="250"
                r="195"
                stroke="url(#circleBorderGradient)"
                strokeWidth="10"
                fill="none"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0, 216, 133, 0.3))",
                }}
              />
            </svg>

            {/* Mobile Navigation - Previous Arrow (Top) - Only visible on mobile */}
            <button
              onClick={handlePrevious}
              disabled={isFirstService}
              className={`lg:hidden absolute top-[30%] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full transition-all z-30 ${
                isFirstService
                  ? "text-gray-600 cursor-not-allowed opacity-50"
                  : "text-primary-green hover:bg-primary-green/20 cursor-pointer"
              }`}
              aria-label="Previous service"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Animated Service Moving to Center */}
            {animatingService && (
              <div
                className="absolute z-25 pointer-events-none service-animate-to-center"
                style={{
                  top: animatingService.position.top || "auto",
                  bottom: animatingService.position.bottom || "auto",
                  left: animatingService.position.left || "auto",
                  right: animatingService.position.right || "auto",
                  width: "fit-content",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center bg-transparent">
                    {animatingService.icon ? (
                      <img
                        src={animatingService.icon}
                        alt={animatingService.name}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm md:text-base font-medium whitespace-nowrap">
                    {animatingService.name}
                  </span>
                </div>
              </div>
            )}

            {/* Animated Service Moving FROM Center to Position */}
            {exitingService && (
              <div
                className="absolute z-25 pointer-events-none"
                key={`exiting-${exitingService.name}-${exitingService.startFromCenter}`}
                style={{
                  top: exitingService.startFromCenter
                    ? "50%"
                    : exitingService.position.top !== undefined &&
                      exitingService.position.top !== "auto"
                    ? exitingService.position.top
                    : "auto",
                  bottom: exitingService.startFromCenter
                    ? "auto"
                    : exitingService.position.bottom !== undefined &&
                      exitingService.position.bottom !== "auto" &&
                      !exitingService.position.top
                    ? exitingService.position.bottom
                    : "auto",
                  left: exitingService.startFromCenter
                    ? isDesktop
                      ? "40%"
                      : "50%"
                    : exitingService.position.left !== undefined &&
                      exitingService.position.left !== "auto"
                    ? exitingService.position.left
                    : "auto",
                  right: exitingService.startFromCenter
                    ? "auto"
                    : exitingService.position.right !== undefined &&
                      exitingService.position.right !== "auto" &&
                      !exitingService.position.left
                    ? exitingService.position.right
                    : "auto",
                  transform: exitingService.startFromCenter
                    ? isDesktop
                      ? "translateY(-50%)"
                      : "translate(-50%, -50%)"
                    : "translate(0, 0)",
                  width: "fit-content",
                  transition: exitingService.startFromCenter
                    ? "none"
                    : "top 0.8s cubic-bezier(0.4, 0, 0.2, 1), bottom 0.8s cubic-bezier(0.4, 0, 0.2, 1), left 0.8s cubic-bezier(0.4, 0, 0.2, 1), right 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: exitingService.startFromCenter
                    ? "auto"
                    : "top, bottom, left, right, transform",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center bg-transparent">
                    {exitingService.icon ? (
                      <img
                        src={exitingService.icon}
                        alt={exitingService.name}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm md:text-base font-medium whitespace-nowrap">
                    {exitingService.name}
                  </span>
                </div>
              </div>
            )}

            {/* Fixed Button Container in Center - Content animates into this */}
            <div
              className="absolute z-10 rounded-full px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 flex items-center gap-2 sm:gap-4 text-white"
              style={{
                top: "50%",
                left: isDesktop ? "40%" : "50%",
                transform: isDesktop
                  ? "translateY(-50%)"
                  : "translate(-50%, -50%)",
                width: "90%",
                maxWidth: "600px",
                border: "2px solid rgba(0, 216, 133, 1)",
                backgroundColor: "rgba(0, 174, 107, 0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow:
                  "0 0 20px rgba(0, 216, 133, 0.5), inset 0 0 20px rgba(0, 174, 107, 0.1)",
                minHeight: "60px",
              }}
            >
              {/* Button Content with animation */}
              <div
                className={`flex items-center gap-4 w-full ${
                  isTransitioning ? "service-button-content-enter" : ""
                }`}
                key={selectedService}
              >
                {currentService.icon ? (
                  <img
                    src={currentService.icon}
                    alt={currentService.title}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                )}
                <span className="text-sm sm:text-base md:text-lg font-bold whitespace-nowrap">
                  {currentService.title}
                </span>
              </div>
            </div>

            {/* Mobile Navigation - Next Arrow (Bottom) - Only visible on mobile */}
            <button
              onClick={handleNext}
              disabled={isLastService}
              className={`lg:hidden absolute bottom-[20%] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full transition-all z-30 ${
                isLastService
                  ? "text-gray-600 cursor-not-allowed opacity-50"
                  : "text-primary-green hover:bg-primary-green/20 cursor-pointer"
              }`}
              aria-label="Next service"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Other Service Items (clickable labels) - Hidden on mobile */}
            {allServices
              .filter((service) => service.name !== selectedService)
              .map((service) => {
                const position = getServicePosition(
                  service.name,
                  selectedService
                );
                if (!position) return null;

                // Check if this service was the previous selected one (needs exit animation from center)
                const wasPreviousSelected =
                  service.name === previousService &&
                  previousService !== selectedService;
                // Hide this service if it's currently animating from center (during transition)
                const isAnimating =
                  (exitingService && exitingService.name === service.name) ||
                  (service.name === previousService && isTransitioning);

                // Explicitly set positioning properties
                const style = {
                  position: "absolute",
                  top: position.top || "auto",
                  bottom: position.bottom || "auto",
                  left: position.left || "auto",
                  right: position.right || "auto",
                  opacity: isAnimating ? 0 : 1,
                  visibility: isAnimating ? "hidden" : "visible",
                };

                return (
                  <div
                    key={`${service.name}-${selectedService}`}
                    className={`cursor-pointer transform hover:scale-110 hidden lg:block ${
                      wasPreviousSelected
                        ? "service-item-exiting"
                        : "service-item-transitioning"
                    }`}
                    style={style}
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center bg-transparent">
                        {service.icon ? (
                          <img
                            src={service.icon}
                            alt={service.name}
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                          />
                        ) : service.name === "SEO & SEM" ? (
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        ) : null}
                      </div>

                      {/* Service Name */}
                      <span className="text-white text-sm md:text-base font-medium whitespace-nowrap">
                        {service.name}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
