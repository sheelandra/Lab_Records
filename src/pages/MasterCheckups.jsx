import { useState } from 'react'
import { useLab } from '../context/LabContext'

export default function MasterCheckups() {
  const { checkups, addCheckup, updateCheckup, deleteCheckup } = useLab()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleAdd = () => {
    if (!name || !price) return
    addCheckup({ name, price })
    setName(''); setPrice('')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Checkups Master</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex gap-2">
          <input className="border p-2 rounded  flex-1" placeholder='CheckUp Name' value={name} onChange={e => setName(e.target.value)} />
          <input className="border p-2 rounded  w-40" placeholder='price' value={price} onChange={e => setPrice(e.target.value)} />
          <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {checkups.map(c => (
          <div key={c.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>{c.name} — ₹{c.price}</div>
            <div className="text-sm text-gray-600 bg-green-600"> ID: {c.id.slice(0, 6)}</div>
          </div >
        ))
        }
      </div >
    </div >
  )
}
