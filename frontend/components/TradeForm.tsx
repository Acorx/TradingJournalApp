import { useForm } from 'react-hook-form';
import { addTrade, updateTrade } from '../lib/firebase';

export default function TradeForm({ trade, onSuccess }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: trade });

  const onSubmit = async (data) => {
    if (trade) {
      await updateTrade(trade.id, data);
    } else {
      await addTrade(data);
    }
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('symbol', { required: true })} placeholder="Symbole (ex: EUR/USD)" className="w-full p-2 border rounded" />
      <input {...register('entryPrice', { required: true, valueAsNumber: true })} type="number" placeholder="Prix d'entrée" className="w-full p-2 border rounded" />
      <input {...register('exitPrice', { valueAsNumber: true })} type="number" placeholder="Prix de sortie" className="w-full p-2 border rounded" />
      <select {...register('emotion')} className="w-full p-2 border rounded">
        <option value="">Émotion</option>
        <option value="confiant">Confiant</option>
        <option value="stressé">Stressé</option>
        <option value="neutre">Neutre</option>
      </select>
      <textarea {...register('notes')} placeholder="Notes (stratégie, contexte...)" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {trade ? 'Mettre à jour' : 'Ajouter le trade'}
      </button>
    </form>
  );
}