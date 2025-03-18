export type Project = {
    id: string
    title: string
    description: string
    category: "web" | "app" | "graphic" | "ui/ux" | "branding"
    image: string
    link?: string
    technologies: string[]
    featured: boolean
    year: number
    client: string
  }
  
  export const portfolioProjects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform Redesign",
      description:
        "A complete overhaul of an e-commerce platform with a focus on user experience and conversion optimization.",
      category: "web",
      image: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=2080",
      link: "https://example.com/project1",
      technologies: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
      featured: true,
      year: 2023,
      client: "Fashion Retailer",
    },
    {
      id: "2",
      title: "Health & Fitness Mobile App",
      description: "A comprehensive fitness tracking application with personalized workout plans and nutrition guidance.",
      category: "app",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2080",
      technologies: ["React Native", "Firebase", "HealthKit", "Google Fit API"],
      featured: true,
      year: 2023,
      client: "Wellness Startup",
    },
    {
      id: "3",
      title: "Corporate Brand Identity",
      description: "A complete brand identity design including logo, color palette, typography, and brand guidelines.",
      category: "branding",
      image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2080",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Brand Strategy"],
      featured: false,
      year: 2022,
      client: "Financial Services Firm",
    },
    {
      id: "4",
      title: "Interactive Data Visualization Dashboard",
      description:
        "A real-time dashboard for visualizing complex data sets with interactive filtering and exploration capabilities.",
      category: "web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2080",
      technologies: ["D3.js", "React", "Node.js", "MongoDB"],
      featured: true,
      year: 2023,
      client: "Data Analytics Company",
    },
    {
      id: "5",
      title: "Product Packaging Design",
      description:
        "Eye-catching packaging design for a premium product line with a focus on sustainability and brand recognition.",
      category: "graphic",
      image: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=2080",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Packaging Design", "3D Modeling"],
      featured: false,
      year: 2022,
      client: "Organic Food Brand",
    },
    {
      id: "6",
      title: "Real Estate Listing Platform",
      description:
        "A modern platform for real estate listings with advanced search, virtual tours, and agent connectivity.",
      category: "web",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2080",
      technologies: ["Next.js", "MongoDB", "Google Maps API", "AWS"],
      featured: false,
      year: 2022,
      client: "Real Estate Agency",
    },
    {
      id: "7",
      title: "Educational Mobile Game",
      description:
        "An engaging mobile game designed to teach programming concepts to children through interactive puzzles.",
      category: "app",
      image: "https://images.unsplash.com/photo-1626240130051-68871c71e8a5?q=80&w=2080",
      technologies: ["Unity", "C#", "iOS", "Android"],
      featured: true,
      year: 2023,
      client: "EdTech Startup",
    },
    {
      id: "8",
      title: "Annual Report Design",
      description:
        "A visually compelling annual report that effectively communicates company performance and future vision.",
      category: "graphic",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2080",
      technologies: ["Adobe InDesign", "Adobe Illustrator", "Data Visualization"],
      featured: false,
      year: 2022,
      client: "Technology Corporation",
    },
    {
      id: "9",
      title: "Banking App Redesign",
      description: "A user-centered redesign of a banking application focused on simplifying complex financial tasks.",
      category: "ui/ux",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2080",
      technologies: ["Figma", "Prototyping", "User Testing", "Design Systems"],
      featured: true,
      year: 2023,
      client: "National Bank",
    },
    {
      id: "10",
      title: "Restaurant Ordering System",
      description:
        "An integrated ordering system for restaurants with table management, kitchen display, and payment processing.",
      category: "web",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2080",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      featured: false,
      year: 2022,
      client: "Restaurant Chain",
    },
    {
      id: "11",
      title: "Travel Companion App",
      description: "A comprehensive travel app with itinerary planning, local recommendations, and offline maps.",
      category: "app",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2080",
      technologies: ["React Native", "GraphQL", "MongoDB", "Google Maps API"],
      featured: false,
      year: 2022,
      client: "Travel Tech Company",
    },
    {
      id: "12",
      title: "Event Poster Series",
      description:
        "A series of distinctive event posters designed to capture attention and convey the essence of each event.",
      category: "graphic",
      image: "https://images.unsplash.com/photo-1508900436185-54e5c3f02e77?q=80&w=2080",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Typography"],
      featured: false,
      year: 2022,
      client: "Arts Festival",
    },
  ]
  
  