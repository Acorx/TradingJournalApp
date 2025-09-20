import TradeForm from '../../components/TradeForm';
import TradeList from '../../components/TradeList';

export default function TradesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Journal de Trading</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ajouter un Trade</h2>
          <TradeForm onSuccess={() => alert('Trade ajouté avec succès !')} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Liste des Trades</h2>
          <TradeList />
        </div>
      </div>
    </div>
  );
}