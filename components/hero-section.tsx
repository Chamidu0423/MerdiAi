"use client";
import { Button } from "@/components/ui/button";
import { SplineScene } from "./spline-scene";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="flex-1 flex items-start justify-start px-6 py-12 relative">
      <div className="w-full relative z-10">
        <div className="glass-card w-full p-12 md:p-16 min-h-[500px] relative" style={{ background: "transparent" }}>
          <div className="max-w-2xl w-full text-left relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Turn your text to diagram with MerdiAI
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Instantly generate clear, customizable diagrams from your text.
              Streamline your workflow and visualize ideas with MerdiAI—no
              design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8" onClick={() => router.push("/main-ui")} >
                Get started
              </Button>
              <Button variant="link" size="lg" className="text-muted-foreground hover:text-foreground">
                Learn more
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden rounded-r-2xl" style={{ background: "transparent" }}>
            <div className="w-full h-full opacity-95"style={{ background: "transparent" }}>
              <SplineScene className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
