import { useParams, Link } from 'react-router-dom'
import { useLab } from '../context/LabContext'

export default function ViewRecord() {
    const { id } = useParams()
    const { records, checkups, doctors } = useLab()
    const r = records.find(x => x.id === id)
    if (!r) return <div>Record not found</div>
    const selected = checkups.filter(c => r.checkupIds?.includes(c.id))
    const doctor = doctors.find(d => d.id === r.doctorId)

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Record Details</h2>

            <div className="space-y-4 text-sm text-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span><strong>Name:</strong> {r.personName}</span>
                    <span><strong>Age / Gender:</strong> {r.age} yrs / {r.gender}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span><strong>Phone:</strong> {r.phone}</span>
                    <span><strong>Date / Time:</strong> {r.date} {r.time}</span>
                </div>

                <div>
                    <strong>Checkups:</strong>
                    <ul className="list-disc ml-5 mt-1">
                        {selected.map(s => (
                            <li key={s.id}>{s.name} — ₹{s.price}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span><strong>Doctor:</strong> {doctor ? `${doctor.name} — ${doctor.phone}`:""}</span>
                    <span><strong>Total Price:</strong> ₹{r.totalPrice}</span>
                </div>

                <div>
                    <strong>Discount:</strong> ₹{r.discount || 0}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link
                    to={`/edit/${r.id}`}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm transition"
                >
                    Edit
                </Link>
                <Link
                    to="/"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm transition"
                >
                    Back
                </Link>
            </div>
        </div>

    )
}
