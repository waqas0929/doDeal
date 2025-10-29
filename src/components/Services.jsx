import { useState, useEffect } from "react";
import BrandingServicesIcon from "../assets/BrandingServices.png";
import PaidCampaignIcon from "../assets/paidCampaign.png";
import DigitalMarketingIcon from "../assets/digitalMarketing.svg";
import SocialMediaIcon from "../assets/socialMedia.png";
import seeMoreArrow from "../assets/seeMoreArrow.png";
import { backgroundImage } from "../constants/assets";

const Services = () => {
  const [selectedService, setSelectedService] = useState("Branding Services");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

    // Return the fixed position for this service
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

  const handleServiceClick = (serviceName) => {
    if (serviceName !== selectedService) {
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
          <div className="w-full lg:w-2/5 max-w-md lg:max-w-none order-2 lg:order-1 mt-8 sm:mt-12 md:mt-20 lg:mt-44">
            <h3 className="text-[#00AE6B] text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              {currentService.title}
            </h3>
            <p className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
              {currentService.subtitle}
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              {currentService.description}
            </p>
            <button
              className="border border-[#00AE6B] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#00AE6B]/10 transition-all flex items-center gap-2"
              style={{
                backgroundColor: "rgba(0, 174, 107, 0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
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
              {/* Button Content */}
              <div className="flex items-center gap-4 w-full">
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

                // Explicitly set positioning properties
                const style = {
                  position: "absolute",
                  zIndex: 10,
                  top: position.top || "auto",
                  bottom: position.bottom || "auto",
                  left: position.left || "auto",
                  right: position.right || "auto",
                  opacity: 1,
                };

                return (
                  <div
                    key={`${service.name}-${selectedService}`}
                    className="cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-110 hidden lg:block"
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
