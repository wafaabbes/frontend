// Données simulées pour les clubs
export const mockClubs = [
  {
    id: "club1",
    name: "Club de Programmation",
    category: "Technologie",
    description:
      "Un club pour les passionnés de programmation et de développement informatique. Nous organisons des ateliers, des hackathons et des sessions de codage collaboratif.",
    memberCount: 45,
    createdAt: "2023-09-15",
    location: "Salle 101, Bâtiment A",
    contactEmail: "programming@example.com",
    president: "Alexandre Martin",
  },
  {
    id: "club2",
    name: "Club de Photographie",
    category: "Art",
    description:
      "Explorez votre passion pour la photographie avec notre club. Nous organisons des sorties photo, des expositions et des ateliers techniques pour tous les niveaux.",
    memberCount: 32,
    createdAt: "2023-08-20",
    location: "Salle 205, Bâtiment B",
    contactEmail: "photo@example.com",
    president: "Sophie Dubois",
  },
  {
    id: "club3",
    name: "Club de Débat",
    category: "Culture",
    description:
      "Améliorez vos compétences en argumentation et en prise de parole en public. Nous organisons des débats sur des sujets d'actualité et des compétitions.",
    memberCount: 28,
    createdAt: "2023-10-05",
    location: "Amphithéâtre C",
    contactEmail: "debate@example.com",
    president: "Thomas Leroy",
  },
  {
    id: "club4",
    name: "Club de Football",
    category: "Sport",
    description:
      "Rejoignez notre équipe de football pour des entraînements réguliers et des matchs amicaux contre d'autres établissements.",
    memberCount: 22,
    createdAt: "2023-09-01",
    location: "Terrain de sport",
    contactEmail: "football@example.com",
    president: "Lucas Bernard",
  },
  {
    id: "club5",
    name: "Club de Robotique",
    category: "Science",
    description:
      "Concevez, construisez et programmez des robots. Nous participons à des compétitions nationales et organisons des ateliers d'initiation.",
    memberCount: 18,
    createdAt: "2023-11-10",
    location: "Laboratoire de Robotique",
    contactEmail: "robotics@example.com",
    president: "Emma Petit",
  },
]

// Données simulées pour les événements
export const mockEvents = [
  {
    id: "event1",
    title: "Hackathon d'Innovation",
    clubId: "club1",
    description:
      "Un marathon de programmation de 24 heures pour développer des solutions innovantes à des problèmes réels. Ouvert à tous les niveaux.",
    date: "2025-05-20",
    time: "09:00",
    location: "Centre d'Innovation, Bâtiment D",
    capacity: 50,
  },
  {
    id: "event2",
    title: "Exposition Photo: Nature Urbaine",
    clubId: "club2",
    description:
      "Une exposition des meilleures photographies de notre club sur le thème de la nature dans les environnements urbains.",
    date: "2025-05-25",
    time: "14:00",
    location: "Galerie d'Art, Bâtiment B",
    capacity: 100,
  },
  {
    id: "event3",
    title: "Débat: Intelligence Artificielle et Société",
    clubId: "club3",
    description:
      "Un débat ouvert sur l'impact de l'intelligence artificielle sur notre société et les enjeux éthiques associés.",
    date: "2025-05-18",
    time: "18:30",
    location: "Amphithéâtre C",
    capacity: 80,
  },
  {
    id: "event4",
    title: "Tournoi de Football Inter-écoles",
    clubId: "club4",
    description:
      "Un tournoi amical entre les équipes de différentes écoles de la région. Venez supporter notre équipe!",
    date: "2025-06-05",
    time: "14:00",
    location: "Terrain de sport principal",
    capacity: 200,
  },
  {
    id: "event5",
    title: "Atelier d'Initiation à la Robotique",
    clubId: "club5",
    description:
      "Un atelier pratique pour découvrir les bases de la robotique et construire votre premier robot simple.",
    date: "2025-05-30",
    time: "10:00",
    location: "Laboratoire de Robotique",
    capacity: 30,
  },
  {
    id: "event6",
    title: "Workshop JavaScript Avancé",
    clubId: "club1",
    description:
      "Un atelier pour approfondir vos connaissances en JavaScript et découvrir les dernières fonctionnalités du langage.",
    date: "2025-06-10",
    time: "17:00",
    location: "Salle 101, Bâtiment A",
    capacity: 40,
  },
]
