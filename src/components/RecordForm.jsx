import { useState, useEffect } from 'react'
import { useLab } from '../context/LabContext'

export default function RecordForm({ onSubmit, initialData }) {
  const { checkups, doctors } = useLab()
  const [form, setForm] = useState(initialData || {
    personName: '', age: '', gender: '', phone: '',
    checkupIds: [], doctorId: '', date: '', time: '', discount: 0
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const validate = () => {
    const e = {}
    if (!form.personName) e.personName = 'Name is required'
    if (!form.age || Number(form.age) <= 0) e.age = 'Valid age required'
    if (!form.gender) e.gender = 'Select gender'
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone'
    if (!form.date) e.date = 'Date required'
    if (!form.time) e.time = 'Time required'
    if (!form.checkupIds || form.checkupIds.length === 0) e.checkupIds = 'Select at least one checkup'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const selected = checkups.filter(c => form.checkupIds.includes(c.id))
    const total = selected.reduce((s, c) => s + Number(c.price), 0)
    const totalAfterDiscount = total - Number(form.discount || 0)
    onSubmit({ ...form, totalPrice: totalAfterDiscount })
  }

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label>Name</label>
        <input className="border p-2 rounded" placeholder="Name" value={form.personName} onChange={e => setForm({ ...form, personName: e.target.value })} />
        {errors.personName && <p className="text-red-500 text-sm">{errors.personName}</p>}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label>Age</label>
          <input type="number" className="border p-2 rounded" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className="w-40">
          <label>Gender</label>
          <select className="border p-2 rounded" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
      </div>


      <div>
        <label>Phone</label>
        <input className='border p-2 rounded' placeholder='10-digit-phone' value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>


      <div>
        <label className="font-medium">Checkups</label>
        <div className="flex flex-col gap-2">
          {checkups.map(c => (
            <label key={c.id} className="flex items-center gap-2">
              <input type='checkbox' checked={form.checkupIds.includes(c.id)} onChange={() => { const updated = form.checkupIds.includes(c.id) ? form.checkupIds.filter(id => id !== c.id) : [...form.checkupIds, c.id]; setForm({ ...form, checkupIds: updated }); }} />
              <span>{c.name} (₹{c.price})</span>
            </label>
          )
          )
          }
        </div>
        {errors.checkupIds && <p className="text-red-500 text-sm">{errors.checkupIds}</p>}
      </div>

      <div>
        <label>Referred Doctor</label>
        <select className="border p-2 rounded" value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.id}>{d.name} — {d.phone}</option>)}
        </select>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label>Date</label>
          <input type="date" className="border p-2 rounded w-full" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div className="w-40">
          <label>Time</label>
          <input type="time" className="border p-2 rounded w-full" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
        </div>

      </div>


      <div>
        <label>Discount (₹)</label>
        <input type="number" className="border p-2 rounded" placeholder="0" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} />
      </div>
      <button className="bg-blue-600 text-white p-2 rounded">Save</button>
    </form >

  )
}