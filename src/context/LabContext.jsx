import { createContext, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
 
const LabContext = createContext()
 
export const LabProvider = ({ children }) => {
  const [records, setRecords] = useState([])
  const [checkups, setCheckups] = useState([
    { id: uuidv4(), name: 'CBC', price: '250' },
    { id: uuidv4(), name: 'Lipid Profile', price: '800' }
  ])
  const [doctors, setDoctors] = useState([
    { id: uuidv4(), name: 'Dr. Amit Sharma', phone: '9876543210' }
  ])
 
  const addRecord = (record) => {
    setRecords(prev => [...prev, { ...record, id: uuidv4() }])
  }
 
  const updateRecord = (id, updatedRecord) => {
setRecords(prev => prev.map(r => r.id === id ? { ...updatedRecord, id } : r))
  }
 
  const deleteRecord = (id) => {
setRecords(prev => prev.filter(r => r.id !== id))
  }
 
  const addCheckup = (checkup) => {
    setCheckups(prev => [...prev, { ...checkup, id: uuidv4() }])
  }
 
  const updateCheckup = (id, updated) => {
setCheckups(prev => prev.map(c => c.id === id ? { ...updated, id } : c))
  }
 
  const deleteCheckup = (id) => {
setCheckups(prev => prev.filter(c => c.id !== id))
  }
 
  const addDoctor = (doc) => {
    setDoctors(prev => [...prev, { ...doc, id: uuidv4() }])
  }
 
  const updateDoctor = (id, updated) => {
setDoctors(prev => prev.map(d => d.id === id ? { ...updated, id } : d))
  }
 
  const deleteDoctor = (id) => {
setDoctors(prev => prev.filter(d => d.id !== id))
  }
 
  return (
    <LabContext.Provider value={{
      records, addRecord, updateRecord, deleteRecord,
      checkups, addCheckup, updateCheckup, deleteCheckup,
      doctors, addDoctor, updateDoctor, deleteDoctor
    }}>
      {children}
    </LabContext.Provider>
  )
}
 
export const useLab = () => useContext(LabContext)