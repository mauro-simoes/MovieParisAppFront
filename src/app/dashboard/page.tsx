'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TheatreManagement } from '@/components/dashboard/TheatreManagement';
import { ScheduleManagement } from '@/components/dashboard/ScheduleManagement';
import { AssignmentManagement } from '@/components/dashboard/AssignmentManagement';
import { useAuth } from '@/lib/context/auth.context';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('theatres');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" className='bg-red-500 absolute right-0' onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="theatres">Théâtres</TabsTrigger>
          {user?.role === 'ROLE_CINEMA_OWNER' && (
            <TabsTrigger value="schedules">Programmations</TabsTrigger>
          )}
          {user?.role === 'ROLE_ADMIN' && (
            <TabsTrigger value="assignments">Assignations</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="theatres">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Théâtres</CardTitle>
            </CardHeader>
            <CardContent>
              <TheatreManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Programmations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduleManagement />
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === 'ROLE_ADMIN' && (
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Assignations</CardTitle>
              </CardHeader>
              <CardContent>
                <AssignmentManagement />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 