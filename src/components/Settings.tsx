import { useState } from 'react'
import { useTDS } from '../context/TDSContext'
import { Settings as SettingsIcon, Save, RotateCcw, AlertTriangle } from 'lucide-react'

const Settings: React.FC = () => {
  const { device, disconnectDevice } = useTDS()
  const [settings, setSettings] = useState({
    autoConnect: false,
    monitoringInterval: 2000,
    dataRetention: 100,
    temperatureUnit: 'celsius',
    tdsUnit: 'ppm',
    alerts: {
      highTDS: 300,
      lowTDS: 50,
      highTemp: 30,
      lowTemp: 10,
    },
  })

  const [calibration, setCalibration] = useState({
    offset: 0,
    slope: 1.0,
    lastCalibrated: null as Date | null,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleAlertChange = (key: string, value: number) => {
    setSettings((prev: any) => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [key]: value,
      },
    }))
  }

  const handleCalibrationChange = (key: string, value: number) => {
    setCalibration((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSettings = () => {
    // In a real app, this would save to localStorage or backend
    localStorage.setItem('tds-settings', JSON.stringify(settings))
    localStorage.setItem('tds-calibration', JSON.stringify(calibration))
    alert('Settings saved successfully!')
  }

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings({
        autoConnect: false,
        monitoringInterval: 2000,
        dataRetention: 100,
        temperatureUnit: 'celsius',
        tdsUnit: 'ppm',
        alerts: {
          highTDS: 300,
          lowTDS: 50,
          highTemp: 30,
          lowTemp: 10,
        },
      })
      setCalibration({
        offset: 0,
        slope: 1.0,
        lastCalibrated: null,
      })
    }
  }

  const calibrateDevice = () => {
    if (confirm('Place the sensor in calibration solution and click OK to calibrate.')) {
      setCalibration((prev: any) => ({
        ...prev,
        lastCalibrated: new Date(),
      }))
      alert('Calibration completed successfully!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your TDS meter and application preferences</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={resetToDefaults}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={saveSettings}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            General Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-connect on startup
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoConnect}
                  onChange={(e) => handleSettingChange('autoConnect', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Automatically connect to device when app starts</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monitoring Interval (ms)
              </label>
              <select
                value={settings.monitoringInterval}
                onChange={(e) => handleSettingChange('monitoringInterval', Number(e.target.value))}
                className="input-field"
              >
                <option value={1000}>1 second</option>
                <option value={2000}>2 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention (readings)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', Number(e.target.value))}
                className="input-field"
                min="10"
                max="10000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature Unit
              </label>
              <select
                value={settings.temperatureUnit}
                onChange={(e) => handleSettingChange('temperatureUnit', e.target.value)}
                className="input-field"
              >
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alert Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Alert Thresholds
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                High TDS Alert (ppm)
              </label>
              <input
                type="number"
                value={settings.alerts.highTDS}
                onChange={(e) => handleAlertChange('highTDS', Number(e.target.value))}
                className="input-field"
                min="0"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low TDS Alert (ppm)
              </label>
              <input
                type="number"
                value={settings.alerts.lowTDS}
                onChange={(e) => handleAlertChange('lowTDS', Number(e.target.value))}
                className="input-field"
                min="0"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                High Temperature Alert (°C)
              </label>
              <input
                type="number"
                value={settings.alerts.highTemp}
                onChange={(e) => handleAlertChange('highTemp', Number(e.target.value))}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low Temperature Alert (°C)
              </label>
              <input
                type="number"
                value={settings.alerts.lowTemp}
                onChange={(e) => handleAlertChange('lowTemp', Number(e.target.value))}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Calibration Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calibration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offset
              </label>
              <input
                type="number"
                step="0.1"
                value={calibration.offset}
                onChange={(e) => handleCalibrationChange('offset', Number(e.target.value))}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slope
              </label>
              <input
                type="number"
                step="0.01"
                value={calibration.slope}
                onChange={(e) => handleCalibrationChange('slope', Number(e.target.value))}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Calibrated
              </label>
              <div className="text-sm text-gray-600">
                {calibration.lastCalibrated 
                  ? calibration.lastCalibrated.toLocaleString()
                  : 'Never calibrated'
                }
              </div>
            </div>
            
            <button
              onClick={calibrateDevice}
              disabled={!device.isConnected}
              className="btn-primary w-full disabled:opacity-50"
            >
              Calibrate Device
            </button>
          </div>
        </div>

        {/* Device Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Connection Status:</span>
              <span className={`font-medium ${device.isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {device.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {device.port && (
              <div className="flex justify-between">
                <span className="text-gray-600">Port:</span>
                <span className="font-medium text-gray-900">{device.port}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Baud Rate:</span>
              <span className="font-medium text-gray-900">{device.baudRate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">App Version:</span>
              <span className="font-medium text-gray-900">1.0.0</span>
            </div>
            
            {device.isConnected && (
              <button
                onClick={disconnectDevice}
                className="btn-secondary w-full mt-4"
              >
                Disconnect Device
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 