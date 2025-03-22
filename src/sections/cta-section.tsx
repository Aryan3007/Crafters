"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Briefcase, MessageSquare } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
     

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Ready to Bring <span className="text-[#c4ff00]">Your Vision</span> to Life?
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our portfolio to see our work or get in touch to discuss your project needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Portfolio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link href="/portfolio" className="block h-full">
              <div className="bg-black border border-zinc-800 rounded-2xl p-8 h-full group hover:bg-zinc-900 transition-all duration-300 hover:border-[#c4ff00]/50">
                <div className="w-16 h-16 bg-[#c4ff00]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#c4ff00]/20 transition-all duration-300">
                  <Briefcase className="w-8 h-8 text-[#c4ff00]" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">View Our Portfolio</h3>
                <p className="text-zinc-400 mb-6">
                  Explore our past projects and see how we've helped clients achieve their goals.
                </p>
                <div className="flex items-center text-[#c4ff00] font-medium group-hover:text-[#c4ff00]/80 transition-colors">
                  <span>Explore work</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link href="/user-contact-page" className="block h-full">
              <div className="bg-black border border-zinc-800 rounded-2xl p-8 h-full group hover:bg-zinc-900 transition-all duration-300 hover:border-[#c4ff00]/50">
                <div className="w-16 h-16 bg-[#c4ff00]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#c4ff00]/20 transition-all duration-300">
                  <MessageSquare className="w-8 h-8 text-[#c4ff00]" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Get in Touch</h3>
                <p className="text-zinc-400 mb-6">
                  Have a project in mind? Contact us to discuss how we can help bring your ideas to reality.
                </p>
                <div className="flex items-center text-[#c4ff00] font-medium group-hover:text-[#c4ff00]/80 transition-colors">
                  <span>Contact us</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="w-24 h-1 bg-[#c4ff00] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  )
}

