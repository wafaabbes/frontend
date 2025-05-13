"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEvents, mockClubs } from "@/app/mock-data"

export default function EventDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [event, setEvent] = useState<any>(null)
  const [club, setClub] = useState<any>(null)
  const [isUserRegistered, setIsUserRegistered] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer les détails de l'événement
    const foundEvent = mockEvents.find((e) => e.id === eventId)
    if (!foundEvent) {
      router.push("/student/events")
      return
    }

    setEvent(foundEvent)

    // Récupérer les détails du club
    const foundClub = mockClubs.find((c) => c.id === foundEvent.clubId)
    setClub(foundClub)

    // Vérifier si l'utilisateur est inscrit à l'événement
    const userEvents = localStorage.getItem("userEvents")
    if (userEvents) {
      const parsedUserEvents = JSON.parse(userEvents)
      setIsUserRegistered(parsedUserEvents.includes(eventId))
    }

    setLoading(false)
  }, [eventId, router])

  const handleRegisterEvent = () => {
    const userEvents = localStorage.getItem("userEvents")
    let parsedUserEvents = userEvents ? JSON.parse(userEvents) : []

    if (isUserRegistered) {
      // Se désinscrire de l'événement
      parsedUserEvents = parsedUserEvents.filter((id: string) => id !== eventId)
    } else {
      // S'inscrire à l'événement
      parsedUserEvents.push(eventId)
    }

    localStorage.setItem("userEvents", JSON.stringify(parsedUserEvents))
    setIsUserRegistered(!isUserRegistered)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Chargement...</div>
  }

  if (!event) {
    return <div className="flex items-center justify-center h-full">Événement non trouvé</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
          <p className="text-muted-foreground">Organisé par {club?.name || "Club inconnu"}</p>
        </div>
        <Button variant={isUserRegistered ? "destructive" : "default"} onClick={handleRegisterEvent}>
          {isUserRegistered ? "Se désinscrire" : "S'inscrire"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>À propos de l'événement</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Détails</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Heure</span>
                  <span>{event.time}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Lieu</span>
                  <span>{event.location}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Places disponibles</span>
                  <span>{event.capacity}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organisateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{club?.name || "Club inconnu"}</h3>
                <p className="text-sm text-muted-foreground">{club?.category || ""}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => router.push(`/student/clubs/${club?.id}`)}>
                Voir le profil du club
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>Les personnes inscrites à cet événement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Participants simulés */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">P</div>
                  <div>
                    <h3 className="font-medium">Participant {index + 1}</h3>
                    <p className="text-sm text-muted-foreground">Étudiant</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
