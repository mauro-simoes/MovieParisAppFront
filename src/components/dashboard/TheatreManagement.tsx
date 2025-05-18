'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Theatre } from '@/app/models/Theatre';
import { TheatreService } from '@/app/services/TheatreService';
import { useToast } from "@/components/ui/use-toast";

export function TheatreManagement() {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTheatre, setNewTheatre] = useState({ name: '', address: '', city: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    try {
      const data = await TheatreService.getAllTheatres();
      setTheatres(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les théâtres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTheatre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await TheatreService.createTheatre(newTheatre);
      toast({
        title: "Succès",
        description: "Théâtre créé avec succès",
      });
      setNewTheatre({ name: '', address: '', city: '' });
      loadTheatres();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le théâtre",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTheatre = async (id: number) => {
    try {
      await TheatreService.deleteTheatre(id);
      toast({
        title: "Succès",
        description: "Théâtre supprimé avec succès",
      });
      loadTheatres();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le théâtre",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreateTheatre} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du théâtre</Label>
            <Input
              id="name"
              value={newTheatre.name}
              onChange={(e) => setNewTheatre({ ...newTheatre, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              value={newTheatre.city}
              onChange={(e) => setNewTheatre({ ...newTheatre, city: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={newTheatre.address}
              onChange={(e) => setNewTheatre({ ...newTheatre, address: e.target.value })}
              required
            />
          </div>
        </div>
        <Button type="submit">Ajouter un théâtre</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Liste des théâtres</h3>
        <div className="grid gap-4">
          {theatres.map((theatre, index) => (
            <div key={theatre.id || `theatre-${index}`} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{theatre.name}</h4>
                <p className="text-sm text-muted-foreground">{theatre.address}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDeleteTheatre(theatre.id)}
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