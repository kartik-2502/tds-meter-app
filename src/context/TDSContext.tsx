import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface TDSReading {
  id: string
  value: number
  timestamp: Date
  temperature: number
  quality: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface TDSDevice {
  isConnected: boolean
  port: string | null
  baudRate: number
  lastReading: TDSReading | null
}

interface TDSContextType {
  device: TDSDevice
  readings: TDSReading[]
  connectDevice: (port: string, baudRate: number) => Promise<void>
  disconnectDevice: () => void
  startMonitoring: () => void
  stopMonitoring: () => void
  isMonitoring: boolean
  clearHistory: () => void
  getQualityLevel: (tdsValue: number) => 'excellent' | 'good' | 'fair' | 'poor'
}

const TDSContext = createContext<TDSContextType | undefined>(undefined)

export const useTDS = () => {
  const context = useContext(TDSContext)
  if (context === undefined) {
    throw new Error('useTDS must be used within a TDSProvider')
  }
  return context
}

interface TDSProviderProps {
  children: ReactNode
}

export const TDSProvider: React.FC<TDSProviderProps> = ({ children }: TDSProviderProps) => {
  const [device, setDevice] = useState<TDSDevice>({
    isConnected: false,
    port: null,
    baudRate: 9600,
    lastReading: null,
  })
  
  const [readings, setReadings] = useState<TDSReading[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitoringInterval, setMonitoringInterval] = useState<number | null>(null)

  const getQualityLevel = (tdsValue: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (tdsValue <= 50) return 'excellent'
    if (tdsValue <= 150) return 'good'
    if (tdsValue <= 300) return 'fair'
    return 'poor'
  }

  const connectDevice = async (port: string, baudRate: number) => {
    try {
      // Simulate device connection
      setDevice((prev: TDSDevice) => ({
        ...prev,
        isConnected: true,
        port,
        baudRate,
      }))
      
      // Simulate initial reading
      const mockReading: TDSReading = {
        id: Date.now().toString(),
        value: Math.random() * 500,
        timestamp: new Date(),
        temperature: 20 + Math.random() * 10,
        quality: 'good',
      }
      
      setDevice((prev: TDSDevice) => ({ ...prev, lastReading: mockReading }))
      setReadings((prev: TDSReading[]) => [mockReading, ...prev.slice(0, 99)]) // Keep last 100 readings
    } catch (error) {
      console.error('Failed to connect to device:', error)
      throw error
    }
  }

  const disconnectDevice = () => {
    if (monitoringInterval) {
      clearInterval(monitoringInterval)
      setMonitoringInterval(null)
    }
    setIsMonitoring(false)
    setDevice((prev: TDSDevice) => ({
      ...prev,
      isConnected: false,
      port: null,
      lastReading: null,
    }))
  }

  const startMonitoring = () => {
    if (!device.isConnected) return

    setIsMonitoring(true)
    const interval = setInterval(() => {
      // Simulate TDS reading
      const mockReading: TDSReading = {
        id: Date.now().toString(),
        value: Math.random() * 500,
        timestamp: new Date(),
        temperature: 20 + Math.random() * 10,
        quality: 'good',
      }
      
      mockReading.quality = getQualityLevel(mockReading.value)
      
      setDevice((prev: TDSDevice) => ({ ...prev, lastReading: mockReading }))
      setReadings((prev: TDSReading[]) => [mockReading, ...prev.slice(0, 99)]) // Keep last 100 readings
    }, 2000) // Read every 2 seconds

    setMonitoringInterval(interval as unknown as number)
  }

  const stopMonitoring = () => {
    if (monitoringInterval) {
      clearInterval(monitoringInterval)
      setMonitoringInterval(null)
    }
    setIsMonitoring(false)
  }

  const clearHistory = () => {
    setReadings([])
  }

  useEffect(() => {
    return () => {
      if (monitoringInterval) {
        clearInterval(monitoringInterval)
      }
    }
  }, [monitoringInterval])

  const value: TDSContextType = {
    device,
    readings,
    connectDevice,
    disconnectDevice,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    clearHistory,
    getQualityLevel,
  }

  return (
    <TDSContext.Provider value={value}>
      {children}
    </TDSContext.Provider>
  )
} 