import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddRecord from './pages/AddRecord'
import EditRecord from './pages/EditRecord'
import ViewRecord from './pages/ViewRecord'
import MasterCheckups from './pages/MasterCheckups'
import MasterDoctors from './pages/MasterDoctors'
 
export default function App() {
  return (
    <Router>
      <header className="bg-blue-600 text-white p-4 sticky top-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">Lab Records</h1>
          <nav className="flex gap-3">
            <Link to="/" className="text-sm">Home</Link>
            <Link to="/add" className="text-sm">Add</Link>
            <Link to="/checkups" className="text-sm">Checkups</Link>
            <Link to="/doctors" className="text-sm">Doctors</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecord />} />
          <Route path="/edit/:id" element={<EditRecord />} />
          <Route path="/view/:id" element={<ViewRecord />} />
          <Route path="/checkups" element={<MasterCheckups />} />
          <Route path="/doctors" element={<MasterDoctors />} />
        </Routes>
      </main>
    </Router>
  )
}