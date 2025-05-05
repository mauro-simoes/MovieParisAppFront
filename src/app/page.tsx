import Navigation from './components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-0">
          <Image
            src="/hero-image.jpg"
            alt="Featured Movie"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-foreground max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Découvrez le Cinéma</h1>
            <p className="text-xl mb-8">Explorez les dernières sorties et les films les plus populaires</p>
            <Button asChild size="lg">
              <Link href="/films">Voir les films</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Movies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Films à l'affiche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((movie) => (
            <Card key={movie} className="overflow-hidden">
              <div className="relative h-[400px]">
                <Image
                  src={`/movie-${movie}.jpg`}
                  alt={`Movie ${movie}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Titre du Film {movie}</h3>
                <p className="text-muted-foreground text-sm">Genre • Durée • Note</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-muted-foreground mb-8">Recevez les dernières actualités et sorties de films</p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Votre email"
                className="flex-1"
              />
              <Button type="submit">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
