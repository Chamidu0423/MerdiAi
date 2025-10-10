import { Header } from "@/components/header"
import { AboutPage } from "@/components/about-page"

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <AboutPage />
    </div>
  )
}
