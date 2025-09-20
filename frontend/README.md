# TradingJournalApp - Frontend

## Description
Frontend de l'application TradingJournalApp, développé avec Next.js, React, et Tailwind CSS.

## Prérequis
- Node.js (v18+)
- Un compte Firebase (pour l'authentification et la base de données)

## Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Acorx/TradingJournalApp.git
   cd TradingJournalApp/frontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Copier `.env.local.example` en `.env.local` et configurer les variables d'environnement.

4. Démarrer l'application en mode développement :
   ```bash
   npm run dev
   ```

## Déploiement sur Vercel
1. Installer l'outil Vercel CLI :
   ```bash
   npm install -g vercel
   ```

2. Déployer :
   ```bash
   vercel --prod
   ```

3. Configurer les variables d'environnement dans le tableau de bord Vercel.

## Structure du projet
- `pages/` : Pages Next.js
- `components/` : Composants React réutilisables
- `lib/` : Logique métier et intégrations (Firebase, API)
- `public/` : Fichiers statiques

## Fonctionnalités
- Journal de trading (ajout/modification/suppression)
- Import depuis MT4/MT5
- Analyse des performances (graphiques, indicateurs)
- Chatbot IA pour l'analyse des trades
- Thème sombre/clair

## Contribution
Les contributions sont les bienvenues ! Ouvre une issue ou une pull request.
