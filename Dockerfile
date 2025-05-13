# Étape 1: Construction de l'image (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances de production (en utilisant --legacy-peer-deps pour résoudre les conflits)
RUN npm ci --only=production --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Étape 2: Image de production (Runner)
FROM node:20-alpine AS runner

WORKDIR /app

# Définir l'environnement à "production"
ENV NODE_ENV=production

# Copier le fichier .env dans le conteneur
COPY .env .env

# Définir les variables d'environnement spécifiques à l'application
# Note: Ces variables sont automatiquement disponibles via .env, donc pas besoin de les ajouter ici
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} 

# Copier les fichiers de l'application depuis l'étape de build
COPY --from=builder /app /app

# Exposer le port sur lequel l'application sera lancée
EXPOSE 3000

# Lancer l'application (vous pouvez ajuster la commande selon vos besoins)
CMD ["npm", "run", "start"]
