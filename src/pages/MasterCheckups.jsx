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
    <div className="p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Checkups Master</h2>

      {/* Input Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="CheckUp Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="border border-gray-300 p-2 rounded sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
          >
            Add
          </button>
        </div>
      </div>

      {/* Checkups List */}
      <div className="flex flex-col gap-3">
        {checkups.map(c => (
          <div
            key={c.id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 animate-fade-in"
          >
            <div className="text-gray-800 font-medium">{c.name} — ₹{c.price}</div>
            <div className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded">ID: {c.id.slice(0, 6)}</div>
          </div>
        ))}
      </div>
    </div>

  )
}
