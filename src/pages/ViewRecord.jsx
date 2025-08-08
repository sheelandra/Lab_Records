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
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Record Details</h2>
            <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {r.personName}</div>
                <div><strong>Age / Gender:</strong> {r.age} yrs / {r.gender}</div>

                <div><strong>Phone:</strong> Phone: {r.phone}</div>

                <div><strong>Date/ Time:</strong>	Date / Time: {r.date} {r.time}</div>
                <div><strong>Checkups:</strong>
                    <ul className="list-disc ml-5">
                        {selected.map(s => <li key={s.id}>{s.name} — ₹{s.price}</li>)}
                    </ul>
                </div>

                <div><strong>Doctor:</strong> {doctor ? `${doctor.name} — ${doctor.phone}` : '—'}</div>
                <div><strong>Total Price:</strong> ₹{r.totalPrice}</div>
                <div><strong>Discount:</strong> ₹{r.discount || 0}</div>
            </div>

            <div className="mt-4 flex gap-2">
                <Link to={`/edit/${r.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Edit</Link>
                <Link to="/" className="px-3 py-1 bg-gray-200 rounded text-sm">Back</Link>
            </div>
        </div >
    )
}
