import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Trading Journal</title>
        <meta name="description" content="Journal de trading pour débutants et experts" />
      </Head>
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur ton Journal de Trading</h1>
        <p className="text-xl">Commence à suivre tes trades dès maintenant.</p>
      </main>
    </div>
  );
}