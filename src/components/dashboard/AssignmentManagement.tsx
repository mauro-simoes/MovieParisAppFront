'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Theatre } from '@/app/models/Theatre';
import { TheatreService } from '@/app/services/TheatreService';
import { userTheatreAssignmentService } from '@/app/services/UserTheatreAssignmentService';
import { useToast } from "@/components/ui/use-toast";
import { UserService } from '@/app/services/UserService';

interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface UserTheatreAssignment {
  id: number;
  userId: number;
  theatreId: number;
  username: string;
  theatreName: string;
}

export function AssignmentManagement() {
  const [assignments, setAssignments] = useState<UserTheatreAssignment[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAssignment, setNewAssignment] = useState({
    userId: '',
    theatreId: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [assignmentsData, theatresData, usersData] = await Promise.all([
        userTheatreAssignmentService.getAllAssignments(),
        TheatreService.getAllTheatres(),
        UserService.getUsers()
      ]);
      console.log('Theatres data:', theatresData);
      setAssignments(assignmentsData);
      setTheatres(theatresData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userTheatreAssignmentService.createAssignment(
        parseInt(newAssignment.userId),
        parseInt(newAssignment.theatreId)
      );
      toast({
        title: "Succès",
        description: "Assignation créée avec succès",
      });
      setNewAssignment({ userId: '', theatreId: '' });
      loadData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'assignation",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAssignment = async (userId: number, theatreId: number) => {
    try {
      await userTheatreAssignmentService.deleteAssignment(userId, theatreId);
      toast({
        title: "Succès",
        description: "Assignation supprimée avec succès",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'assignation",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreateAssignment} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label>Utilisateur</label>
            <Select
              value={newAssignment.userId}
              onValueChange={(value) => setNewAssignment({ ...newAssignment, userId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Théâtre</label>
            <Select
              value={newAssignment.theatreId}
              onValueChange={(value) => setNewAssignment({ ...newAssignment, theatreId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un théâtre" />
              </SelectTrigger>
              <SelectContent>
                {theatres.map((theatre) => {
                  if (!theatre || typeof theatre.id === 'undefined') {
                    console.warn('Invalid theatre data:', theatre);
                    return null;
                  }
                  return (
                    <SelectItem key={theatre.id} value={theatre.id.toString()}>
                      {theatre.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Ajouter une assignation</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Liste des assignations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <div key={`${assignment.theatreId}-${assignment.userId}`} className="flex flex-col p-4 border rounded-lg bg-card">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{assignment.username}</h4>
                <p className="text-sm text-muted-foreground mt-1">{assignment.theatreName}</p>
              </div>
              <div className="mt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteAssignment(assignment.userId, assignment.theatreId)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 