# ClubConnect - Architecture Microservices

Ce projet implémente une architecture microservices pour l'application ClubConnect de gestion de clubs étudiants.

## Architecture

L'application est composée de 4 microservices principaux :

1. **auth-service** : Gestion de l'authentification et des comptes utilisateurs
2. **clubs-service** : Gestion des clubs (création, modification, suppression, listing)
3. **events-service** : Gestion des événements universitaires
4. **gateway-service** : Point d'entrée unique (API Gateway) pour tout le trafic

Chaque service est indépendant avec sa propre base de données et peut être déployé, mis à jour et mis à l'échelle séparément.

## Technologies utilisées

- **Backend** : Node.js avec Express
- **Base de données** : MySQL
- **Authentification** : JWT (JSON Web Tokens)
- **Communication entre services** : API REST
- **Conteneurisation** : Docker et Docker Compose

## Prérequis

- Docker et Docker Compose
- Node.js (pour le développement local)

## Installation et démarrage

1. Clonez ce dépôt :
   \`\`\`
   git clone https://github.com/votre-username/clubconnect-microservices.git
   cd clubconnect-microservices
   \`\`\`

2. Lancez l'application avec Docker Compose :
   \`\`\`
   docker-compose up -d
   \`\`\`

3. L'application sera accessible à l'adresse suivante :
   - API Gateway : http://localhost:3000

## Points d'entrée API

### Auth Service (via Gateway)

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur
- `GET /api/auth/me` - Récupérer les informations de l'utilisateur connecté
- `GET /api/auth/users` - Récupérer la liste des utilisateurs (admin seulement)

### Clubs Service (via Gateway)

- `GET /api/clubs/clubs` - Récupérer tous les clubs
- `GET /api/clubs/clubs/:id` - Récupérer un club par son ID
- `POST /api/clubs/clubs` - Créer un nouveau club (admin seulement)
- `PUT /api/clubs/clubs/:id` - Mettre à jour un club (admin seulement)
- `DELETE /api/clubs/clubs/:id` - Supprimer un club (admin seulement)
- `POST /api/clubs/clubs/:id/join` - Rejoindre un club
- `DELETE /api/clubs/clubs/:id/leave` - Quitter un club
- `GET /api/clubs/user/clubs` - Récupérer les clubs d'un utilisateur
- `GET /api/clubs/clubs/:id/members` - Récupérer les membres d'un club

### Events Service (via Gateway)

- `GET /api/events/events` - Récupérer tous les événements
- `GET /api/events/events/:id` - Récupérer un événement par son ID
- `POST /api/events/events` - Créer un nouvel événement (admin seulement)
- `PUT /api/events/events/:id` - Mettre à jour un événement (admin seulement)
- `DELETE /api/events/events/:id` - Supprimer un événement (admin seulement)
- `POST /api/events/events/:id/register` - S'inscrire à un événement
- `DELETE /api/events/events/:id/unregister` - Se désinscrire d'un événement
- `GET /api/events/user/events` - Récupérer les événements d'un utilisateur
- `GET /api/events/clubs/:clubId/events` - Récupérer les événements d'un club
- `GET /api/events/events/:id/participants` - Récupérer les participants d'un événement

## Utilisateurs de test

L'application est préchargée avec deux utilisateurs de test :

1. **Administrateur**
   - Email: admin@example.com
   - Mot de passe: password

2. **Étudiant**
   - Email: student@example.com
   - Mot de passe: password

## Développement

Pour travailler sur un service spécifique en mode développement :

1. Arrêtez le service dans Docker Compose :
   \`\`\`
   docker-compose stop auth-service
   \`\`\`

2. Naviguez vers le répertoire du service :
   \`\`\`
   cd auth-service
   \`\`\`

3. Installez les dépendances :
   \`\`\`
   npm install
   \`\`\`

4. Lancez le service en mode développement :
   \`\`\`
   npm run dev
   \`\`\`

## Structure des dossiers

\`\`\`
clubconnect-microservices/
├── auth-service/         # Service d'authentification
├── clubs-service/        # Service de gestion des clubs
├── events-service/       # Service de gestion des événements
├── gateway-service/      # API Gateway
└── docker-compose.yml   # Configuration Docker Compose
\`\`\`

## Sécurité

- Toutes les communications entre les services se font via des API REST sécurisées
- L'authentification est gérée par JWT
- Les mots de passe sont hachés avec bcrypt
- Les services ne sont accessibles que via l'API Gateway

## Mise à l'échelle

Chaque service peut être mis à l'échelle indépendamment en fonction des besoins :

\`\`\`
docker-compose up -d --scale clubs-service=3
\`\`\`

## Surveillance et journalisation

Pour consulter les logs d'un service spécifique :

\`\`\`
docker-compose logs -f auth-service
\`\`\`

## Dépannage

### Problèmes de connexion à la base de données

Si un service ne peut pas se connecter à la base de données, vérifiez que le conteneur MySQL est en cours d'exécution :

\`\`\`
docker-compose ps mysql
\`\`\`

### Redémarrer un service

Pour redémarrer un service spécifique :

\`\`\`
docker-compose restart events-service
\`\`\`

## Contribution

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT.
