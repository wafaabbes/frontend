"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockClubs, mockEvents } from "@/app/mock-data"

export default function ClubDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id as string

  const [club, setClub] = useState<any>(null)
  const [clubEvents, setClubEvents] = useState<any[]>([])
  const [isUserMember, setIsUserMember] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les détails du club
    const foundClub = mockClubs.find((c) => c.id === clubId)
    if (!foundClub) {
      router.push("/student/clubs")
      return
    }

    setClub(foundClub)

    // Récupérer les événements du club
    const events = mockEvents.filter((event) => event.clubId === clubId)
    setClubEvents(events)

    // Vérifier si l'utilisateur est membre du club
    const userClubs = localStorage.getItem("userClubs")
    if (userClubs) {
      const parsedUserClubs = JSON.parse(userClubs)
      setIsUserMember(parsedUserClubs.includes(clubId))
    }

    setLoading(false)
  }, [clubId, router])

  const handleJoinClub = () => {
    const userClubs = localStorage.getItem("userClubs")
    let parsedUserClubs = userClubs ? JSON.parse(userClubs) : []

    if (isUserMember) {
      // Quitter le club
      parsedUserClubs = parsedUserClubs.filter((id: string) => id !== clubId)
    } else {
      // Rejoindre le club
      parsedUserClubs.push(clubId)
    }

    localStorage.setItem("userClubs", JSON.stringify(parsedUserClubs))
    setIsUserMember(!isUserMember)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Chargement...</div>
  }

  if (!club) {
    return <div className="flex items-center justify-center h-full">Club non trouvé</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{club.name}</h1>
          <p className="text-muted-foreground">{club.category}</p>
        </div>
        <Button variant={isUserMember ? "destructive" : "default"} onClick={handleJoinClub}>
          {isUserMember ? "Quitter le club" : "Rejoindre le club"}
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>À propos du club</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{club.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-medium">Informations</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Créé le</span>
                      <span>{new Date(club.createdAt).toLocaleDateString()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Membres</span>
                      <span>{club.memberCount}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Lieu de rencontre</span>
                      <span>{club.location}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Contact</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{club.contactEmail}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Responsable</span>
                      <span>{club.president}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Événements du club</CardTitle>
              <CardDescription>Tous les événements organisés par {club.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {clubEvents.length > 0 ? (
                <div className="space-y-4">
                  {clubEvents.map((event) => (
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
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun événement à venir pour ce club</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Membres du club</CardTitle>
              <CardDescription>Les personnes qui ont rejoint {club.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {club.president.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{club.president}</h3>
                      <p className="text-sm text-muted-foreground">Président</p>
                    </div>
                  </div>
                </div>

                {/* Membres simulés */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">M</div>
                      <div>
                        <h3 className="font-medium">Membre {index + 1}</h3>
                        <p className="text-sm text-muted-foreground">Membre</p>
                      </div>
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
