import { useParams, useNavigate } from 'react-router-dom'
import RecordForm from '../components/RecordForm'
import { useLab } from '../context/LabContext'

export default function EditRecord() {
    const { id } = useParams()
    const { records, updateRecord } = useLab()
    const nav = useNavigate()
    const existing = records.find(r => r.id === id)
    if (!existing) return <div>Record not found</div>

    const handleSubmit = (data) => {
        updateRecord(id, data)
        nav('/')
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Edit Record</h2>
            <div className="bg-white p-4 rounded shadow">
                <RecordForm onSubmit={handleSubmit} initialData={existing} />
            </div>
        </div>
    )
}