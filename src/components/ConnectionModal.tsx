import { useState } from 'react'
import { useTDS } from '../context/TDSContext'
import { X, Usb, Wifi } from 'lucide-react'

interface ConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, onClose }: ConnectionModalProps) => {
  const { connectDevice } = useTDS()
  const [port, setPort] = useState('COM3')
  const [baudRate, setBaudRate] = useState(9600)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connectDevice(port, baudRate)
      onClose()
    } catch (error) {
      console.error('Connection failed:', error)
      alert('Failed to connect to device. Please check your settings.')
    } finally {
      setIsConnecting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Connect Device</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="connectionType"
                  value="usb"
                  defaultChecked
                  className="mr-2"
                />
                <Usb className="w-4 h-4 mr-1" />
                USB
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="connectionType"
                  value="bluetooth"
                  className="mr-2"
                />
                <Wifi className="w-4 h-4 mr-1" />
                Bluetooth
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Port
            </label>
            <select
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="input-field"
            >
              <option value="COM1">COM1</option>
              <option value="COM2">COM2</option>
              <option value="COM3">COM3</option>
              <option value="COM4">COM4</option>
              <option value="COM5">COM5</option>
              <option value="COM6">COM6</option>
              <option value="COM7">COM7</option>
              <option value="COM8">COM8</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Baud Rate
            </label>
            <select
              value={baudRate}
              onChange={(e) => setBaudRate(Number(e.target.value))}
              className="input-field"
            >
              <option value={9600}>9600</option>
              <option value={19200}>19200</option>
              <option value={38400}>38400</option>
              <option value={57600}>57600</option>
              <option value={115200}>115200</option>
            </select>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Connection Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure your TDS meter is powered on</li>
              <li>• Check that the USB cable is properly connected</li>
              <li>• Verify the device drivers are installed</li>
              <li>• Try different COM ports if connection fails</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectionModal 