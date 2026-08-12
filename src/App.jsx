import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CatalogPage from './pages/CatalogPage'
import PersonalizadosPage from './pages/PersonalizadosPage'
import ExposPage from './pages/ExposPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/personalizados" element={<PersonalizadosPage />} />
        <Route path="/expos" element={<ExposPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
