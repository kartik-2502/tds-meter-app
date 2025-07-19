import { useState } from 'react'
import { useTDS, TDSReading } from '../context/TDSContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, Download, Trash2 } from 'lucide-react'
import QualityIndicator from './QualityIndicator'

const History: React.FC = () => {
  const { readings, clearHistory } = useTDS()
  const [selectedPeriod, setSelectedPeriod] = useState('24h')

  const getFilteredReadings = () => {
    const now = new Date()
    const periods = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }

    const periodMs = periods[selectedPeriod as keyof typeof periods] || periods['24h']
    const cutoff = new Date(now.getTime() - periodMs)

    return readings.filter((reading: TDSReading) => reading.timestamp > cutoff)
  }

  const filteredReadings = getFilteredReadings()

  const chartData = filteredReadings.map((reading: TDSReading) => ({
    time: reading.timestamp.toLocaleTimeString(),
    tds: reading.value,
    temperature: reading.temperature,
    quality: reading.quality,
  }))

  const exportData = () => {
    const csvContent = [
      'Timestamp,TDS (ppm),Temperature (°C),Quality',
      ...readings.map((reading: TDSReading) => 
        `${reading.timestamp.toISOString()},${reading.value},${reading.temperature},${reading.quality}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tds-readings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStats = () => {
    if (filteredReadings.length === 0) return null

    const values = filteredReadings.map((r: TDSReading) => r.value)
    const temperatures = filteredReadings.map((r: TDSReading) => r.temperature)

    return {
      minTDS: Math.min(...values),
      maxTDS: Math.max(...values),
      avgTDS: values.reduce((a: number, b: number) => a + b, 0) / values.length,
      minTemp: Math.min(...temperatures),
      maxTemp: Math.max(...temperatures),
      avgTemp: temperatures.reduce((a: number, b: number) => a + b, 0) / temperatures.length,
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">History</h1>
          <p className="text-gray-600">View historical TDS readings and trends</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            disabled={readings.length === 0}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={clearHistory}
            disabled={readings.length === 0}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Time Period:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">TDS Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average:</span>
                <span className="font-medium">{stats.avgTDS.toFixed(1)} ppm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum:</span>
                <span className="font-medium">{stats.minTDS.toFixed(1)} ppm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum:</span>
                <span className="font-medium">{stats.maxTDS.toFixed(1)} ppm</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average:</span>
                <span className="font-medium">{stats.avgTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum:</span>
                <span className="font-medium">{stats.minTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum:</span>
                <span className="font-medium">{stats.maxTemp.toFixed(1)}°C</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Readings:</span>
                <span className="font-medium">{filteredReadings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Period:</span>
                <span className="font-medium">{selectedPeriod}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">TDS Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tds" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Readings Table */}
      {filteredReadings.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Readings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">TDS (ppm)</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Temperature (°C)</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Quality</th>
                </tr>
              </thead>
              <tbody>
                {filteredReadings.map((reading) => (
                  <tr key={reading.id} className="border-b border-gray-100">
                    <td className="py-2 text-sm text-gray-900">
                      {reading.timestamp.toLocaleString()}
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

      {filteredReadings.length === 0 && (
        <div className="card text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">No Data Available</h3>
          <p className="text-gray-400">Start monitoring to see historical readings</p>
        </div>
      )}
    </div>
  )
}

export default History 