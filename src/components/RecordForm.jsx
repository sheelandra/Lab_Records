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
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md space-y-5 animate-fade-in"
    >
      {/* Name */}
      <div className="transition-all duration-300 ease-in-out">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Name"
          value={form.personName}
          onChange={e => setForm({ ...form, personName: e.target.value })}
        />
        {errors.personName && <p className="text-red-500 text-sm mt-1">{errors.personName}</p>}
      </div>

      {/* Age & Gender */}
      <div className="flex flex-col sm:flex-row gap-4 transition-all duration-300">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Age"
            value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
        <div className="sm:w-40">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="10-digit-phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Checkups */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Checkups</label>
        <div className="flex flex-col gap-2 mt-2">
          {checkups.map(c => (
            <label key={c.id} className="flex items-center gap-2 text-sm transition-all duration-300">
              <input
                type="checkbox"
                checked={form.checkupIds.includes(c.id)}
                onChange={() => {
                  const updated = form.checkupIds.includes(c.id)
                    ? form.checkupIds.filter(id => id !== c.id)
                    : [...form.checkupIds, c.id];
                  setForm({ ...form, checkupIds: updated });
                }}
              />
              <span>{c.name} (₹{c.price})</span>
            </label>
          ))}
        </div>
        {errors.checkupIds && <p className="text-red-500 text-sm mt-1">{errors.checkupIds}</p>}
      </div>

      {/* Referred Doctor */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Referred Doctor</label>
        <select
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={form.doctorId}
          onChange={e => setForm({ ...form, doctorId: e.target.value })}
        >
          <option value="" se>Select Doctor</option>
          {doctors.map(d => (
            <option   value={d.id} >{d.name} — {d.phone}</option>
          ))}
        </select>
      </div>

      {/* Date & Time */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="sm:w-40">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>
      </div>

      {/* Discount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Discount (₹)</label>
        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="0"
          value={form.discount}
          onChange={e => setForm({ ...form, discount: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 transform hover:scale-[1.02]"
      >
        Save
      </button>
    </form>

  )
}