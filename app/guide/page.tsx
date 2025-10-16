import { Header } from "@/components/header"
import { GuidePage } from "@/components/guide-page"

export default function Guide() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <GuidePage />
    </div>
  )
}