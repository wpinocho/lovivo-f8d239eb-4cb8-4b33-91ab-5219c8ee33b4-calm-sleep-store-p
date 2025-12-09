import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

interface ComparisonProduct {
  name: string
  image: string
  price: string
  features: {
    support: string
    cooling: string
    material: string
    bestFor: string
  }
  pros: string[]
  cons: string[]
  link: string
}

const pillows: ComparisonProduct[] = [
  {
    name: 'Cloud Memory Foam',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/f8d239eb-4cb8-4b33-91ab-5219c8ee33b4/memory-foam-pillow.jpg',
    price: '$79.99',
    features: {
      support: 'High',
      cooling: 'Medium',
      material: 'Memory Foam',
      bestFor: 'All sleepers'
    },
    pros: ['Adaptive support', 'Pressure relief', 'Hypoallergenic'],
    cons: ['May retain heat', 'Heavier'],
    link: '/products/cloud-memory-foam-pillow'
  },
  {
    name: 'CoolBreeze Gel',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/f8d239eb-4cb8-4b33-91ab-5219c8ee33b4/cooling-gel-pillow.jpg',
    price: '$89.99',
    features: {
      support: 'High',
      cooling: 'Excellent',
      material: 'Gel-infused',
      bestFor: 'Hot sleepers'
    },
    pros: ['Stays cool', 'Great support', 'Temperature regulation'],
    cons: ['Higher price', 'Firmer feel'],
    link: '/products/coolbreeze-gel-pillow'
  },
  {
    name: 'Cervical Support',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/f8d239eb-4cb8-4b33-91ab-5219c8ee33b4/cervical-pillow.jpg',
    price: '$94.99',
    features: {
      support: 'Maximum',
      cooling: 'Medium',
      material: 'Ergonomic foam',
      bestFor: 'Neck pain'
    },
    pros: ['Medical-grade', 'Perfect alignment', 'Pain relief'],
    cons: ['Takes adjustment', 'Specific shape'],
    link: '/products/cervical-support-pillow'
  }
]

const toppers: ComparisonProduct[] = [
  {
    name: 'Memory Foam Topper',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/f8d239eb-4cb8-4b33-91ab-5219c8ee33b4/memory-foam-topper.jpg',
    price: 'From $129.99',
    features: {
      support: 'High',
      cooling: 'Medium',
      material: '3" Memory Foam',
      bestFor: 'Pressure relief'
    },
    pros: ['Transforms mattress', 'Pressure relief', 'Affordable'],
    cons: ['Break-in period', 'May retain warmth'],
    link: '/products/premium-memory-foam-topper'
  },
  {
    name: 'Cooling Gel Topper',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/f8d239eb-4cb8-4b33-91ab-5219c8ee33b4/cooling-topper.jpg',
    price: 'From $159.99',
    features: {
      support: 'High',
      cooling: 'Excellent',
      material: '2" Gel Layer',
      bestFor: 'Hot sleepers'
    },
    pros: ['Temperature control', 'Breathable', 'Great support'],
    cons: ['Higher cost', 'Thinner profile'],
    link: '/products/cooling-gel-mattress-topper'
  }
]

export const ProductComparer = () => {
  const [activeTab, setActiveTab] = useState<'pillows' | 'toppers'>('pillows')
  const products = activeTab === 'pillows' ? pillows : toppers

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare & Choose
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect sleep product for your needs. Compare features, benefits, and pricing side by side.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeTab === 'pillows' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('pillows')}
          >
            Pillows
          </Button>
          <Button
            variant={activeTab === 'toppers' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveTab('toppers')}
          >
            Mattress Toppers
          </Button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Features</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Support:</span>
                      <span className="font-medium">{product.features.support}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cooling:</span>
                      <span className="font-medium">{product.features.cooling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span className="font-medium">{product.features.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best for:</span>
                      <span className="font-medium">{product.features.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* Pros */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Pros
                  </h4>
                  <ul className="text-sm space-y-1">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <X className="h-4 w-4 text-muted-foreground" />
                    Considerations
                  </h4>
                  <ul className="text-sm space-y-1">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-muted-foreground mt-0.5">•</span>
                        <span className="text-muted-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" asChild>
                  <a href={product.link}>View Details</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}