"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockClubs } from "@/app/mock-data"

export default function ClubsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [userClubs, setUserClubs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userClubs")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const categories = ["Sport", "Culture", "Science", "Art", "Technologie", "Autre"]

  const filteredClubs = mockClubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || club.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleJoinClub = (clubId: string) => {
    const updatedClubs = [...userClubs]

    if (updatedClubs.includes(clubId)) {
      // Quitter le club
      const index = updatedClubs.indexOf(clubId)
      updatedClubs.splice(index, 1)
    } else {
      // Rejoindre le club
      updatedClubs.push(clubId)
    }

    setUserClubs(updatedClubs)
    localStorage.setItem("userClubs", JSON.stringify(updatedClubs))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-muted-foreground">Découvrez et rejoignez les clubs qui vous intéressent</p>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <Card key={club.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
              <CardDescription>{club.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{club.description}</p>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Membres:</span> {club.memberCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Créé le:</span> {new Date(club.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/student/clubs/${club.id}`)}>
                Détails
              </Button>
              <Button
                variant={userClubs.includes(club.id) ? "destructive" : "default"}
                onClick={() => handleJoinClub(club.id)}
              >
                {userClubs.includes(club.id) ? "Quitter" : "Rejoindre"}
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredClubs.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">Aucun club ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}
