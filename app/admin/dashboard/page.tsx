"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockClubs, mockEvents } from "@/app/mock-data"

export default function AdminDashboard() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Vérification de l'authentification
    const role = localStorage.getItem("userRole")
    const email = localStorage.getItem("userEmail")

    if (!role || role !== "admin" || !email) {
      router.push("/login")
      return
    }

    setUserEmail(email)
  }, [router])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockClubs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des événements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockEvents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockEvents.filter((e) => new Date(e.date) > new Date()).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membres actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clubs récents</CardTitle>
                <CardDescription>Les clubs créés récemment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockClubs.slice(0, 5).map((club) => (
                    <div key={club.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{club.name}</p>
                        <p className="text-sm text-muted-foreground">{club.category}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/clubs/${club.id}`)}>
                        Gérer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Les prochains événements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/events/${event.id}`)}>
                        Gérer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="clubs" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Gestion des clubs</h3>
            <Button onClick={() => router.push("/admin/clubs/new")}>Créer un club</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockClubs.map((club) => (
                  <div key={club.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{club.name}</h3>
                      <p className="text-sm text-muted-foreground">{club.category}</p>
                      <p className="text-sm">{club.description.substring(0, 100)}...</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => router.push(`/admin/clubs/${club.id}`)}>
                        Modifier
                      </Button>
                      <Button variant="destructive">Supprimer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Gestion des événements</h3>
            <Button onClick={() => router.push("/admin/events/new")}>Créer un événement</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} à {event.time}
                      </p>
                      <p className="text-sm">{event.description.substring(0, 100)}...</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => router.push(`/admin/events/${event.id}`)}>
                        Modifier
                      </Button>
                      <Button variant="destructive">Supprimer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
