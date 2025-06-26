import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Timeline,
  Modal,
  Radio,
  Input,
  Spin
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

function Home() {
  const { Title, Text } = Typography;

  const [reverse] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [setHasPredictions] = useState(false);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [explanationType, setExplanationType] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [customProfession, setCustomProfession] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');
  const [apiData, setApiData] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [locationState, setLocationState] = useState("Fetching...");
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [explanationResult, setExplanationResult] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastDataId, setLastDataId] = useState(1);
  const [predictions, setPredictions] = useState({
    rainfall: { probability: 0, intensity: 'Low' },
    flooding: { probability: 0, severity: 'Low' },
    wildfire: { probability: 0, risk: 'Low' },
    aqi: { level: 0, status: 'Good' }
  });

  // Fetch data from API
  const fetchLatestData = useCallback(async () => {
    try {
      const response = await fetch('https://api.gaiathonfuta.online/model/modeldata/create/');
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.length > 0) {
          const latestId = data[data.length - 1].id;
          
          setLastFetchTime(Date.now());
          setApiData(data);

          setLastDataId(prevId => {
            if (prevId !== latestId) {
              setDeviceConnected(true);
            } else {
              setDeviceConnected(false);
            }
            return latestId;
          });

          const last10Data = data.slice(-10);
          const transformedData = last10Data.map((item, index) => ({
            time: `T${index + 1}`,
            // Main graph data
            temperature: parseFloat(item.temperature) || 0.0,
            humidity: parseFloat(item.humidity) || 0.0,
            rainfall: item.raining ? 50.0 : 0.0,
            soilMoisture: parseFloat(item.soil_moisture) || 0.0,
            
            // Side graph 1 data
            pressure: Math.floor(item.atm_pressure / 68.94|| 0),
            heatIndex: parseFloat(item.heat_index) || 0.0,
            enthalpy: parseFloat(item.enthalpy) || 0.0,
            
            // Side graph 2 data
            co2: item.co_level || 0,
            batteryVoltage: parseFloat(item.battery_voltage) || 0.0,
            pollutionLevel: item.pollution_level || 0,
            
            // Common data
            sunlight: parseFloat(item.sunlight_intensity) || 0
          }));

          setCurrentData(transformedData);
        } else {
          setDeviceConnected(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDeviceConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestData();
    const fetchInterval = setInterval(fetchLatestData, 11000);
    return () => clearInterval(fetchInterval);
  }, [fetchLatestData]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (lastFetchTime && Date.now() - lastFetchTime > 12000) {
        setDeviceConnected(false);
      }
    }, 1000);
    return () => clearInterval(checkInterval);
  }, [lastFetchTime]);

  const handleGetPredictions = async () => {
    if (apiData.length === 0) return;
    
    const latestData = apiData[apiData.length - 1];
    const payload = {
      "Time": latestData.timestamp,
      "Temp Avg": latestData.temperature || 0,
      "Humidity Avg": latestData.humidity || 0,
      "Pressure": latestData.atm_pressure || 0,
      "Heat Index": latestData.heat_index || 0,
      "Enthalpy": latestData.enthalpy || 0,
      "Soil Moisture": latestData.soil_moisture || 0,
      "Sunlight Intensity": latestData.sunlight_intensity || 0,
      "MQ2": latestData.pollution_level || 0,
      "MQ7": latestData.co_level || 0,
      "Rain": latestData.raining || false,
      "GPS": `${latestData.latitude || 0},${latestData.longitude || 0}`,
      "temperature": latestData.temperature || 0,
      "humidity": latestData.humidity || 0,
      "atm_pressure": latestData.atm_pressure || 0,
      "heat Index": latestData.heat_index || 0,
      "enthalpy": latestData.enthalpy || 0,
      "soil_moisture": latestData.soil_moisture || 0,
      "sunlight_intensity": latestData.sunlight_intensity || 0,
      "pollution_level": latestData.pollution_level || 0,
      "co_level": latestData.co_level || 0,
      "raining": latestData.raining || false,
      "latitude": latestData.latitude || 0,
      "longitude": latestData.longitude || 0,
    };

    setLoading(true);
    
    try {
      const response = await fetch('https://api.gaiathonfuta.online/model/predict-hazard/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
      const data = await response.json();

      const transformed = {
        rainfall: {
          probability: data.rainfall_probability,
          intensity: data.rainfall_intensity_mm
        },
        flooding: {
          probability: data.flooding_probability,
          severity: data.flooding_severity
        },
        wildfire: {
          probability: data.wildfire_probability,
          risk: data.wildfire_probability > 50 ? "High" : "Low"
        },
        aqi: {
          level: data.pm25,
          status: data.aqi
        },
        heatwave: {
          probability: data.heatwave_probability
        },
        alerts: data.critical_alerts
      };

      setPredictions(transformed);
      setHasPredictions(true);
    }
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleExportToCSV = async () => {
    setExportLoading(true);
    
    try {
      // Fetch all data from the API
      const response = await fetch('https://api.gaiathonfuta.online/model/modeldata/create/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data for export');
      }
      
      const allData = await response.json();
      
      if (!allData || allData.length === 0) {
        alert('No data available to export');
        return;
      }
      
      // Define CSV headers
      const headers = [
        'ID',
        'Timestamp',
        'Temperature (°C)',
        'Humidity (%)',
        'Atmospheric Pressure',
        'Heat Index (°C)',
        'Enthalpy (KJ/KG)',
        'Soil Moisture (%)',
        'Sunlight Intensity (%)',
        'Pollution Level (%)',
        'CO Level (%)',
        'Raining',
        'Latitude',
        'Longitude',
        'Battery Voltage (V)'
      ];
      
      // Convert data to CSV format
      const csvContent = [
        headers.join(','), // Header row
        ...allData.map(item => [
          item.id || '',
          item.timestamp || '',
          item.temperature || 0,
          item.humidity || 0,
          item.atm_pressure || 0,
          item.heat_index || 0,
          item.enthalpy || 0,
          item.soil_moisture || 0,
          item.sunlight_intensity || 0,
          item.pollution_level || 0,
          item.co_level || 0,
          item.raining ? 'Yes' : 'No',
          item.latitude || 0,
          item.longitude || 0,
          item.battery_voltage || 0
        ].join(','))
      ].join('\n');
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `environmental_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleExplanationRequest = (type) => {
    setExplanationType(type);
    setShowProfessionModal(true);
  };

  const handleProfessionSelect = () => {
    setShowProfessionModal(false);
    setShowLanguageModal(true);
  };

  const handleLanguageSelect = async () => {
    setShowLanguageModal(false);
    const profession = selectedProfession || customProfession || "user";
    const language = selectedLanguage || customLanguage || "English";

    const endpoint =
      explanationType === "predictions"
        ? "https://api.gaiathonfuta.online/model/explain-prediction/"
        : "https://api.gaiathonfuta.online/model/explain-recent-trends/";

    const payload =
      explanationType === "predictions"
        ? {
            prediction: predictions,
            use_case: profession,
            language,
          }
        : {
            recent_data: apiData.slice(-10), // last 10 entries
            use_case: profession,
            language,
          };

    setExplanationLoading(true);

    try {
      setExplanationResult("");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result && result.explanation) {
        setExplanationResult(result.explanation);
        setShowExplanation(true);
      }
    } catch (err) {
      setExplanationResult("❗ Failed to generate explanation.");
      setShowExplanation(true);
    } finally {
      setExplanationLoading(false);
    }
  };

  const currentValues = currentData.length > 0 ? currentData[currentData.length - 1] : {
    temperature: 0.0,
    humidity: 0.0,
    rainfall: 0.0,
    pressure: 0,
    heatIndex: 0.0,
    co2: 0,
    batteryVoltage: 0.0,
    pollutionLevel: 0,
    sunlight: 0
  };

  const latestApiData = apiData.length > 0 ? apiData[apiData.length - 1] : null;
  const gpsData = {
    latitude: latestApiData ? latestApiData.latitude.toFixed(6) : "0.000000",
    longitude: latestApiData ? latestApiData.longitude.toFixed(6) : "0.000000"
  };

  const getLocationState = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const state = data.address.state || data.address.county || "Unknown";
      return state;
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    if (gpsData.latitude && gpsData.longitude) {
      getLocationState(gpsData.latitude, gpsData.longitude).then(setLocationState);
    }
  }, [gpsData.latitude, gpsData.longitude]);

  const count = [
    {
      today: "Hazard Type",
      title: "Rainfall, Flood, Wildfire",
      bnb: "bnb2",
    },
    {
      today: "Location",
      title: locationState,
      bnb: "bnb2",
    },
    {
      today: "Longitude",
      title: `${gpsData.longitude}° E`,
      bnb: "redtext",
    },
    {
      today: "Latitude",
      title: `${gpsData.latitude}° N`,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{c.today}</span>
                      <Title level={3} style={{ fontWeight: 'bold', margin: '8px 0' }}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="project-ant">
                <Title level={5} style={{ fontWeight: 'bold' }}>Model Predictions</Title>
                <Paragraph className="lastweek" style={{ fontWeight: '500' }}>
                  AI-powered environmental hazard predictions
                </Paragraph>
              </div>
              <Spin spinning={loading} tip="Making predictions with the last data from the device...." style={{ display: loading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div style={{ padding: '20px 0' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ textAlign: 'center', padding: '10px', border: '2px solid #1890ff', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
                        <Title level={5} style={{ margin: 0, color: '#1890ff', fontWeight: 'bold' }}>Rainfall</Title>
                        <Text style={{ fontWeight: 'bold' }}>Probability: {predictions.rainfall?.probability || 0}%</Text><br/>
                        <Text style={{ fontWeight: 'bold' }}>Intensity: {predictions.rainfall?.intensity || 'Low'}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center', padding: '10px', border: '2px solid #ff4d4f', borderRadius: '8px', backgroundColor: '#fff0f0' }}>
                        <Title level={5} style={{ margin: 0, color: '#ff4d4f', fontWeight: 'bold' }}>Flooding</Title>
                        <Text style={{ fontWeight: 'bold' }}>Probability: {predictions.flooding?.probability || 0}%</Text><br/>
                        <Text style={{ fontWeight: 'bold' }}>Severity: {predictions.flooding?.severity || 'Low'}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center', padding: '10px', border: '2px solid #ff7a45', borderRadius: '8px', backgroundColor: '#fff7f0' }}>
                        <Title level={5} style={{ margin: 0, color: '#ff7a45', fontWeight: 'bold' }}>Wildfire</Title>
                        <Text style={{ fontWeight: 'bold' }}>Probability: {predictions.wildfire?.probability || 0}%</Text><br/>
                        <Text style={{ fontWeight: 'bold' }}>Risk: {predictions.wildfire?.risk || 'Low'}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center', padding: '10px', border: '2px solid #52c41a', borderRadius: '8px', backgroundColor: '#f0fff0' }}>
                        <Title level={5} style={{ margin: 0, color: '#52c41a', fontWeight: 'bold' }}>AQI</Title>
                        <Text style={{ fontWeight: 'bold' }}>Level: {predictions.aqi?.level || 0}</Text><br/>
                        <Text style={{ fontWeight: 'bold' }}>Status: {predictions.aqi?.status || 'Good'}</Text>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ textAlign: 'center', padding: '10px', border: '2px solid #722ed1', borderRadius: '8px', backgroundColor: '#f9f0ff' }}>
                        <Title level={5} style={{ margin: 0, color: '#722ed1', fontWeight: 'bold' }}>Critical Alerts</Title>
                        <Text style={{ fontWeight: 'bold' }}>{predictions.alerts || 'No critical alerts at this time.'}</Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Spin>
              
              <div style={{ marginTop: '2px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <Button 
                  style={{ 
                    backgroundColor: deviceConnected ? '#52c41a' : '#ff4d4f', 
                    borderColor: deviceConnected ? '#52c41a' : '#ff4d4f', 
                    color: 'white',
                    fontWeight: 'bold',
                    height: '40px'
                  }}
                  disabled
                >
                  {deviceConnected ? 'Device Connected' : 'Device Disconnected'}
                </Button>
                <Button 
                  type="primary"
                  style={{ backgroundColor: '#1890ff', fontWeight: 'bold', height: '40px' }}
                  onClick={handleGetPredictions}
                  loading={loading}
                >
                  Make Predictions
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="project-ant">
                <Title level={5} style={{ fontWeight: 'bold' }}>AI Assistant</Title>
                <Paragraph className="lastweek" style={{ fontWeight: '500' }}>
                  Get personalized explanations of data and predictions
                </Paragraph>
              </div>
              <Spin spinning={explanationLoading} tip="Generating explanation..." style={{ display: explanationLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {!showExplanation ? (
                  <div style={{ padding: '40px 20px', paddingTop: '120px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', justifyContent: 'center' }}>
                    <Button 
                      type="primary" 
                      size="large" 
                      style={{ height: '60px', fontSize: '16px', fontWeight: 'bold' }}
                      onClick={() => handleExplanationRequest('data')}
                    >
                      Explain Data Trend
                    </Button>
                    <Button 
                      type="primary" 
                      size="large" 
                      style={{ height: '60px', fontSize: '16px', borderColor: '#52c41a', fontWeight: 'bold' }}
                      onClick={() => handleExplanationRequest('predictions')}
                    >
                      Explain Predictions
                    </Button>
                  </div>
                ) : (
                    <div style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      padding: '16px',
                      backgroundColor: '#f9f9f9',
                      border: '1px solid #e8e8e8',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      {explanationLoading ? (
                        <div style={{ textAlign: 'center', marginTop: '120px' }}>
                          
                        </div>
                      ) : (
                        <ReactMarkdown
                          children={explanationResult}
                          components={{
                            h1: ({ node, ...props }) => <Title level={1} {...props} />,
                            h2: ({ node, ...props }) => <Title level={2} {...props} />,
                            h3: ({ node, ...props }) => <Title level={3} {...props} />,
                            strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
                            p: ({ node, ...props }) => <p style={{ marginBottom: '12px', lineHeight: 1.6 }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ marginLeft: '20px' }} {...props} />
                          }}
                        />
                      )}
                      <Button
                        onClick={() => setShowExplanation(false)}
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: '#1890ff',
                          color: 'white',
                          fontWeight: 'bold',
                          marginTop: '12px'
                        }}
                      >
                        Back
                      </Button>
                    </div>
                )}
              </Spin>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5} style={{ fontWeight: 'bold' }}>Current Values (Live from MicroController)</Title>
                  <Paragraph className="lastweek" style={{ fontWeight: '500' }}>
                    Live data stream from microcontroller sensors
                  </Paragraph>
                </div>
              </div>
              
              {/* Main Graph */}
              <div style={{ width: '100%', height: 300, marginBottom: 20 }}>
                <ResponsiveContainer>
                  <RechartsLineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeWidth={1} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12, fontWeight: 'bold' }}
                      stroke="#333"
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="#8884d8" 
                      tick={{ fontSize: 12, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#82ca9d"
                      tick={{ fontSize: 12, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #ccc', 
                        borderRadius: '8px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="soilMoisture" 
                      stroke="#8B4513" 
                      name="Soil Moisture (%)" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#387908" 
                      name="Humidity (%)" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="rainfall" 
                      stroke="#0088FE" 
                      name="Rainfall" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ff7300" 
                      name="Temperature (°C)" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="sunlight" 
                      stroke="#0000FF" 
                      name="Sunlight Intensity (%)" 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              
              {/* GPS Display */}
              <div style={{ marginBottom: 20, marginLeft: 20, marginRight: 60}}>
                <Title level={5} style={{ fontWeight: 'bold' }}>GPS Location</Title>
                <div className="ant-list-box table-responsive">
                  <table className="width-100">
                    <thead>
                      <tr>
                        <th style={{ fontWeight: 'bold', fontSize: '14px' }}>LATITUDE</th>
                        <th style={{ fontWeight: 'bold', fontSize: '14px' }}>LONGITUDE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>{gpsData.latitude}° N</td>
                        <td style={{ fontWeight: 'bold' }}>{gpsData.longitude}° E</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Current Values Timeline */}
              <div className="timeline-box" style={{marginLeft: 20}}>
                <Title level={5} style={{ fontWeight: 'bold' }}>Current Values</Title>
                <Timeline className="timelinelist" reverse={reverse} style={{marginTop:20}}>
                  {[
                    { name: "Soil Moisture", value: `${currentValues.soilMoisture} %`, color: "brown" },
                    { name: "Humidity", value: `${currentValues.humidity} %`, color: "green" },
                    { name: "Temperature", value: `${currentValues.temperature} °C`, color: "orange" },
                    { name: "Sunlight Intensity", value: `${currentValues.sunlight} %`, color: "blue" },
                  ].map((item, index) => (
                    <Timeline.Item color={item.color} key={index}>
                      <Title level={5} style={{ fontWeight: 'bold' }}>{item.name}</Title>
                      <Text style={{ fontWeight: 'bold' }}>{item.value}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline><br/>
                <p><strong>N.B:  Rainfall is either 50 or 0 o n the graph, 50 to denote rainfall at the moment and 0 to denote no raifall </strong></p>
              </div>
            </Card>
          </Col>

          {/* Side Graphs Column */}
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="project-ant">
                <div>
                  <Title level={5} style={{ fontWeight: 'bold' }}>Additional Measurements</Title>
                  <Paragraph className="lastweek" style={{ fontWeight: '500' }}>
                    Secondary sensor readings
                  </Paragraph>
                </div>
              </div>
              
              {/* Pressure/Heat Index Graph */}
              <div style={{ width: '100%', height: 180, marginBottom: 20 }}>
                <ResponsiveContainer>
                  <RechartsLineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeWidth={1} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      stroke="#333"
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="#ffc658"
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#00C49F"
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #ccc', 
                        borderRadius: '8px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="enthalpy" 
                      stroke="#0000FF" 
                      name="Enthalpy (KJ/KG)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="heatIndex" 
                      stroke="#cc0000" 
                      name="Heat Index (C)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="pressure" 
                      stroke="#003366" 
                      name="Atmospheric Pressure (psi)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              
              {/* CO2/Battery Graph */}
              <div style={{ width: '100%', height: 180, marginBottom: 20 }}>
                <ResponsiveContainer>
                  <RechartsLineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeWidth={1} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      stroke="#333"
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="#0088FE"
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#00C49F"
                      tick={{ fontSize: 10, fontWeight: 'bold' }}
                      strokeWidth={2}
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #ccc', 
                        borderRadius: '8px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="pollutionLevel" 
                      stroke="#8B4513" 
                      name="Pollution Level (%)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="co2" 
                      stroke="#003366" 
                      name="CO2 Level (%)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="batteryVoltage" 
                      stroke="#00AA00" 
                      name="Battery (V)" 
                      strokeWidth={3}
                      dot={{ r: 3, strokeWidth: 2 }}
                      activeDot={{ r: 5, strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Additional Values Timeline */}
              <div className="timeline-box" style={{marginLeft: 20}}>
                <Title level={5} style={{ fontWeight: 'bold', paddingBottom: 20 }}>Additional Values</Title>
                <Timeline className="timelinelist" reverse={reverse}>
                  {[
                    { name: "Enthalpy", value: `${currentValues.enthalpy} KJ/KG`, color: "blue" },
                    { name: "Heat Index", value: `${currentValues.heatIndex} C`, color: "red" },
                    { name: "Atmospheric Pressure", value: `${currentValues.pressure} psi`, color: "blue" },
                    { name: "Pollution Level", value: `${currentValues.pollutionLevel} %`, color: "brown"},
                    { name: "CO2 Level", value: `${currentValues.co2} %`, color: "blue" },
                    { name: "Battery", value: `${currentValues.batteryVoltage} V`, color: "green"},
                  ].map((item, index) => (
                    <Timeline.Item color={item.color} key={index}>
                      <Title level={5} style={{ fontWeight: 'bold' }}>{item.name}</Title>
                      <Text style={{ fontWeight: 'bold' }}>{item.value}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                
                <Spin spinning={exportLoading} tip="Exporting data to CSV..." style={{ display: exportLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Button
                    type="primary"
                    className="width-100"
                    onClick={handleExportToCSV}
                    style={{ fontWeight: 'bold', marginTop: '10px' }}
                  >
                    <MenuUnfoldOutlined /> EXPORT to CSV
                  </Button>
                </Spin>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Profession Selection Modal */}
      <Modal
        title={<span style={{ fontWeight: 'bold' }}>What's your profession or use case?</span>}
        open={showProfessionModal}
        onOk={handleProfessionSelect}
        onCancel={() => setShowProfessionModal(false)}
        okText="Next"
      >
        <Radio.Group 
          value={selectedProfession} 
          onChange={(e) => {
            setSelectedProfession(e.target.value);
            setCustomProfession('');
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <Radio value="student" style={{ fontWeight: 'bold' }}>Student</Radio>
          <Radio value="farmer" style={{ fontWeight: 'bold' }}>Farmer</Radio>
          <Radio value="teacher" style={{ fontWeight: 'bold' }}>Teacher</Radio>
          <Radio value="researcher" style={{ fontWeight: 'bold' }}>Researcher</Radio>
          <Radio value="other" style={{ fontWeight: 'bold' }}>Other</Radio>
        </Radio.Group>
        
        {selectedProfession === 'other' && (
          <Input
            placeholder="Please specify your profession/use case"
            value={customProfession}
            onChange={(e) => setCustomProfession(e.target.value)}
            style={{ marginTop: '10px', fontWeight: 'bold' }}
          />
        )}
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        title={<span style={{ fontWeight: 'bold' }}>What language do you want the explanation in?</span>}
        open={showLanguageModal}
        onOk={handleLanguageSelect}
        onCancel={() => setShowLanguageModal(false)}
        okText="Get Explanation"
      >
        <Radio.Group 
          value={selectedLanguage} 
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setCustomLanguage('');
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <Radio value="english" style={{ fontWeight: 'bold' }}>English</Radio>
          <Radio value="french" style={{ fontWeight: 'bold' }}>French</Radio>
          <Radio value="other" style={{ fontWeight: 'bold' }}>Other</Radio>
        </Radio.Group>
        
        {selectedLanguage === 'other' && (
          <Input
            placeholder="Please specify the language"
            value={customLanguage}
            onChange={(e) => setCustomLanguage(e.target.value)}
            style={{ marginTop: '10px', fontWeight: 'bold' }}
          />
        )}
      </Modal>
    </>
  );
}

export default Home;