import { useNavigate } from 'react-router-dom'
import RecordForm from '../components/RecordForm'
import { useLab } from '../context/LabContext'

export default function AddRecord() {
    const { addRecord } = useLab()
    const nav = useNavigate()

    const handleSubmit = (data) => {
        addRecord(data)
        nav('/')
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Add Record</h2>
            <div className="bg-white p-4 rounded shadow">
                <RecordForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}