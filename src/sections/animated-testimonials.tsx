"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Incredible service! The website they designed for my business is modern, fast, and user-friendly. It has truly helped us attract more customers online.",
      author: "Rahul Sharma",
      role: "Founder at Digital Solutions"
    },
    {
      id: 2,
      quote: "The mobile app they developed for us is seamless and performs exceptionally well. Their team understood our requirements perfectly and delivered beyond our expectations.",
      author: "Priya Mehta",
      role: "CEO at FitWell"
    },
    {
      id: 3,
      quote: "Their graphic design work is simply outstanding! From our logo to social media creatives, everything was designed with perfection and creativity.",
      author: "Amit Verma",
      role: "Marketing Head at Creative Minds"
    },
    {
      id: 4,
      quote: "The video editing team did an amazing job! They turned our raw footage into a high-quality promotional video that helped boost our brand engagement.",
      author: "Neha Kapoor",
      role: "Content Strategist at Visionary Media"
    },
    {
      id: 5,
      quote: "I wanted a complete branding package, and they delivered it flawlessly! The website, app, and graphics all aligned perfectly with our brand vision.",
      author: "Ananya Iyer",
      role: "Co-Founder at Trendy Creations"
    }
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const goToNext = () => {
    if (isAnimating) return
    setDirection('right')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    setDirection('left')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 8000)
    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="w-full py-16 md:py-24 bg-black text-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our <span className="text-[#c4ff00]">Clients</span> Say
          </h2>
          <div className="w-20 h-1 bg-[#c4ff00] mb-8"></div>
          <p className="text-gray-400 max-w-2xl">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 left-0 opacity-10">
            <Quote size={120} className="text-[#c4ff00]" />
          </div>
          
          <div className="relative h-[300px] md:h-[250px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute w-full transition-all duration-500 ease-in-out px-6 md:px-10",
                  index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0",
                  index !== currentIndex && direction === 'right' ? "translate-x-full" : "",
                  index !== currentIndex && direction === 'left' ? "-translate-x-full" : ""
                )}
              >
                <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-[#c4ff00]">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full border border-gray-700 hover:border-[#c4ff00] hover:bg-black/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-[#c4ff00]" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index > currentIndex) {
                      setDirection('right')
                    } else if (index < currentIndex) {
                      setDirection('left')
                    }
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex 
                      ? "bg-[#c4ff00] w-10" 
                      : "bg-gray-700 hover:bg-gray-500"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="p-2 rounded-full border border-gray-700 hover:border-[#c4ff00] hover:bg-black/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-[#c4ff00]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
