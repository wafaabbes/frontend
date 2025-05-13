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
import { mockClubs, mockEvents } from "@/app/mock-data"

export default function EditClubPage() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id as string

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    contactEmail: "",
    president: "",
  })
  const [clubEvents, setClubEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const categories = ["Sport", "Culture", "Science", "Art", "Technologie", "Autre"]

  useEffect(() => {
    // Récupérer les détails du club
    const club = mockClubs.find((c) => c.id === clubId)
    if (!club) {
      router.push("/admin/clubs")
      return
    }

    setFormData({
      name: club.name,
      category: club.category,
      description: club.description,
      location: club.location,
      contactEmail: club.contactEmail,
      president: club.president,
    })

    // Récupérer les événements du club
    const events = mockEvents.filter((event) => event.clubId === clubId)
    setClubEvents(events)

    setLoading(false)
  }, [clubId, router])

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

      // Redirection vers la liste des clubs
      router.push("/admin/clubs")
    } catch (err) {
      console.error("Erreur lors de la mise à jour du club", err)
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
        <h1 className="text-3xl font-bold tracking-tight">Modifier le club</h1>
        <p className="text-muted-foreground">Modifiez les informations du club</p>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Informations du club</CardTitle>
                <CardDescription>Modifiez les détails du club</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du club</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu de rencontre</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="president">Responsable / Président</Label>
                  <Input id="president" name="president" value={formData.president} onChange={handleChange} required />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/clubs")}>
                  Annuler
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Événements du club</CardTitle>
                <CardDescription>Gérez les événements organisés par ce club</CardDescription>
              </div>
              <Button onClick={() => router.push(`/admin/events/new?clubId=${clubId}`)}>Créer un événement</Button>
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
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">Aucun événement pour ce club</p>
                  <Button onClick={() => router.push(`/admin/events/new?clubId=${clubId}`)}>Créer un événement</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Membres du club</CardTitle>
              <CardDescription>Gérez les membres de ce club</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {formData.president.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{formData.president}</h3>
                      <p className="text-sm text-muted-foreground">Président</p>
                    </div>
                  </div>
                  <Button variant="outline" disabled>
                    Président
                  </Button>
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
                    <Button variant="destructive">Retirer</Button>
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
