"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const SplineScene = dynamic(
  () => import("./spline-scene").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent animate-pulse" />,
  }
)

const teamMembers = [
  {
    name: "John Anderson",
    role: "Lead Developer",
    bio: "Full-stack developer with a passion for creating intuitive AI-powered solutions. Specializes in React and Next.js.",
    image: "/api/placeholder/150/150",
    initials: "JA",
    github: "#",
    linkedin: "#",
    email: "john@merdiai.com"
  },
  {
    name: "Sarah Chen",
    role: "AI/ML Engineer",
    bio: "Machine learning expert focused on natural language processing and diagram generation algorithms.",
    image: "/api/placeholder/150/150",
    initials: "SC",
    github: "#",
    linkedin: "#",
    email: "sarah@merdiai.com"
  },
  {
    name: "Michael Rodriguez",
    role: "UX Designer",
    bio: "Creative designer dedicated to crafting seamless user experiences with modern, accessible interfaces.",
    image: "/api/placeholder/150/150",
    initials: "MR",
    github: "#",
    linkedin: "#",
    email: "michael@merdiai.com"
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    bio: "Strategic thinker with a vision for transforming complex data into visual stories that everyone can understand.",
    image: "/api/placeholder/150/150",
    initials: "EW",
    github: "#",
    linkedin: "#",
    email: "emily@merdiai.com"
  }
]

export function AboutPage() {
  return (
    <main className="flex-1 w-full relative">
      {/* 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
        <SplineScene className="w-full h-full" />
      </div>
      
      {/* Content with relative positioning to appear above background */}
      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            About MerdiAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforming the way you visualize information
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 backdrop-blur-md bg-background/80">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At MerdiAI, we believe that complex information should be accessible to everyone. 
                  Our mission is to bridge the gap between raw data and visual understanding by 
                  leveraging the power of artificial intelligence.
                </p>
                <p>
                  We're building a platform that transforms your text descriptions into beautiful, 
                  professional diagrams instantly. Whether you're a developer documenting system 
                  architecture, a student visualizing concepts, or a business professional creating 
                  process flows, MerdiAI makes it effortless.
                </p>
                <p>
                  Our vision is to democratize data visualization, making it as simple as having 
                  a conversation. We're committed to continuous innovation, ensuring our tools 
                  remain cutting-edge while staying intuitive and user-friendly.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Meet the Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind MerdiAI, working together to make 
              visualization accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 backdrop-blur-md bg-background/80"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-primary/20 group-hover:border-primary/50 transition-colors">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed min-h-[4rem]">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                      asChild
                    >
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                      asChild
                    >
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                      asChild
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 backdrop-blur-md bg-background/80">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly push boundaries to deliver cutting-edge solutions that 
                  transform how people work with data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 backdrop-blur-md bg-background/80">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Simplicity</h3>
                <p className="text-muted-foreground">
                  Complex technology should be simple to use. We design intuitive 
                  experiences that anyone can master.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 backdrop-blur-md bg-background/80">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Community</h3>
                <p className="text-muted-foreground">
                  We build for people, with people. Your feedback shapes our product 
                  and drives our improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-purple-500/5 backdrop-blur-md">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Join Us on Our Journey</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're just getting started, and we'd love to have you along for the ride. 
                Try MerdiAI today and experience the future of data visualization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="/main-ui">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
