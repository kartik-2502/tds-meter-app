
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import History from './components/History'
import Navigation from './components/Navigation'
import { TDSProvider } from './context/TDSContext'

function App() {
  return (
    <TDSProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <div className="flex">
            <Navigation />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </TDSProvider>
  )
}

export default App 