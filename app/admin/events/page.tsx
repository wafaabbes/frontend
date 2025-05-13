"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockEvents, mockClubs } from "@/app/mock-data"

export default function AdminEventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [clubFilter, setClubFilter] = useState("all")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClub = clubFilter === "all" || event.clubId === clubFilter
    return matchesSearch && matchesClub
  })

  const getClubName = (clubId: string) => {
    const club = mockClubs.find((c) => c.id === clubId)
    return club ? club.name : "Club inconnu"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des événements</h1>
          <p className="text-muted-foreground">Créez, modifiez et supprimez des événements</p>
        </div>
        <Button onClick={() => router.push("/admin/events/new")}>Créer un événement</Button>
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

      <Card>
        <CardHeader>
          <CardTitle>Liste des événements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {getClubName(event.clubId)} | {new Date(event.date).toLocaleDateString()} à {event.time}
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

            {filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun événement ne correspond à votre recherche</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
