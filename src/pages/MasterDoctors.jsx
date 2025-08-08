import { useState } from 'react'
import { useLab } from '../context/LabContext'

export default function MasterDoctors() {
    const { doctors, addDoctor } = useLab()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handleAdd = () => {
        if (!name || !/^[0-9]{10}$/.test(phone)) {
            alert('Provide valid name and 10-digit phone')
            return
        }
        addDoctor({ name, phone })
        setName(''); setPhone('')
    }

    return (
        <div className="p-4">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Doctors Master</h2>

            {/* Input Section */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Doctor Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-2 rounded sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Doctors List */}
            <div className="flex flex-col gap-3">
                {doctors.map(d => (
                    <div
                        key={d.id}
                        className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 animate-fade-in"
                    >
                        <div className="text-gray-800 font-medium">{d.name} — {d.phone}</div>
                        <div className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded">ID: {d.id.slice(0, 6)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
