# TradingJournalApp - Backend

## Description
Backend de l'application TradingJournalApp, développé avec Express.js et Firebase.

## Prérequis
- Node.js (v18+)
- Un compte Firebase (pour la base de données)
- Un compte SendGrid (pour les alertes email)
- Une clé API Mistral (pour l'analyse IA)

## Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Acorx/TradingJournalApp.git
   cd TradingJournalApp/backend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Copier `.env.example` en `.env` et configurer les variables d'environnement.

4. Démarrer le serveur en mode développement :
   ```bash
   npm run dev
   ```

## Déploiement
1. Construire l'image Docker :
   ```bash
   docker build -t trading-journal-backend .
   ```

2. Lancer le conteneur :
   ```bash
   docker run -p 5000:5000 trading-journal-backend
   ```

## Structure du projet
- `routes/` : Routes API
- `middleware/` : Middlewares (authentification)
- `scripts/` : Scripts Python pour MT5
- `firebase.js` : Configuration Firebase

## Fonctionnalités
- API REST pour la gestion des trades
- Import depuis MT4/MT5 (manuel et automatique)
- Backtesting et analyse technique
- Alertes email
- Analyse IA des trades

## Contribution
Les contributions sont les bienvenues ! Ouvre une issue ou une pull request.
