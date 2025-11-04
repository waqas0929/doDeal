import { useState, useRef, useEffect } from "react";
import BrandingServicesIcon from "../assets/BrandingServices.png";
import PaidCampaignIcon from "../assets/paidCampaign.png";
import DigitalMarketingIcon from "../assets/digitalMarketing.svg";
import SocialMediaIcon from "../assets/socialMedia.png";
import CreativeProductionIcon from "../assets/creativeProduction.png";
import SEOAndSEM from "../assets/SEOAndSEM.png";
import seeMoreArrow from "../assets/seeMoreArrow.png";
import { backgroundImage } from "../constants/assets";
import AnimatedList from "./AnimatedList";

const Services = () => {
  const [selectedService, setSelectedService] = useState("Branding Services");
  const [isAnimating, setIsAnimating] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [nextService, setNextService] = useState(null);
  const timeoutRef = useRef(null);

  // Service configuration
  const servicesList = [
    "Branding Services",
    "SEO & SEM",
    "Paid Campaigns",
    "Digital Marketing",
    "Social Media",
    "Creative Production",
  ];

  // Updated angles to fill the space evenly around the circle
  const serviceAngles = {
    "Branding Services": 180, // Center left (button position)
    "SEO & SEM": 120, // Top-left
    "Paid Campaigns": 150, // Upper-left
    "Digital Marketing": 210, // Lower-left
    "Social Media": 240, // Bottom-left
    "Creative Production": 90, // Top-center (filling the top gap)
  };

  const serviceDetails = {
    "Branding Services": {
      title: "Branding Services",
      subtitle: "Build A Distinctive & Memorable Identity",
      description:
        "Build A Lasting Impression Through Innovative Branding Strategies And Creative Design",
      icon: BrandingServicesIcon,
    },
    "SEO & SEM": {
      title: "SEO & SEM",
      subtitle: "Boost Your Search Visibility",
      description:
        "Optimize your online presence and reach the top of search results with our comprehensive SEO and SEM strategies",
      icon: SEOAndSEM,
    },
    "Paid Campaigns": {
      title: "Paid Campaigns",
      subtitle: "Maximize Your Advertising ROI",
      description:
        "Drive targeted traffic and conversions with strategically planned and executed paid advertising campaigns",
      icon: PaidCampaignIcon,
    },
    "Digital Marketing": {
      title: "Digital Marketing",
      subtitle: "Comprehensive Digital Solutions",
      description:
        "Transform your digital presence with our end-to-end digital marketing solutions tailored to your business needs",
      icon: DigitalMarketingIcon,
    },
    "Social Media": {
      title: "Social Media Marketing",
      subtitle: "Amplify Your Brand's Online Impact",
      description:
        "Transform Your Social Media Presence Into A Powerful Marketing Asset With Our Expert Solutions",
      icon: SocialMediaIcon,
    },
    "Creative Production": {
      title: "Creative Production",
      subtitle: "Bring Your Vision To Life",
      description:
        "Elevate Your Brand With High-Quality Creative Content, From Visual Design To Video Production",
      icon: CreativeProductionIcon,
    },
  };

  const allServices = [
    { name: "SEO & SEM", icon: SEOAndSEM },
    { name: "Paid Campaigns", icon: PaidCampaignIcon },
    { name: "Branding Services", icon: BrandingServicesIcon },
    { name: "Digital Marketing", icon: DigitalMarketingIcon },
    { name: "Social Media", icon: SocialMediaIcon },
    { name: "Creative Production", icon: CreativeProductionIcon },
  ];

  // Calculate position on circle
  const getCircularPosition = (angle) => {
    const radius = 480;
    const centerX = 400;
    const centerY = 400;
    const radian = angle * (Math.PI / 180);

    return {
      left: `${centerX + radius * Math.cos(radian)}px`,
      top: `${centerY + radius * Math.sin(radian)}px`,
    };
  };

  const getServicePosition = (serviceName) => {
    const baseAngle = serviceAngles[serviceName];
    return baseAngle !== undefined ? getCircularPosition(baseAngle) : null;
  };

  // Calculate rotation needed for wheel animation
  const calculateRotation = (fromService, toService) => {
    const fromAngle = serviceAngles[fromService] || 0;
    const toAngle = serviceAngles[toService] || 0;
    return fromAngle - toAngle;
  };

  // Handle service click with animation
  const handleServiceClick = (serviceName) => {
    if (serviceName === selectedService || isAnimating) {
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Calculate rotation for wheel animation
    const rotationDelta = calculateRotation(selectedService, serviceName);

    // Start animation - instantly hide current text and show loading state
    setNextService(serviceName);
    setIsAnimating(true);
    setWheelRotation((prev) => prev + rotationDelta);

    // Set timeout to complete transition
    timeoutRef.current = setTimeout(() => {
      setSelectedService(serviceName);
      setNextService(null);
      setIsAnimating(false);
      timeoutRef.current = null;
    }, 600);
  };

  // Mobile handlers
  const handleMobileServiceSelect = (serviceName) => {
    setSelectedService(serviceName);
  };

  const currentIndex = servicesList.indexOf(selectedService);
  const isFirstService = currentIndex === 0;
  const isLastService = currentIndex === servicesList.length - 1;

  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      const prevService = servicesList[currentIndex - 1];
      const rotationDelta = calculateRotation(selectedService, prevService);

      setNextService(prevService);
      setIsAnimating(true);
      setWheelRotation((prev) => prev + rotationDelta);

      setTimeout(() => {
        setSelectedService(prevService);
        setNextService(null);
        setIsAnimating(false);
      }, 600);
    }
  };

  const handleNext = () => {
    if (currentIndex < servicesList.length - 1 && !isAnimating) {
      const nextService = servicesList[currentIndex + 1];
      const rotationDelta = calculateRotation(selectedService, nextService);

      setNextService(nextService);
      setIsAnimating(true);
      setWheelRotation((prev) => prev + rotationDelta);

      setTimeout(() => {
        setSelectedService(nextService);
        setNextService(null);
        setIsAnimating(false);
      }, 600);
    }
  };

  // Determine which service to show in button and on wheel
  const buttonService = nextService || selectedService;
  const currentService = serviceDetails[selectedService];
  const buttonServiceDetails = serviceDetails[buttonService];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

        {/* Mobile View - Animated List */}
        <div className="lg:hidden w-full mb-8">
          <AnimatedList
            items={servicesList}
            onItemSelect={handleMobileServiceSelect}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={false}
            initialSelectedIndex={currentIndex}
            className="w-full"
          />
        </div>

        {/* Desktop View - Services Layout */}
        <div className="hidden lg:flex relative flex-row items-start justify-between gap-8 md:gap-12 lg:gap-16 min-h-[600px]">
          {/* Left Service Detail */}
          <div className="w-full lg:w-2/5 max-w-md lg:max-w-none order-2 lg:order-1 mt-20 lg:mt-32">
            <div
              className={`transition-all duration-500 ${
                isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <h3 className="text-[#00AE6B] text-2xl md:text-3xl font-bold mb-4">
                {currentService.title}
              </h3>
              <p className="text-white text-lg md:text-xl font-bold mb-4">
                {currentService.subtitle}
              </p>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                {currentService.description}
              </p>
              <button className="border border-[#00AE6B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#00AE6B] transition-all flex items-center gap-2 bg-[#00AE6B]/20 backdrop-blur-sm">
                See More
                <img src={seeMoreArrow} alt="arrow" className="w-6 h-auto" />
              </button>
            </div>
          </div>

          {/* Right Section with Circle and Services */}
          <div className="lg:w-3/5 order-1 lg:order-2 relative w-full min-h-[600px] flex justify-center lg:justify-end overflow-visible">
            {/* CENTER BUTTON */}
            <div
              className={`absolute rounded-full px-10 py-6 text-white hidden lg:flex items-center gap-4 overflow-hidden transition-all duration-500 ${
                isAnimating ? "scale-110 opacity-80" : "scale-100 opacity-100"
              }`}
              style={{
                left: "40%",
                top: "50%",
                transform: "translateY(-50%)",
                border: "3px solid rgba(0, 216, 133, 1)",
                backgroundColor: "rgba(0, 174, 107, 0.3)",
                backdropFilter: "blur(15px)",
                boxShadow:
                  "0 0 30px rgba(0, 216, 133, 0.6), inset 0 0 30px rgba(0, 174, 107, 0.2)",
                minHeight: "100px",
                minWidth: "550px",
                maxWidth: "600px",
                pointerEvents: "none",
                zIndex: 5,
              }}
            >
              {buttonServiceDetails.icon ? (
                <img
                  src={buttonServiceDetails.icon}
                  alt={buttonServiceDetails.title}
                  className={`w-16 h-16 object-contain flex-shrink-0 transition-all duration-500 ml-28 ${
                    isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"
                  }`}
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg
                    className={`w-12 h-12 text-white transition-all duration-500 ${
                      isAnimating
                        ? "opacity-0 scale-90"
                        : "opacity-100 scale-100"
                    }`}
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
              <span
                className={`text-xl font-bold whitespace-nowrap transition-all duration-500${
                  isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                {buttonServiceDetails.title}
              </span>
            </div>

            {/* Rotating Wheel Container */}
            <div
              className="absolute"
              style={{
                right: "-750px",
                top: "50%",
                transform: `translateY(-50%) rotate(${wheelRotation}deg)`,
                transformOrigin: "400px 400px",
                width: "800px",
                height: "800px",
                transition: isAnimating
                  ? "transform 600ms ease-in-out"
                  : "none",
                zIndex: 15,
              }}
            >
              {/* Circle Arc SVG */}
              <svg
                className="absolute pointer-events-none hidden lg:block"
                style={{
                  width: "100%",
                  height: "100%",
                  left: "0",
                  top: "0",
                  zIndex: 10,
                }}
                viewBox="0 0 800 800"
              >
                <defs>
                  <linearGradient
                    id="circleBorderGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00D885" />
                    <stop offset="100%" stopColor="#57FFBE" />
                  </linearGradient>
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
                <circle
                  cx="400"
                  cy="400"
                  r="350"
                  fill="rgba(1, 26, 38, 1)"
                  filter="url(#insetShadow)"
                />
                <circle
                  cx="400"
                  cy="400"
                  r="350"
                  stroke="url(#circleBorderGradient)"
                  strokeWidth="16"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0 0 16px rgba(0, 216, 133, 0.4))",
                  }}
                />
              </svg>

              {/* Services around the circle - ALL services including current one during animation */}
              {allServices.map((service) => {
                // During animation, show ALL services including the current one
                // After animation, hide the selected service
                if (!isAnimating && service.name === selectedService) {
                  return null;
                }

                const position = getServicePosition(service.name);
                if (!position) return null;

                return (
                  <div
                    key={`${service.name}-wheel`}
                    className={`cursor-pointer hidden lg:flex items-center gap-3 pointer-events-auto transition-all duration-500 ${
                      isAnimating ? "opacity-70" : "opacity-100 hover:scale-110"
                    }`}
                    style={{
                      position: "absolute",
                      top: position.top,
                      left: position.left,
                      transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg)`,
                      transition: isAnimating
                        ? "transform 600ms ease-in-out, opacity 300ms ease"
                        : "transform 300ms ease, opacity 300ms ease",
                      zIndex: 20,
                    }}
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center bg-transparent transition-transform duration-300">
                      {service.icon ? (
                        <img
                          src={service.icon}
                          alt={service.name}
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
                    <span className="text-white text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300">
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Service Details */}
        <div className="lg:hidden w-full mt-8">
          <div
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-50" : "opacity-100"
            }`}
          >
            <h3 className="text-[#00AE6B] text-2xl md:text-3xl font-bold mb-4">
              {currentService.title}
            </h3>
            <p className="text-white text-lg md:text-xl font-bold mb-4">
              {currentService.subtitle}
            </p>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              {currentService.description}
            </p>
            <button className="border border-[#00AE6B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#00AE6B] transition-all flex items-center gap-2 bg-[#00AE6B]/20 backdrop-blur-sm">
              See More
              <img src={seeMoreArrow} alt="arrow" className="w-6 h-auto" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-center items-center gap-8 mt-8">
          <button
            onClick={handlePrevious}
            disabled={isFirstService || isAnimating}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
              isFirstService || isAnimating
                ? "text-gray-600 cursor-not-allowed opacity-50"
                : "text-[#00AE6B] hover:bg-[#00AE6B]/20 cursor-pointer"
            }`}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isLastService || isAnimating}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
              isLastService || isAnimating
                ? "text-gray-600 cursor-not-allowed opacity-50"
                : "text-[#00AE6B] hover:bg-[#00AE6B]/20 cursor-pointer"
            }`}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
