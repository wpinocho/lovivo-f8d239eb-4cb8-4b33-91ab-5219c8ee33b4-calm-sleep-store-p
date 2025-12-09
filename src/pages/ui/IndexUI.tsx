import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { HeroSection } from '@/components/HeroSection';
import { ProductComparer } from '@/components/ProductComparer';
import { SleepQuiz } from '@/components/SleepQuiz';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Sleep & Recovery Store Homepage
 * Features: Hero, Product Comparer, Sleep Quiz, Collections, Products
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated collections designed for your best sleep
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Comparison Tool */}
      <ProductComparer />

      {/* Sleep Quiz */}
      <SleepQuiz />

      {/* Products Section */}
      <section id="products" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {selectedCollectionId 
                ? `Products from ${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                : 'All Products'
              }
            </h2>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                See All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-dreamy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Sleep?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have improved their sleep quality with our products.
          </p>
          <Button 
            size="lg" 
            className="text-lg"
            onClick={() => document.getElementById('sleep-quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Find Your Setup
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};