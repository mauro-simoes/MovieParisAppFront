'use client';

import { useEffect, useState } from 'react';
import { Movie } from './models/Movie';
import { movieService } from './services/MovieService';
import Navigation from './components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useEmblaCarousel from 'embla-carousel-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        setMovies(data);
      } catch (err) {
        setError('Échec du chargement des films');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://eloutput.com/wp-content/uploads/2022/06/sala-cine.jpg"
            alt="Salle de cinéma"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Découvrez le Cinéma</h1>
            <p className="text-xl mb-8">Explorez les dernières sorties et les films les plus populaires</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/films">Voir les films</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Movies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Films à l'affiche</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="flex-[0_0_300px] min-w-0">
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-[400px]">
                      <Image
                        src={movie.thumbnail}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{movie.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Réalisateur:</span> {movie.director}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Langue:</span> {movie.language}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Durée:</span> {movie.durationMinutes} minutes
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Date de sortie:</span> {new Date(movie.releaseDate).toLocaleDateString('fr-FR')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full"
              aria-label="Film précédent"
            >
              ←
            </Button>
            <Button
              variant="outline"
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full"
              aria-label="Film suivant"
            >
              →
            </Button>
          </div>
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
                placeholder="Votre adresse email"
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
