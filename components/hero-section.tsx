import { Button } from "@/components/ui/button"
import { SplineBackground } from "@/components/spline-background"
import { HeaderSpline3D } from "@/components/header-spline-3d"

/**
 * Hero Section Component
 * 
 * Main landing page section with:
 * - Interactive 3D Spline background
 * - Left-aligned text content (60% width on large screens, stacked on mobile)
 * - Right-side purple/pink sphere animation (40% width, hidden on mobile)
 * - Responsive layout that adapts to screen sizes
 * - Mobile-first design with vertical stacking
 */
export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden min-h-[80vh]">
      {/* Interactive 3D Spline Background - Full section coverage */}
      <SplineBackground 
        scene="https://prod.spline.design/hYfTPbDZcK6MMlah/scene.splinecode" 
        className="opacity-40 sm:opacity-60"
      />
      
      {/* Content Area - Full width on mobile, 55-60% on desktop */}
      <div className="w-full xl:w-[55%] xl:w-[60%] relative z-10">
        <div className="max-w-4xl lg:max-w-5xl p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Content Container with vertical centering */}
          <div className="max-w-2xl lg:max-w-3xl w-full text-center xl:text-left flex flex-col justify-center min-h-[300px] sm:min-h-[400px]">
            {/* Main Heading - 3 lines with responsive typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6 sm:mb-8">
              <span className="block">Welcome to the our</span>
              <span className="block">AI-powered platform</span>
              <span className="block">for Graph creation</span>
            </h1>
            
            {/* Call-to-Action Button - Centered on all screens */}
            <div className="flex justify-center">
              <Button size="lg" className="rounded-full px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Get Started
              </Button>
            </div>

            {/* Mobile 3D Animation - Below button on mobile only */}
            <div className="block xl:hidden mt-8 sm:mt-12 w-full flex justify-center">
              <div className="w-80 h-64 sm:w-96 sm:h-80 relative">
                <HeaderSpline3D className="opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side 3D Animation Area - Hidden on mobile, visible on desktop */}
      <div className="hidden xl:block w-[45%] xl:w-[40%] h-full relative z-10 -ml-8 xl:-ml-12 pr-4 md:pr-8 lg:pr-12">
        {/* Animation Container with left alignment to reduce gap */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="w-full h-96 relative">
            {/* Purple/Pink Sphere Animation Component */}
            <HeaderSpline3D className="opacity-80" />
          </div>
        </div>
      </div>
    </section>
  )
}
