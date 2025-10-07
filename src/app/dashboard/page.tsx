
// 'use client';

// import { useEffect, useState } from 'react';
// import PasswordGenerator from '@/components/passwordGenerator';
// import { encryptData } from '@/lib/crypto';

// export default function Dashboard() {
//   const [vault, setVault] = useState<any[]>([]);
//   const [search, setSearch] = useState('');
//   const [newItem, setNewItem] = useState({
//     title: '', username: '', password: '', url: '', notes: ''
//   });

//   useEffect(() => {
//     loadVault();
//   }, []);

//   const loadVault = async () => {
//     const res = await fetch('/api/vault');
//     const data = await res.json();
//     setVault(data);
//   };

//   const handleSave = async () => {
//     const encrypted = {
//       ...newItem,
//       password: encryptData(newItem.password),
//     };
//     await fetch('/api/vault', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(encrypted),
//     });
//     setNewItem({ title: '', username: '', password: '', url: '', notes: '' });
//     loadVault();
//   };

//   const handleDelete = async (id: string) => {
//     await fetch('/api/vault', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id }),
//     });
//     loadVault();
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-5">
//       <h1 className="text-3xl mb-4">🔐 Secure Vault</h1>

//       <PasswordGenerator onGenerate={(pw) => setNewItem({ ...newItem, password: pw })} />

//       <div className="mt-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 mb-3 rounded bg-gray-800"
//         />
//         <div className="grid gap-3">
//           {vault
//             .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
//             .map((v) => (
//               <div key={v._id} className="bg-gray-800 p-3 rounded flex justify-between">
//                 <div>
//                   <h2 className="font-bold">{v.title}</h2>
//                   <p>{v.username}</p>
//                   <p className="text-sm text-gray-400">{v.url}</p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(v._id)}
//                   className="text-red-400 hover:text-red-300"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl mb-2">Add New Entry</h2>
//         {['title', 'username', 'password', 'url', 'notes'].map((field) => (
//           <input
//             key={field}
//             type="text"
//             placeholder={field}
//             className="w-full p-2 mb-2 rounded bg-gray-800"
//             value={(newItem as any)[field]}
//             onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
//           />
//         ))}
//         <button onClick={handleSave} className="bg-green-600 px-4 py-2 rounded">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import PasswordGenerator from '@/components/passwordGenerator';
import { encryptData } from '@/lib/crypto';

interface VaultItem {
  _id?: string;
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

export default function Dashboard() {
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState<VaultItem>({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });

  useEffect(() => {
    loadVault();
  }, []);

  const loadVault = async () => {
    const res = await fetch('/api/vault');
    const data: VaultItem[] = await res.json();
    setVault(data);
  };

  const handleSave = async () => {
    const encrypted = {
      ...newItem,
      password: encryptData(newItem.password),
    };
    await fetch('/api/vault', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(encrypted),
    });
    setNewItem({ title: '', username: '', password: '', url: '', notes: '' });
    loadVault();
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/vault', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadVault();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl mb-4">🔐 Secure Vault</h1>

      <PasswordGenerator onGenerate={(pw) => setNewItem({ ...newItem, password: pw })} />

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800"
        />
        <div className="grid gap-3">
          {vault
            .filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
            .map((v) => (
              <div key={v._id} className="bg-gray-800 p-3 rounded flex justify-between">
                <div>
                  <h2 className="font-bold">{v.title}</h2>
                  <p>{v.username}</p>
                  <p className="text-sm text-gray-400">{v.url}</p>
                </div>
                <button
                  onClick={() => handleDelete(v._id!)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-2">Add New Entry</h2>
        {(['title', 'username', 'password', 'url', 'notes'] as (keyof VaultItem)[]).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full p-2 mb-2 rounded bg-gray-800"
            value={newItem[field]}
            onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
          />
        ))}
        <button onClick={handleSave} className="bg-green-600 px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}
