'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MovieSchedule } from '@/app/models/MovieSchedule';
import { Movie } from '@/app/models/Movie';
import { Theatre } from '@/app/models/Theatre';
import { movieScheduleService } from '@/app/services/MovieScheduleService';
import { movieService } from '@/app/services/MovieService';
import { TheatreService } from '@/app/services/TheatreService';
import { userTheatreAssignmentService } from '@/app/services/UserTheatreAssignmentService';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/lib/context/auth.context';

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState<MovieSchedule[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSchedule, setNewSchedule] = useState({
    movieId: '',
    theatreId: '',
    time: '',
    daysOfWeek: '',
    startDate: '',
    endDate: '',
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      // Get user's theatre assignments
      const userAssignments = await userTheatreAssignmentService.getAssignmentsByUser(user!.id);
      const assignedTheatreIds = userAssignments.map(assignment => assignment.theatreId);

      // Get all data in parallel
      const [schedulesData, moviesData, theatresData] = await Promise.all([
        movieScheduleService.getAllSchedules(),
        movieService.getAllMovies(),
        TheatreService.getAllTheatres(),
      ]);

      // Filter theatres to only show assigned ones
      const filteredTheatres = theatresData.filter(theatre => 
        assignedTheatreIds.includes(theatre.id)
      );

      // Filter schedules to only show assigned theatres
      const filteredSchedules = schedulesData.filter(schedule => 
        assignedTheatreIds.includes(parseInt(schedule.theatreId))
      );

      setSchedules(filteredSchedules);
      setMovies(moviesData);
      setTheatres(filteredTheatres);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await movieScheduleService.addSchedule({
        movieId: parseInt(newSchedule.movieId),
        theatreId: parseInt(newSchedule.theatreId),
        time: newSchedule.time,
        daysOfWeek: newSchedule.daysOfWeek,
        startDate: newSchedule.startDate,
        endDate: newSchedule.endDate,
        movieTitle: movies.find(m => m.id === parseInt(newSchedule.movieId))?.title || '',
        theatreName: theatres.find(t => t.id === parseInt(newSchedule.theatreId))?.name || '',
      });
      toast({
        title: "Succès",
        description: "Programmation créée avec succès",
      });
      setNewSchedule({
        movieId: '',
        theatreId: '',
        time: '',
        daysOfWeek: '',
        startDate: '',
        endDate: '',
      });
      loadData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la programmation",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    try {
      await movieScheduleService.deleteSchedule(id);
      toast({
        title: "Succès",
        description: "Programmation supprimée avec succès",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la programmation",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Vous devez être connecté pour accéder à cette page.</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreateSchedule} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="movie">Film</Label>
            <Select
              value={newSchedule.movieId}
              onValueChange={(value) => setNewSchedule({ ...newSchedule, movieId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un film" />
              </SelectTrigger>
              <SelectContent>
                {movies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id.toString()}>
                    {movie.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theatre">Théâtre</Label>
            <Select
              value={newSchedule.theatreId}
              onValueChange={(value) => setNewSchedule({ ...newSchedule, theatreId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un théâtre" />
              </SelectTrigger>
              <SelectContent>
                {theatres.map((theatre) => (
                  <SelectItem key={theatre.id} value={theatre.id.toString()}>
                    {theatre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Input
              id="time"
              type="time"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysOfWeek">Jours de la semaine</Label>
            <Input
              id="daysOfWeek"
              value={newSchedule.daysOfWeek}
              onChange={(e) => setNewSchedule({ ...newSchedule, daysOfWeek: e.target.value })}
              placeholder="ex: Lundi, Mercredi, Vendredi"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début</Label>
            <Input
              id="startDate"
              type="date"
              value={newSchedule.startDate}
              onChange={(e) => setNewSchedule({ ...newSchedule, startDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Date de fin</Label>
            <Input
              id="endDate"
              type="date"
              value={newSchedule.endDate}
              onChange={(e) => setNewSchedule({ ...newSchedule, endDate: e.target.value })}
              required
            />
          </div>
        </div>
        <Button type="submit">Ajouter une programmation</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Liste des programmations</h3>
        <div className="grid gap-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{schedule.movieTitle}</h4>
                <p className="text-sm text-muted-foreground">
                  {schedule.theatreName} - {schedule.time} - {schedule.daysOfWeek}
                </p>
                <p className="text-sm text-muted-foreground">
                  Du {new Date(schedule.startDate).toLocaleDateString()} au {new Date(schedule.endDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDeleteSchedule(schedule.id)}
              >
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 