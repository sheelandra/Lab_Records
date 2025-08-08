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
        <div>
            <h2 className="text-lg font-semibold mb-3">Doctors Master</h2>
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex gap-2">
                    <input className="border p-2 rounded  flex-1" placeholder='Doctor Name' value={name} onChange={e => setName(e.target.value)} />
                    <input className="border p-2 rounded  w-40" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
                    <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-1 rounded">Add</button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {doctors.map(d => (<div key={d.id} className="bg-white p-3 rounded shadow flex justify-between items-center">

                    <div>{d.name} — {d.phone}</div>

                    <div className="text-sm text-gray-600 bg-green-600"> ID: {d.id.slice(0, 6)}</div>
                </div>
                ))}
            </div>
        </div>
    )
}
