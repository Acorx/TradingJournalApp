import { useState } from 'react';
import { analyzeTrades } from '../lib/api';

export default function AIChatbot({ trades }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    const response = await analyzeTrades(trades, question);
    setAnswer(response.analysis);
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Posez une question sur vos trades..."
        className="w-full p-2 border rounded"
      />
      <button onClick={handleAsk} className="bg-indigo-500 text-white p-2 rounded">
        Demander à l'IA
      </button>
      {answer && <div className="mt-4 p-4 bg-gray-100 rounded">{answer}</div>}
    </div>
  );
}
