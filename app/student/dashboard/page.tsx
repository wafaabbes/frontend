"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockClubs, mockEvents } from "@/app/mock-data"

export default function StudentDashboard() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userClubs, setUserClubs] = useState<string[]>([])
  const [userEvents, setUserEvents] = useState<string[]>([])

  useEffect(() => {
    // Vérification de l'authentification
    const role = localStorage.getItem("userRole")
    const email = localStorage.getItem("userEmail")

    if (!role || role !== "student" || !email) {
      router.push("/login")
      return
    }

    setUserEmail(email)

    // Charger les clubs et événements de l'utilisateur depuis le localStorage
    const savedUserClubs = localStorage.getItem("userClubs")
    if (savedUserClubs) {
      setUserClubs(JSON.parse(savedUserClubs))
    }

    const savedUserEvents = localStorage.getItem("userEvents")
    if (savedUserEvents) {
      setUserEvents(JSON.parse(savedUserEvents))
    }
  }, [router])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="clubs">Mes clubs</TabsTrigger>
          <TabsTrigger value="events">Mes événements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clubs rejoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userClubs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userEvents.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clubs récemment rejoints</CardTitle>
                <CardDescription>Vos dernières adhésions aux clubs</CardDescription>
              </CardHeader>
              <CardContent>
                {userClubs.length > 0 ? (
                  <div className="space-y-2">
                    {userClubs.map((clubId) => {
                      const club = mockClubs.find((c) => c.id === clubId)
                      return club ? (
                        <div key={club.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{club.name}</p>
                            <p className="text-sm text-muted-foreground">{club.category}</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => router.push(`/student/clubs/${club.id}`)}>
                            Voir
                          </Button>
                        </div>
                      ) : null
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Vous n'avez rejoint aucun club</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Événements auxquels vous êtes inscrit</CardDescription>
              </CardHeader>
              <CardContent>
                {userEvents.length > 0 ? (
                  <div className="space-y-2">
                    {userEvents.map((eventId) => {
                      const event = mockEvents.find((e) => e.id === eventId)
                      return event ? (
                        <div key={event.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/student/events/${event.id}`)}
                          >
                            Voir
                          </Button>
                        </div>
                      ) : null
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Vous n'êtes inscrit à aucun événement</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="clubs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes clubs</CardTitle>
              <CardDescription>Liste des clubs auxquels vous êtes inscrit</CardDescription>
            </CardHeader>
            <CardContent>
              {userClubs.length > 0 ? (
                <div className="space-y-4">
                  {userClubs.map((clubId) => {
                    const club = mockClubs.find((c) => c.id === clubId)
                    return club ? (
                      <div key={club.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="font-medium">{club.name}</h3>
                          <p className="text-sm text-muted-foreground">{club.category}</p>
                          <p className="text-sm">{club.description}</p>
                        </div>
                        <Button variant="outline" onClick={() => router.push(`/student/clubs/${club.id}`)}>
                          Détails
                        </Button>
                      </div>
                    ) : null
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Vous n'avez rejoint aucun club</p>
                  <Button onClick={() => router.push("/student/clubs")}>Explorer les clubs</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes événements</CardTitle>
              <CardDescription>Liste des événements auxquels vous êtes inscrit</CardDescription>
            </CardHeader>
            <CardContent>
              {userEvents.length > 0 ? (
                <div className="space-y-4">
                  {userEvents.map((eventId) => {
                    const event = mockEvents.find((e) => e.id === eventId)
                    return event ? (
                      <div key={event.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} à {event.time}
                          </p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                        <Button variant="outline" onClick={() => router.push(`/student/events/${event.id}`)}>
                          Détails
                        </Button>
                      </div>
                    ) : null
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Vous n'êtes inscrit à aucun événement</p>
                  <Button onClick={() => router.push("/student/events")}>Explorer les événements</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
