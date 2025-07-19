# TDS Meter Application

A modern, responsive web application for monitoring Total Dissolved Solids (TDS) in water using a TDS meter device. This application provides real-time monitoring, historical data analysis, and comprehensive device management capabilities.

## Features

### 🎯 Core Functionality
- **Real-time TDS Monitoring**: Live display of TDS readings with quality indicators
- **Device Management**: Easy connection and configuration of TDS meter devices
- **Data Visualization**: Interactive charts and graphs for trend analysis
- **Historical Data**: Comprehensive history tracking with filtering options
- **Quality Assessment**: Automatic water quality classification based on TDS levels

### 📊 Data Management
- **Data Export**: Export readings to CSV format
- **Data Retention**: Configurable data storage limits
- **Filtering**: Time-based filtering (1h, 6h, 24h, 7d, 30d)
- **Statistics**: Min, max, and average calculations

### ⚙️ Configuration
- **Device Settings**: Port configuration, baud rate selection
- **Calibration**: Device calibration with offset and slope adjustments
- **Alert Thresholds**: Customizable TDS and temperature alerts
- **Monitoring Intervals**: Configurable reading intervals (1s to 30s)

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Dark/Light Mode**: Adaptive color schemes
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use sidebar navigation

## Water Quality Standards

The application automatically classifies water quality based on TDS levels:

| TDS Level (ppm) | Quality | Color Code |
|-----------------|---------|------------|
| 0-50 | Excellent | Green |
| 51-150 | Good | Yellow |
| 151-300 | Fair | Orange |
| 300+ | Poor | Red |

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- TDS meter device with USB or Bluetooth connectivity

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tds-meter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Connecting Your Device

1. **Power on your TDS meter** and ensure it's properly connected via USB or Bluetooth
2. **Click "Connect Device"** on the dashboard
3. **Select the appropriate port** (COM1-COM8 for USB connections)
4. **Choose the baud rate** (typically 9600 for most devices)
5. **Click "Connect"** to establish the connection

### Monitoring Water Quality

1. **Start monitoring** by clicking the "Start" button
2. **View real-time readings** on the dashboard
3. **Monitor quality indicators** that automatically update based on TDS levels
4. **Check temperature readings** alongside TDS values

### Analyzing Historical Data

1. **Navigate to the History tab** to view past readings
2. **Select a time period** to filter the data
3. **View statistics** including averages, minimums, and maximums
4. **Export data** to CSV format for external analysis

### Configuring Settings

1. **Access the Settings tab** to configure application preferences
2. **Set alert thresholds** for TDS and temperature levels
3. **Configure monitoring intervals** based on your needs
4. **Calibrate your device** using standard calibration solutions

## Device Compatibility

This application is designed to work with standard TDS meters that output data via:
- USB serial communication
- Bluetooth connectivity
- Standard TTL serial protocols

### Supported Data Formats
- ASCII text output
- JSON formatted data
- Standard serial protocols

## Technical Details

### Built With
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library

### Architecture
- **Context API** - State management for TDS data
- **Component-based** - Modular, reusable components
- **Responsive Design** - Mobile-first approach
- **Progressive Web App** - Can be installed as a desktop application

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard view
│   ├── History.tsx     # Historical data view
│   ├── Settings.tsx    # Settings and configuration
│   ├── Navigation.tsx  # Sidebar navigation
│   ├── TDSDisplay.tsx  # TDS reading display
│   ├── QualityIndicator.tsx # Quality status indicator
│   └── ConnectionModal.tsx  # Device connection modal
├── context/            # React context providers
│   └── TDSContext.tsx  # TDS data and device management
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common solutions
- Review the troubleshooting guide

## Roadmap

### Planned Features
- [ ] Real-time alerts and notifications
- [ ] Data synchronization with cloud storage
- [ ] Multi-device support
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] API for third-party integrations

### Known Issues
- Currently uses simulated data for demonstration
- Device drivers may need to be installed separately
- Some TDS meters may require specific communication protocols

---

**Note**: This application is designed for educational and professional use. Always follow proper calibration procedures and safety guidelines when working with water quality monitoring equipment. 