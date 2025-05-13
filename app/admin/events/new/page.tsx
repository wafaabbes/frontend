"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockClubs } from "@/app/mock-data"

export default function NewEventPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedClubId = searchParams.get("clubId")

  const [formData, setFormData] = useState({
    title: "",
    clubId: preselectedClubId || "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "50",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (preselectedClubId) {
      setFormData((prev) => ({ ...prev, clubId: preselectedClubId }))
    }
  }, [preselectedClubId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulation de création (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirection vers la liste des événements
      router.push("/admin/events")
    } catch (err) {
      console.error("Erreur lors de la création de l'événement", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Créer un nouvel événement</h1>
        <p className="text-muted-foreground">Remplissez le formulaire pour créer un nouvel événement</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informations de l'événement</CardTitle>
            <CardDescription>Entrez les détails du nouvel événement</CardDescription>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Création en cours..." : "Créer l'événement"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
