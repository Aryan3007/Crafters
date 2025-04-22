"use client"

import { useState, JSX } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Clock, Palette, Users, Wrench, Rocket, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a comprehensive range of creative services including web design and development, mobile app development, branding and identity design, UI/UX design, e-commerce solutions, digital marketing, and custom software development. Our team specializes in creating tailored solutions that meet your specific business needs.",
        icon: <Palette className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "How much does a typical project cost?",
        answer: "Project costs vary depending on scope, complexity, and specific requirements. We offer flexible pricing models including fixed-price quotes, hourly rates, and retainer options. After our initial consultation, we'll provide a detailed proposal outlining all costs. Our projects typically range from $5,000 for smaller engagements to $50,000+ for comprehensive solutions.",
        icon: <Zap className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "What is your typical project timeline?",
        answer: "Our project timelines depend on the scope and complexity of work. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. During our consultation, we'll provide a detailed timeline with key milestones. We pride ourselves on transparent communication and keeping projects on schedule.",
        icon: <Clock className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "Do you offer ongoing maintenance and support?",
        answer: "Yes, we offer various maintenance and support packages to ensure your digital products remain secure, up-to-date, and performing optimally. Our support options include regular updates, security monitoring, performance optimization, content updates, and technical support. We can tailor a maintenance plan to suit your specific needs and budget.",
        icon: <Wrench className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "How do you handle revisions and feedback?",
        answer: "Feedback and revisions are a natural part of the creative process. Our project methodology includes dedicated review phases where you can provide feedback. We typically include 2-3 rounds of revisions in our project quotes. Our collaborative approach ensures we incorporate your feedback effectively while maintaining project momentum.",
        icon: <MessageCircle className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "Do you work with clients remotely?",
        answer: "Yes, we work with clients globally and have established effective remote collaboration processes. We use tools like Slack, Zoom, and project management software to maintain clear communication. While we enjoy face-to-face meetings when possible, our remote workflow ensures the same quality of service regardless of your location.",
        icon: <Users className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "What information do you need to start a project?",
        answer: "To get started, we need to understand your business goals, target audience, project requirements, timeline, and budget. Any existing brand guidelines, content, or design preferences are also helpful. Our detailed onboarding questionnaire helps gather this information efficiently, and we'll schedule a kickoff meeting to discuss your project in depth.",
        icon: <Rocket className="w-5 h-5 text-[#c4ff00]" />
    },
    {
        question: "Do you offer rush services for urgent projects?",
        answer: "Yes, we can accommodate rush projects depending on our current workload. Rush services may incur additional fees to account for the expedited timeline and resources required. Please contact us as soon as possible with your urgent requirements, and we'll do our best to accommodate your timeline.",
        icon: <Sparkles className="w-5 h-5 text-[#c4ff00]" />
    }
]

interface FAQItemProps {
    faq: {
        question: string;
        answer: string;
        icon: JSX.Element;
    };
    index: number;
    isOpen: boolean;
    toggleAccordion: (index: number) => void;
}

const FAQItem = ({ faq, index, isOpen, toggleAccordion }: FAQItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
        >
            <div
                className={`
          relative z-10 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-4 cursor-pointer
          transition-all duration-300 hover:bg-[#111] hover:border-gray-700
          ${isOpen ? 'shadow-[0_0_20px_rgba(196,255,0,0.1)]' : ''}
        `}
                onClick={() => toggleAccordion(index)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#1e1e1e] rounded-lg">
                            {faq.icon}
                        </div>
                        <h3 className=" font-medium text-white group-hover:text-[#c4ff00]">
                            {faq.question}
                        </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                        {isOpen ? (
                            <ChevronUp className="w-6 h-6 text-[#c4ff00]" />
                        ) : (
                            <ChevronDown className="w-6 h-6 text-white" />
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                transition: {
                                    height: {
                                        duration: 0.4,
                                        ease: [0.04, 0.62, 0.23, 0.98]
                                    },
                                    opacity: { duration: 0.25, delay: 0.15 }
                                }
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                transition: {
                                    height: {
                                        duration: 0.3,
                                        ease: [0.04, 0.62, 0.23, 0.98]
                                    },
                                    opacity: { duration: 0.25 }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-gray-800">
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative elements that appear when item is open */}
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#c4ff00]/10 z-0"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 0.1 }}
                        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[#c4ff00]/10 z-0"
                    />
                </>
            )}
        </motion.div>
    )
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 relative overflow-hidden">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-white">FAQ</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                    Frequently Asked <span className="text-[#c4ff00]">Questions</span>
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto">
                    Find answers to common questions about our services, process, and how we can help bring your creative vision to life.
                </p>





            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6">
                <div className="space-y-4">
                    {faqs.slice(0, 4).map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            toggleAccordion={toggleAccordion}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    {faqs.slice(4).map((faq, index) => (
                        <FAQItem
                            key={index + 4}
                            faq={faq}
                            index={index + 4}
                            isOpen={openIndex === index + 4}
                            toggleAccordion={toggleAccordion}
                        />
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-16 text-center"
            >
                {/* <div className="inline-block relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c4ff00]/20 via-[#c4ff00]/10 to-[#c4ff00]/20 blur-xl rounded-full -z-10"></div>
                    <a
                        href="/contact"
                        className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-[#1e1e1e] hover:bg-[#252525] border border-gray-800 rounded-full text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(196,255,0,0.2)] group"
                    >
                        <span className="font-medium">Still have questions?</span>
                        <span className="text-[#c4ff00] group-hover:translate-x-1 transition-transform duration-300">Contact our team</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#c4ff00]"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                </div> */}
            </motion.div>
        </div>
    )
}
