"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockClubs } from "@/app/mock-data"

export default function AdminClubsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = ["Sport", "Culture", "Science", "Art", "Technologie", "Autre"]

  const filteredClubs = mockClubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || club.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des clubs</h1>
          <p className="text-muted-foreground">Créez, modifiez et supprimez des clubs</p>
        </div>
        <Button onClick={() => router.push("/admin/clubs/new")}>Créer un club</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Rechercher un club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[250px]"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClubs.map((club) => (
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

            {filteredClubs.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Aucun club ne correspond à votre recherche</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
