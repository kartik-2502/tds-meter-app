

interface QualityIndicatorProps {
  quality: 'excellent' | 'good' | 'fair' | 'poor'
}

const QualityIndicator: React.FC<QualityIndicatorProps> = ({ quality }: QualityIndicatorProps) => {
  const getQualityConfig = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return {
          color: 'text-quality-excellent',
          bgColor: 'bg-quality-excellent',
          label: 'Excellent'
        }
      case 'good':
        return {
          color: 'text-quality-good',
          bgColor: 'bg-quality-good',
          label: 'Good'
        }
      case 'fair':
        return {
          color: 'text-quality-fair',
          bgColor: 'bg-quality-fair',
          label: 'Fair'
        }
      case 'poor':
        return {
          color: 'text-quality-poor',
          bgColor: 'bg-quality-poor',
          label: 'Poor'
        }
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-200',
          label: 'Unknown'
        }
    }
  }

  const config = getQualityConfig(quality)

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bgColor} bg-opacity-10`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.bgColor}`}></span>
      {config.label}
    </div>
  )
}

export default QualityIndicator 