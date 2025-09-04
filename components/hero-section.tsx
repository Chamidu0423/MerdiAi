import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex-1 flex items-start justify-start px-6 py-12">
      <div className="w-full">
  <div className="glass-card w-full p-12 md:p-16 min-h-[500px]">
          <div className="max-w-2xl w-full text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Turn your text to diagram with MerdiAI
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Instantly generate clear, customizable diagrams from your text. Streamline your workflow and visualize ideas with MerdiAI—no design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8">
                Get started
              </Button>
              <Button variant="link" size="lg" className="text-muted-foreground hover:text-foreground">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
