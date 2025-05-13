"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockEvents, mockClubs } from "@/app/mock-data"

export default function EventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [clubFilter, setClubFilter] = useState("all")
  const [userEvents, setUserEvents] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userEvents")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClub = clubFilter === "all" || event.clubId === clubFilter
    return matchesSearch && matchesClub
  })

  const handleRegisterEvent = (eventId: string) => {
    const updatedEvents = [...userEvents]

    if (updatedEvents.includes(eventId)) {
      // Se désinscrire de l'événement
      const index = updatedEvents.indexOf(eventId)
      updatedEvents.splice(index, 1)
    } else {
      // S'inscrire à l'événement
      updatedEvents.push(eventId)
    }

    setUserEvents(updatedEvents)
    localStorage.setItem("userEvents", JSON.stringify(updatedEvents))
  }

  const getClubName = (clubId: string) => {
    const club = mockClubs.find((c) => c.id === clubId)
    return club ? club.name : "Club inconnu"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Événements</h1>
          <p className="text-muted-foreground">Découvrez et inscrivez-vous aux événements à venir</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px]"
          />
          <Select value={clubFilter} onValueChange={setClubFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clubs</SelectItem>
              {mockClubs.map((club) => (
                <SelectItem key={club.id} value={club.id}>
                  {club.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{getClubName(event.clubId)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{event.description}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Heure:</span> {event.time}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Lieu:</span> {event.location}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/student/events/${event.id}`)}>
                Détails
              </Button>
              <Button
                variant={userEvents.includes(event.id) ? "destructive" : "default"}
                onClick={() => handleRegisterEvent(event.id)}
              >
                {userEvents.includes(event.id) ? "Se désinscrire" : "S'inscrire"}
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">Aucun événement ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}
