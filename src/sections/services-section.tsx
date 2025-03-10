"use client"

import React, { useState, useRef, JSX } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Code,
  Smartphone,
  Palette,
  Film,
  Globe,
  ShoppingCart,
  Megaphone,
  Layers,
  ArrowRight,
  CheckCircle,
  X,
} from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: <Code className="w-6 h-6" />,
    description: "Custom websites and web applications built with modern technologies and frameworks.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#c4ff00",
  },
  {
    id: "app-dev",
    title: "App Development",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#00e5ff",
  },
  {
    id: "ui-design",
    title: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    description: "User-centered design solutions that enhance user experience and drive engagement.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#ff3d71",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: <Film className="w-6 h-6" />,
    description: "Professional video editing and motion graphics for various digital platforms.",
    skills: ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#ffaa00",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <Megaphone className="w-6 h-6" />,
    description: "Strategic digital marketing solutions to grow your online presence and reach.",
    skills: ["SEO", "Content Marketing", "Social Media", "Email Campaigns", "Analytics"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#00d68f",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    icon: <ShoppingCart className="w-6 h-6" />,
    description: "End-to-end e-commerce development with secure payment integration and inventory management.",
    skills: ["Shopify", "WooCommerce", "Payment Gateways", "Inventory Systems", "Customer Portals"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#c4ff00",
  },
  {
    id: "branding",
    title: "Branding & Identity",
    icon: <Layers className="w-6 h-6" />,
    description: "Comprehensive branding solutions that communicate your unique value proposition.",
    skills: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy", "Marketing Collateral"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#ff3d71",
  },
  {
    id: "web-presence",
    title: "Global Web Presence",
    icon: <Globe className="w-6 h-6" />,
    description: "Multilingual websites and localization services to reach international audiences.",
    skills: ["Localization", "Multilingual Content", "Cultural Adaptation", "Global SEO", "International UX"],
    image: "/placeholder.svg?height=400&width=600",
    color: "#00d68f",
  },
]

interface ServiceCardProps {
  service: Service;
  isActive: boolean;
  setActiveService: (id: string | null) => void;
  index: number;
  setCardPosition: (position: CardPosition) => void;
}

const ServiceCard = ({ service, isActive, setActiveService, index, setCardPosition }: ServiceCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get the clicked card's position for the popup animation
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    setCardPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })

    setActiveService(isActive ? null : service.id)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative group border border-zinc-800 cursor-pointer rounded-2xl overflow-hidden
        transition-all duration-300 transform
        ${isActive ? "scale-100 z-10 invisible" : "scale-95 hover:scale-98 z-0"}
      `}
      onClick={handleCardClick}
    >
      <div
        className={`
          absolute inset-0 bg-gradient-to-br from-black via-[#1e1e1e] to-black
          transition-all duration-500
          ${isActive ? "opacity-80" : "opacity-95 group-hover:opacity-90"}
        `}
      />

      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {service.skills.slice(0, isActive ? 5 : 3).map((skill: string, i: number) => (
              <span
                key={i}
                className="text-xs py-1 px-2 rounded-full bg-[#1e1e1e] text-gray-300 border border-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>

          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isActive ? "bg-[#c4ff00] text-black rotate-90" : "bg-[#1e1e1e] text-[#c4ff00] group-hover:bg-[#252525]"}
            `}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Improve the ServiceDetail component to fix jitter during animation
interface Service {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  skills: string[];
  image: string;
  color: string;
}

interface CardPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const ServiceDetail = ({ service, cardPosition, onClose }: { service: Service; cardPosition: CardPosition; onClose: () => void }) => {
  return (
    <motion.div
      initial={{
        position: "fixed",
        top: cardPosition.top,
        left: cardPosition.left,
        width: cardPosition.width,
        height: cardPosition.height,
        borderRadius: 16,
        zIndex: 100,
        opacity: 1,
      }}
      animate={{
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "min(90vw, 900px)",
        height: "auto",
        borderRadius: 24,
        opacity: 1,
      
      }}
      exit={{
        top: cardPosition.top,
        left: cardPosition.left,
        x: 0,
        y: 0,
        width: cardPosition.width,
        height: cardPosition.height,
        borderRadius: 16,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.4,
      }}
      className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden"
    >
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/40 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: `${service.color}15`, color: service.color }}
            >
              {service.icon}
              <span className="font-medium">{service.title}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Elevate your business with <span style={{ color: service.color }}>{service.title}</span>
            </h3>

            <p className="text-gray-400 mb-6">{service.description}</p>

            <div className="space-y-3 mb-6">
              {service.skills.map((skill: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#c4ff00]" />
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>

            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ backgroundColor: service.color, color: "#000" }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden h-[300px] md:h-auto">
            <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(45deg, ${service.color}50, transparent)`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Replace the existing ProcessStep component with a more engaging, animated version
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
}

const ProcessStep = ({ number, title, description, isActive }: ProcessStepProps) => {
  return (
    <motion.div
      className={`relative flex items-start gap-4 ${isActive ? "opacity-100" : "opacity-50"}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        x: 0,
        scale: isActive ? 1 : 0.98,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
          ${isActive ? "bg-[#c4ff00] text-black" : "bg-[#1e1e1e] text-white"}
        `}
        initial={{ scale: 0.8 }}
        animate={{
          scale: isActive ? 1 : 0.9,
          boxShadow: isActive ? "0 0 20px rgba(196, 255, 0, 0.5)" : "none",
        }}
        transition={{ duration: 0.4 }}
      >
        {number}
      </motion.div>
      <div className="flex-1">
        <motion.h4
          className="text-lg font-medium text-white mb-1"
          animate={{
            color: isActive ? "#c4ff00" : "#ffffff",
          }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h4>
        <motion.p
          className="text-sm text-gray-400"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
      {number < 4 && (
        <motion.div
          className="absolute left-6 top-12 h-16 w-0.5 bg-gray-800"
          initial={{ height: 0 }}
          animate={{
            height: 48,
            background: isActive ? "linear-gradient(to bottom, #c4ff00, rgba(196, 255, 0, 0.1))" : "#333",
          }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  )
}

// Replace the "Our Process" section with a more visually engaging version
const ProcessSection = ({ activeProcess }: { activeProcess: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 md:p-10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#c4ff00]/5 blur-[80px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-[#c4ff00]/5 blur-[60px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10">
        <div className="md:w-1/3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e1e] border border-gray-800 mb-4">
            <motion.div
              className="w-5 h-5 rounded-full bg-[#c4ff00] flex items-center justify-center text-black"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
            </motion.div>
            <span className="text-sm font-medium text-white">Our Process</span>
          </div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How We <span className="text-[#c4ff00]">Deliver</span> Excellence
          </motion.h3>

          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our streamlined process ensures we deliver high-quality results that exceed expectations, on time and within
            budget.
          </motion.p>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-full h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#c4ff00]"
                initial={{ width: "0%" }}
                animate={{ width: `${activeProcess * 25}%` }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Start</span>
              <span>Finish</span>
            </div>
          </motion.div>

          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e1e1e] hover:bg-[#252525] border border-gray-800 rounded-lg text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(196,255,0,0.15)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 text-[#c4ff00]" />
          </motion.button>
        </div>

        <div className="md:w-2/3 space-y-8">
          <ProcessStep
            number={1}
            title="Discovery & Strategy"
            description="We start by understanding your business goals, target audience, and project requirements to develop a tailored strategy."
            isActive={activeProcess === 1}
          />

          <ProcessStep
            number={2}
            title="Design & Development"
            description="Our creative team designs and develops solutions that align with your brand identity and meet your specific needs."
            isActive={activeProcess === 2}
          />

          <ProcessStep
            number={3}
            title="Testing & Refinement"
            description="We rigorously test and refine our work to ensure it meets the highest standards of quality and performance."
            isActive={activeProcess === 3}
          />

          <ProcessStep
            number={4}
            title="Launch & Support"
            description="After successful launch, we provide ongoing support and maintenance to ensure your solution continues to perform optimally."
            isActive={activeProcess === 4}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Update ServicesSection to use the new ProcessSection component
export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [activeProcess, setActiveProcess] = useState(1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const selectedService = services.find((s) => s.id === activeService)

  // Cycle through process steps
  React.useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev % 4) + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [isInView])

  const handleClose = () => {
    setActiveService(null)
  }

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
     

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e1e] border border-gray-800 mb-4">
          <div className="w-5 h-5 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Our Services</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Creative <span className="text-[#c4ff00]">Solutions</span> for Your Business
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          We offer a comprehensive range of creative services to help your business stand out in the digital landscape.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={activeService === service.id}
            setActiveService={setActiveService}
            setCardPosition={setCardPosition}
            index={index}
          />
        ))}
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {activeService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
              onClick={handleClose}
            />
            {selectedService && (
              <ServiceDetail service={selectedService} cardPosition={cardPosition} onClose={handleClose} />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Our Process - Enhanced Section */}
      <ProcessSection activeProcess={activeProcess} />

      {/* Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {[
          { number: "250+", label: "Projects Completed" },
          { number: "50+", label: "Happy Clients" },
          { number: "10+", label: "Years Experience" },
          { number: "15+", label: "Industry Awards" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(196, 255, 0, 0.2)",
            }}
            className="bg-[#1e1e1e] rounded-xl p-6 text-center transition-all duration-300 hover:bg-[#252525]"
          >
            <motion.div
              className="text-3xl md:text-4xl font-bold text-[#c4ff00] mb-2"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {stat.number}
            </motion.div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div> */}
    </div>
  )
}

