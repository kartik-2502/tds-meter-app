import { useState } from 'react'
import { useTDS, TDSReading } from '../context/TDSContext'
import { Play, Pause, Wifi, WifiOff, Thermometer, Zap } from 'lucide-react'
import TDSDisplay from './TDSDisplay'
import QualityIndicator from './QualityIndicator'
import ConnectionModal from './ConnectionModal'

const Dashboard: React.FC = () => {
  const {
    device,
    readings,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
  } = useTDS()

  const [showConnectionModal, setShowConnectionModal] = useState(false)

  const getAverageTDS = () => {
    if (readings.length === 0) return 0
    const sum = readings.reduce((acc: number, reading: TDSReading) => acc + reading.value, 0)
    return Math.round(sum / readings.length)
  }

  const getAverageTemperature = () => {
    if (readings.length === 0) return 0
    const sum = readings.reduce((acc: number, reading: TDSReading) => acc + reading.temperature, 0)
    return Math.round((sum / readings.length) * 10) / 10
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your water quality in real-time</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {device.isConnected ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm font-medium">
              {device.isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {!device.isConnected && (
            <button
              onClick={() => setShowConnectionModal(true)}
              className="btn-primary"
            >
              Connect Device
            </button>
          )}
        </div>
      </div>

      {/* Main TDS Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <TDSDisplay />
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Device Status */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Connection:</span>
                <span className={`font-medium ${device.isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {device.isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {device.port && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Port:</span>
                  <span className="font-medium text-gray-900">{device.port}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Baud Rate:</span>
                <span className="font-medium text-gray-900">{device.baudRate}</span>
              </div>
            </div>
          </div>

          {/* Monitoring Controls */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${isMonitoring ? 'text-green-600' : 'text-gray-600'}`}>
                  {isMonitoring ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={startMonitoring}
                  disabled={!device.isConnected || isMonitoring}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
                <button
                  onClick={stopMonitoring}
                  disabled={!isMonitoring}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average TDS</p>
              <p className="text-2xl font-bold text-gray-900">{getAverageTDS()} ppm</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{getAverageTemperature()}°C</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Readings</p>
              <p className="text-2xl font-bold text-gray-900">{readings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Readings */}
      {readings.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Readings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Time</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">TDS (ppm)</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Temperature (°C)</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Quality</th>
                </tr>
              </thead>
              <tbody>
                {readings.slice(0, 10).map((reading) => (
                  <tr key={reading.id} className="border-b border-gray-100">
                    <td className="py-2 text-sm text-gray-900">
                      {reading.timestamp.toLocaleTimeString()}
                    </td>
                    <td className="py-2 text-sm font-medium text-gray-900">
                      {reading.value.toFixed(1)}
                    </td>
                    <td className="py-2 text-sm text-gray-900">
                      {reading.temperature.toFixed(1)}
                    </td>
                    <td className="py-2">
                      <QualityIndicator quality={reading.quality} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConnectionModal
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
      />
    </div>
  )
}

export default Dashboard 