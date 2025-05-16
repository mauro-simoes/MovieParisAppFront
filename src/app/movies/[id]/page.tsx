'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MovieSchedule } from '@/app/models/MovieSchedule';
import { Movie } from '@/app/models/Movie';
import { movieScheduleService } from '@/app/services/MovieScheduleService';
import { movieService } from '@/app/services/MovieService';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [schedules, setSchedules] = useState<MovieSchedule[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, schedulesData] = await Promise.all([
          movieService.getMovie(Number(params.id)),
          movieScheduleService.getSchedulesByMovieId(Number(params.id))
        ]);

        setMovie(movieData || null);
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setSchedules([]);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!movie) {
    return <div className="flex justify-center items-center min-h-screen">Film non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Retour à l'accueil</span>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-[5]" />
        <div className="relative z-20 container mx-auto h-full flex items-end pb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
            <div className="flex gap-4 text-white/80 text-sm">
              <span>{movie.language}</span>
              <span>•</span>
              <span>{movie.durationMinutes} min</span>
              {movie.minAge !== undefined && (
                <>
                  <span>•</span>
                  <span>{movie.minAge}+</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">À propos</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><span className="font-medium text-foreground">Réalisateur :</span> {movie.director}</p>
                <p><span className="font-medium text-foreground">Date de sortie :</span> {format(new Date(movie.releaseDate), 'PPP', { locale: fr })}</p>
                {movie.mainActors && movie.mainActors.length > 0 && (
                  <p><span className="font-medium text-foreground">Casting :</span> {movie.mainActors.join(', ')}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Schedules */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Horaires de projection</h2>
              {schedules.length === 0 ? (
                <p className="text-muted-foreground">Aucune séance programmée pour le moment.</p>
              ) : (
                <div className="grid gap-4">
                  {schedules.map((schedule) => (
                    <Card key={schedule.id} className="border-none bg-muted/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold mb-1">{schedule.theatreName}</h3>
                            <p className="text-sm text-muted-foreground">{schedule.daysOfWeek}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                Du {format(new Date(schedule.startDate), 'd MMM', { locale: fr })} au {format(new Date(schedule.endDate), 'd MMM yyyy', { locale: fr })}
                              </p>
                              <p className="font-medium">{schedule.time}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 