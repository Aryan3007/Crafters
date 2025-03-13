"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormStatus = "idle" | "submitting" | "success" | "error"

interface ContactFormProps {
  prefillData?: {
    fullName?: string
    email?: string
    companyName?: string
    phoneNumber?: string
  }
}

export default function ContactForm({ prefillData }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState({
    // Personal/Business Info
    fullName: prefillData?.fullName || "",
    email: prefillData?.email || "",
    companyName: prefillData?.companyName || "",
    phoneNumber: prefillData?.phoneNumber || "",

    // Project Info
    projectType: "",
    budget: "",
    timeline: "",
    projectDescription: "",

    // How did they find us
    referralSource: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormStatus("success")
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          phoneNumber: "",
          projectType: "",
          budget: "",
          timeline: "",
          projectDescription: "",
          referralSource: "",
        })
        setFormStatus("idle")
      }, 3000)
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 3000)
    }
  }

  const inputClasses =
    "w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c4ff00]/50 focus:border-transparent transition-all duration-200"

  const labelClasses = "block text-sm font-medium text-gray-400 mb-1"

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
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
          <span className="text-sm font-medium text-white">Get in Touch</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Let&apos;s Create Something <span className="text-[#c4ff00]">Amazing</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tell us about your project and business needs. Our team of creative experts will help bring your vision to
          life.
        </p>
      </motion.div>

      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl shadow-black/20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div custom={0} variants={fadeInUpVariants} initial="hidden" animate="visible">
              <label htmlFor="fullName" className={labelClasses}>
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className={inputClasses}
              />
            </motion.div>

            <motion.div custom={1} variants={fadeInUpVariants} initial="hidden" animate="visible">
              <label htmlFor="email" className={labelClasses}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                required
                placeholder="john@example.com"
                className={inputClasses}
              />
            </motion.div>

            <motion.div custom={2} variants={fadeInUpVariants} initial="hidden" animate="visible">
              <label htmlFor="companyName" className={labelClasses}>
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Company Ltd."
                className={inputClasses}
              />
            </motion.div>

            <motion.div custom={3} variants={fadeInUpVariants} initial="hidden" animate="visible">
              <label htmlFor="phoneNumber" className={labelClasses}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={inputClasses}
              />
            </motion.div>
          </div>

          <motion.div custom={4} variants={fadeInUpVariants} initial="hidden" animate="visible" className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2">Project Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="projectType" className={labelClasses}>
                  Project Type *
                </label>
                <Select
                  name="projectType"
                  value={formData.projectType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                  required
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                    <SelectItem value="website">Website Design</SelectItem>
                    <SelectItem value="app">Mobile App</SelectItem>
                    <SelectItem value="branding">Branding</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="budget" className={labelClasses}>
                  Budget Range
                </label>
                <Select
                  name="budget"
                  value={formData.budget}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                    <SelectItem value="less-5k">Less than $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="timeline" className={labelClasses}>
                  Timeline
                </label>
                <Select
                  name="timeline"
                  value={formData.timeline}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="projectDescription" className={labelClasses}>
                Project Description *
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                placeholder="Tell us about your project, goals, and any specific requirements..."
                className={`${inputClasses} h-32 resize-none`}
              />
            </div>
          </motion.div>

          <motion.div custom={5} variants={fadeInUpVariants} initial="hidden" animate="visible">
            <label htmlFor="referralSource" className={labelClasses}>
              How did you hear about us?
            </label>
            <Select
              name="referralSource"
              value={formData.referralSource}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, referralSource: value }))}
            >
              <SelectTrigger className={inputClasses}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1e1e] border border-gray-800 text-white">
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            custom={6}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex justify-center"
          >
            <button
              type="submit"
              disabled={formStatus === "submitting" || formStatus === "success"}
              className={`
                relative overflow-hidden px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300
                ${formStatus === "success" ? "bg-green-600 text-white" : "bg-[#c4ff00] text-black hover:bg-[#d8ff4d]"}
                disabled:opacity-70 disabled:cursor-not-allowed
                w-full md:w-auto min-w-[200px]
              `}
            >
              <span
                className={`flex items-center justify-center gap-2 transition-all duration-300 ${formStatus === "submitting" || formStatus === "success" ? "opacity-0" : "opacity-100"}`}
              >
                Submit Request
              </span>

              {formStatus === "submitting" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                </span>
              )}

              {formStatus === "success" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <span className="ml-2">Sent Successfully</span>
                </span>
              )}
            </button>
          </motion.div>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          custom={7}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#1e1e1e] rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#c4ff00]/10 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4ff00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
          <p className="text-gray-400">+1 (555) 123-4567</p>
        </motion.div>

        <motion.div
          custom={8}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#1e1e1e] rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#c4ff00]/10 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4ff00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
          <p className="text-gray-400">hello@creativestudio.com</p>
        </motion.div>

        <motion.div
          custom={9}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#1e1e1e] rounded-xl p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#c4ff00]/10 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4ff00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
          <p className="text-gray-400">
            123 Creative St, Design District
            <br />
            San Francisco, CA 94103
          </p>
        </motion.div>
      </div>
    </div>
  )
}

