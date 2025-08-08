import { Link } from 'react-router-dom'
import { useLab } from '../context/LabContext'

export default function Home() {
  const { records, deleteRecord } = useLab()

  return (<div className="p-4">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <h2 className="text-xl font-semibold text-gray-800">All Records</h2>
      <Link
        to="/add"
        className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
      >
        + Add
      </Link>
    </div>

    {/* No Records Message */}
    {records.length === 0 ? (
      <div className="p-6 bg-white rounded shadow text-center text-gray-600 animate-fade-in">
        No records yet. Add one.
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        {records.map(r => (
          <div
            key={r.id}
            className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 animate-fade-in"
          >
            {/* Record Info */}
            <div className="text-gray-800">
              <div className="font-medium text-lg">{r.personName} • {r.age} yrs</div>
              <div className="text-sm text-gray-600">{r.date} {r.time}</div>
              <div className="text-sm text-gray-600">
                ₹{r.totalPrice} {r.discount ? `(discount ₹${r.discount})` : ''}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/view/${r.id}`}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition duration-300"
              >
                View
              </Link>
              <Link
                to={`/view/${r.id}`}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm('Delete this record?')) deleteRecord(r.id);
                }}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}