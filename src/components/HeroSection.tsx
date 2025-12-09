import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const HeroSection = () => {
  const scrollToQuiz = () => {
    document.getElementById('sleep-quiz')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/src/assets/hero-sleep.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Sleep Better,
            <br />
            <span style={{ letterSpacing: '0px' }} className="text-primary">Wake Refreshed!!</span>
          </h1>
          <p style={{ fontSize: '20px', letterSpacing: '0px',
              color: '#545454',
              fontWeight: '300',
              backgroundColor: 'transparent', }} className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover scientifically designed sleep products that transform your rest. From premium pillows to natural supplements, find your perfect sleep setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={scrollToQuiz}
              className="text-lg group"
            >
              Find Your Setup
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}