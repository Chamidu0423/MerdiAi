"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("./spline-scene").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />,
  }
);

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="flex-1 flex items-start justify-start px-6 py-12 relative">
      <div className="w-full relative z-10">
        <div className="glass-card w-full p-12 md:p-16 min-h-[600px] md:min-h-[500px] relative" style={{ background: "transparent" }}>
          <div className="max-w-2xl w-full text-left md:text-left text-center relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Turn your text to diagram with MerdiAI
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Instantly generate clear, customizable diagrams from your text.
              Streamline your workflow and visualize ideas with MerdiAI no
              design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full px-8" onClick={() => router.push("/main-ui")} >
                Get started
              </Button>
              <Button variant="link" size="lg" className="text-muted-foreground hover:text-foreground">
                Learn more
              </Button>
            </div>
          </div>
          <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden rounded-r-2xl" style={{ background: "transparent" }}>
            <div className="w-full h-full opacity-95" style={{ background: "transparent" }}>
              <SplineScene className="w-full h-full" />
            </div>
          </div>
          
          <div className="md:hidden absolute inset-0 z-0 flex items-center justify-center overflow-hidden rounded-2xl" style={{ background: "transparent" }}>
            <div className="w-full h-full opacity-95" style={{ background: "transparent" }}>
              <SplineScene className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
