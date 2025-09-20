import { useState } from 'react';
import * as XLSX from 'xlsx';
import { addTrade } from '../lib/firebase';

export default function MT4Importer() {
  const [file, setFile] = useState(null);

  const handleImport = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const parseAndImport = () => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      for (const row of jsonData) {
        await addTrade({
          symbol: row.Symbol,
          entryPrice: row.EntryPrice,
          exitPrice: row.ExitPrice,
          notes: `Importé depuis MT4: ${row.Notes || ''}`,
          emotion: 'neutre',
        });
      }
      alert('Import terminé !');
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".csv,.xlsx" onChange={handleImport} />
      <button onClick={parseAndImport} className="bg-green-500 text-white p-2 rounded">
        Importer depuis MT4
      </button>
    </div>
  );
}
