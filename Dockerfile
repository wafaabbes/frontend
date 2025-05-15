# Étape 1: Construction de l'image (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json et package-lock.json pour installer toutes les dépendances (dev + prod)
COPY package.json package-lock.json ./

# Installer toutes les dépendances (production + dev)
RUN npm ci --legacy-peer-deps

# Copier le reste des fichiers
COPY . .

# Construire l'application Next.js (création du dossier .next)
RUN npm run build

# Étape 2: Image de production (Runner)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement les fichiers nécessaires depuis builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

EXPOSE 3000

CMD ["npm", "start"]
