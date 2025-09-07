import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <HeroSection />
      {/* main - UI */}
    </div>
  )
}
