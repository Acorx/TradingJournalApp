import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Trading Journal App</title>
        <meta name="description" content="Journal de trading pour débutants et experts" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold mb-6">Bienvenue sur TradingJournalApp</h1>
        {!user ? (
          <div className="grid grid-cols-1 gap-4">
            <Link href="/login" className="bg-blue-500 text-white p-4 rounded text-center hover:bg-blue-600">
              Se connecter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/trades" className="bg-blue-500 text-white p-4 rounded text-center hover:bg-blue-600">
              Journal de Trading
            </Link>
            <Link href="/analysis" className="bg-green-500 text-white p-4 rounded text-center hover:bg-green-600">
              Analyse
            </Link>
            <Link href="/settings" className="bg-purple-500 text-white p-4 rounded text-center hover:bg-purple-600">
              Paramètres
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}