"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockEvents, mockClubs } from "@/app/mock-data"

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [formData, setFormData] = useState({
    title: "",
    clubId: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Récupérer les détails de l'événement
    const event = mockEvents.find((e) => e.id === eventId)
    if (!event) {
      router.push("/admin/events")
      return
    }

    setFormData({
      title: event.title,
      clubId: event.clubId,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
    })

    setLoading(false)
  }, [eventId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Simulation de mise à jour (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirection vers la liste des événements
      router.push("/admin/events")
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'événement", err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modifier l'événement</h1>
        <p className="text-muted-foreground">Modifiez les informations de l'événement</p>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Informations de l'événement</CardTitle>
                <CardDescription>Modifiez les détails de l'événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de l'événement</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clubId">Club organisateur</Label>
                  <Select value={formData.clubId} onValueChange={(value) => handleSelectChange("clubId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un club" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClubs.map((club) => (
                        <SelectItem key={club.id} value={club.id}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Heure</Label>
                    <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacité (nombre de places)</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/events")}>
                  Annuler
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Participants à l'événement</CardTitle>
              <CardDescription>Gérez les inscriptions à cet événement</CardDescription>
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
                        <p className="text-sm text-muted-foreground">participant{index + 1}@example.com</p>
                      </div>
                    </div>
                    <Button variant="destructive">Annuler l'inscription</Button>
                  </div>
                ))}

                {/* Message si aucun participant */}
                {Array.from({ length: 5 }).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Aucun participant inscrit à cet événement</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
