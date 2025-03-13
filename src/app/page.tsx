import { GlassNavbar } from "@/components/glass-navbar";
import Services from "@/components/magicui/creative-services";
import Example from "@/components/magicui/HorizontalScrollCarousel";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { TextReveal } from "@/components/magicui/text-reveal";
import AnimatedFooter from "@/sections/animated-footer";
import { AnimatedTestimonials } from "@/sections/animated-testimonials";
import FAQSection from "@/sections/faq-section";
import HeroGeometric from "@/sections/hero-geometric";
import ServicesSection from "@/sections/services-section";

export default function Home() {

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]


  return (
    <>
      <GlassNavbar />
      <HeroGeometric />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll>The Crafters <span className="text-[#c4ff00]">The Crafters</span></VelocityScroll>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
      </div>
      <TextReveal>We know what’s going on. You need top-notch Website or App to stand out in the tech world, but hiring in-house developers can be costly and time-consuming.
        That’s when CRAFTERS comes in.</TextReveal>
      <ServicesSection />
      <Services />
      <Example />
      <AnimatedTestimonials testimonials={testimonials} />
      <FAQSection />

      <AnimatedFooter />
    </>
  );
}
