
import { useTDS } from '../context/TDSContext'
import { Droplets } from 'lucide-react'

const TDSDisplay: React.FC = () => {
  const { device } = useTDS()
  const reading = device.lastReading

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-quality-excellent'
      case 'good':
        return 'text-quality-good'
      case 'fair':
        return 'text-quality-fair'
      case 'poor':
        return 'text-quality-poor'
      default:
        return 'text-gray-900'
    }
  }

  const getQualityText = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'Excellent'
      case 'good':
        return 'Good'
      case 'fair':
        return 'Fair'
      case 'poor':
        return 'Poor'
      default:
        return 'Unknown'
    }
  }

  if (!device.isConnected) {
    return (
      <div className="text-center py-12">
        <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-500 mb-2">Device Not Connected</h2>
        <p className="text-gray-400">Connect your TDS meter to start monitoring</p>
      </div>
    )
  }

  if (!reading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mx-auto mb-2 w-48"></div>
          <div className="h-4 bg-gray-200 rounded mx-auto w-32"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <div className="mb-6">
        <Droplets className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Current TDS Reading</h2>
        <p className="text-gray-600">Total Dissolved Solids</p>
      </div>
      
      <div className="mb-8">
        <div className={`tds-display ${getQualityColor(reading.quality)}`}>
          {reading.value.toFixed(1)}
        </div>
        <div className="text-xl text-gray-600 font-medium">ppm</div>
      </div>
      
      <div className="mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getQualityColor(reading.quality)} bg-opacity-10`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${getQualityColor(reading.quality)}`}></span>
          {getQualityText(reading.quality)} Quality
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-gray-600">
          <div>Temperature</div>
          <div className="font-semibold text-gray-900">{reading.temperature.toFixed(1)}°C</div>
        </div>
        <div className="text-gray-600">
          <div>Last Updated</div>
          <div className="font-semibold text-gray-900">
            {reading.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TDSDisplay 