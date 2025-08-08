import { Link } from 'react-router-dom'
import { useLab } from '../context/LabContext'

export default function Home() {
  const { records, deleteRecord } = useLab()

  return (<div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">All Records</h2>
      <Link to="/add" className="text-sm bg-green-600 text-white px-3 py-1 rounded">+ Add</Link>
    </div>

    {records.length === 0 ? (
      <div className="p-6 bg-white rounded shadow text-center">No records yet. Add one.</div>) : (
      <div className="flex flex-col gap-3"> {records.map(r => (
        <div key={r.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
          <div>
            <div className="font-medium">{r.personName} • {r.age} yrs</div>
            <div className="text-sm text-gray-700"> {r.date} {r.time}</div>
            <div className="text-sm text-gray-700">	₹{r.totalPrice} {r.discount ? `(discount ₹${r.discount})` : ''}</div>
          </div>
          <div className="flex gap-2">
            <Link to={`/view/${r.id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">View</Link>
            <Link to={`/view/${r.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Edit</Link>
            <button onClick={() => {
              if (confirm('Delete this record?')) deleteRecord(r.id)
            }} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
          </div>
        </div>
      ))}
      </div>
    )}
  </div>)
}