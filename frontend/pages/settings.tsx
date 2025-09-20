import MT4Importer from '../components/MT4Importer';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Importer depuis MT4/MT5</h2>
          <MT4Importer />
        </div>
      </div>
    </div>
  );
}
