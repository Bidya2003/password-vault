'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function PasswordGenerator({ onGenerate }: { onGenerate: (pw: string) => void }) {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);

  const generatePassword = () => {
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let chars = '';
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    if (includeLower) chars += lower;
    if (includeUpper) chars += upper;

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    onGenerate(password);
    toast.success('✅ Password generated!');
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl mb-2">Password Generator</h2>
      <input type="range" min={6} max={30} value={length} onChange={e => setLength(+e.target.value)} />
      <p>Length: {length}</p>

      <div className="grid grid-cols-2 gap-2 my-2">
        <label><input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} /> Numbers</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} /> Symbols</label>
        <label><input type="checkbox" checked={includeLower} onChange={e => setIncludeLower(e.target.checked)} /> Lowercase</label>
        <label><input type="checkbox" checked={includeUpper} onChange={e => setIncludeUpper(e.target.checked)} /> Uppercase</label>
      </div>

      <button onClick={generatePassword} className="bg-blue-500 px-3 py-2 rounded">
        Generate
      </button>
    </div>
  );
}