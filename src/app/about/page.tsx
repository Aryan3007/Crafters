"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import AnimatedFooter from "@/sections/animated-footer"
import { GlassNavbar } from "@/components/glass-navbar"

// Team member type
type TeamMember = {
  id: number
  name: string
  role: string
  image: string
  bio: string
}

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Uday Shamra",
    role: "Founder & CEO",
    image: "/uday.png",
    bio: "With over 15 years of experience in design and development, Alex leads our creative vision and ensures that every project meets our high standards of excellence. Alex's passion for innovative design and user-centered solutions drives our team forward.",
  },
  {
  
    id: 5,
    name: "Divyanh Sharma",
    role: "Creative Director",
    image: "/deep.png",
    bio: "Jordan ensures that our projects run smoothly from inception to delivery. With a background in both design and business, Jordan bridges the gap between creative vision and practical execution, keeping our projects on time and within budget.",
  },
  {
    id: 3,
    name: "Aryan Tyagi",
    role: "Lead Developer & Designer",
    image: "/aryan.png",
    bio: "Taylor brings a unique perspective to user experience design, combining aesthetic sensibility with a deep understanding of user behavior. Their designs are not just beautiful but also intuitive and accessible to all users.",
  },
  // {
  //   id: 4,
  //   name: "Devansh Sharma",
  //   role: "Project Manager",
  //   image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974",
  //   bio: "Jordan ensures that our projects run smoothly from inception to delivery. With a background in both design and business, Jordan bridges the gap between creative vision and practical execution, keeping our projects on time and within budget.",
  // },
    {
      id: 2,
      name: "Dhruv Gupta",
      role: "Lead Developer",
      image: "/dhruv.png",
      bio: "Jamie is a full-stack developer with expertise in the latest web and mobile technologies. With a background in computer science and a keen eye for detail, Jamie ensures that our technical implementations are robust, scalable, and cutting-edge.",
  },
]

// Company values
const companyValues = [
  {
    title: "Innovation",
    description:
      "We constantly push the boundaries of what's possible, embracing new technologies and creative approaches to solve complex problems.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c4ff00]"
      >
        <path d="M2.5 18.5A9 9 0 1 1 16.5 13"></path>
        <path d="m21.5 13-5-1 1 5Z"></path>
      </svg>
    ),
  },
  {
    title: "Quality",
    description:
      "We are committed to excellence in everything we do, from the first sketch to the final product, ensuring that every detail meets our high standards.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c4ff00]"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnership, working closely with our clients and each other to achieve the best possible outcomes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c4ff00]"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and ethical practices in all our interactions, building trust with our clients and within our team.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c4ff00]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
        <GlassNavbar/>

        <div className="max-w-6xl mx-auto">

  
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
      
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-[#1e1e1e] rounded-full p-2 flex items-center gap-2 mb-4 w-fit">
              <div className="w-6 h-6 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className=" pr-2">About Us</span>
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We&apos;re a team of creative problem solvers
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-center text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Passionate about crafting exceptional digital experiences that make a difference.
          </motion.p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-[#1e1e1e] rounded-full p-2 flex items-center gap-2 mb-6 w-fit">
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <span className="text-sm font-medium pr-2">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From a small idea to a creative powerhouse</h2>
            <p className="text-gray-300 mb-6">
              Founded in 2018, our creative agency began with a simple mission: to help businesses stand out in the
              digital landscape through exceptional design and development. What started as a small team of passionate
              creatives has grown into a full-service digital agency with a global client base.
            </p>
            <p className="text-gray-300 mb-6">
              Our journey has been defined by a commitment to innovation, quality, and client satisfaction. We&apos;ve
              evolved with the changing digital landscape, constantly learning and adapting to new technologies and
              design trends while staying true to our core values.
            </p>
            <p className="text-gray-300">
              Today, we&apos;re proud to be a trusted partner for businesses of all sizes, from startups to established
              enterprises, helping them achieve their goals through strategic creative solutions.
            </p>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                alt="Our Team"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-2xl overflow-hidden border-8 border-black z-20">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
                alt="Our Office"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#c4ff00]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-[#0c0c0c] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="bg-[#1e1e1e] rounded-full p-2 flex items-center gap-2 mb-6 mx-auto w-fit">
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="text-sm font-medium pr-2">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What drives us forward</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our core values shape everything we do, from how we work with clients to how we approach each project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-[#1e1e1e] rounded-xl p-6 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-[#c4ff00]/10 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="bg-[#1e1e1e] rounded-full p-2 flex items-center gap-2 mb-6 w-fit mx-auto">
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span className="text-sm font-medium pr-2">Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the creative minds</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our diverse team brings together expertise from various disciplines to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="bg-[#1e1e1e] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(196,255,0,0.15)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
            >
              <div className="relative h-64">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#c4ff00] mb-4">{member.role}</p>
                {/* <p className="text-gray-400 text-sm">{member.bio}</p> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0c0c0c] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-[#c4ff00] mb-2">5+</h3>
              <p className="text-gray-300">Years of Experience</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-[#c4ff00] mb-2">100+</h3>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-[#c4ff00] mb-2">50+</h3>
              <p className="text-gray-300">Happy Clients</p>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-[#c4ff00] mb-2">12</h3>
              <p className="text-gray-300">Team Members</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-[#1e1e1e] rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with us?</h2>
            <p className="text-gray-300 mb-8">
              Let&apos;s collaborate to bring your vision to life with our creative expertise and technical skills.
            </p>
            <Link
              href="/user-contact-page"
              className="bg-[#c4ff00] hover:bg-[#d8ff4d] text-black font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AnimatedFooter />
    </div>
  )
}

