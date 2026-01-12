import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Select, Input, Progress, Tabs, Badge, Tooltip } from 'antd';
import { 
  ScanOutlined, 
  BugOutlined, 
  GlobalOutlined,
  SecurityScanOutlined,
  PlayCircleOutlined,
  StopOutlined,
  LaptopOutlined,
  MobileOutlined,
  DesktopOutlined,
  CloudServerOutlined,
  WifiOutlined,
  ApiOutlined
} from '@ant-design/icons';
import axios from 'axios';
import mockApi from '../services/mockApi';

const { Option } = Select;
const { TabPane } = Tabs;

const AdvancedScanning = () => {
  const [scanResults, setScanResults] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState('localhost');
  const [scanType, setScanType] = useState('comprehensive');
  const [recentScans, setRecentScans] = useState([]);
  const [networkDevices, setNetworkDevices] = useState([]);
  const [devicesLoading, setDevicesLoading] = useState(false);
  const [deviceStats, setDeviceStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    new_today: 0
  });

  // Load network devices on component mount
  useEffect(() => {
    loadNetworkDevices();
  }, []);

  const loadNetworkDevices = async () => {
    setDevicesLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/api/network/devices', {
        headers: { 'Authorization': 'Bearer demo-token' }
      });
      
      setNetworkDevices(response.data.devices || []);
      setDeviceStats(response.data.stats || {
        total: 0,
        online: 0,
        offline: 0,
        new_today: 0
      });
    } catch (error) {
      console.log('Using mock data for cloud deployment');
      // Fallback to mock data for demo
      const mockDevices = [
        {
          id: 1,
          ip_address: '192.168.1.1',
          hostname: 'router.local',
          device_type: 'Router/Gateway',
          vendor: 'Netgear Inc.',
          is_online: true,
          risk_score: 2,
          open_ports: ['80', '443', '22', '53'],
          last_seen: new Date().toISOString()
        },
        {
          id: 2,
          ip_address: '192.168.1.100',
          hostname: 'workstation-01',
          device_type: 'Windows Computer',
          vendor: 'Dell Inc.',
          is_online: true,
          risk_score: 3,
          open_ports: ['135', '139', '445', '3389'],
          last_seen: new Date().toISOString()
        },
        {
          id: 3,
          ip_address: '192.168.1.150',
          hostname: 'iPhone-Alex',
          device_type: 'Mobile Device',
          vendor: 'Apple Inc.',
          is_online: true,
          risk_score: 1,
          open_ports: ['62078'],
          last_seen: new Date().toISOString()
        },
        {
          id: 4,
          ip_address: '192.168.1.200',
          hostname: 'server-01',
          device_type: 'Linux Server',
          vendor: 'HP Enterprise',
          is_online: true,
          risk_score: 4,
          open_ports: ['22', '80', '443', '3306', '5432'],
          last_seen: new Date().toISOString()
        },
        {
          id: 5,
          ip_address: '192.168.1.75',
          hostname: 'smart-tv',
          device_type: 'IoT Device',
          vendor: 'Samsung Electronics',
          is_online: false,
          risk_score: 6,
          open_ports: ['8080', '8443'],
          last_seen: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      setNetworkDevices(mockDevices);
      setDeviceStats({ total: 5, online: 4, offline: 1, new_today: 1 });
    } finally {
      setDevicesLoading(false);
    }
  };

  const getDeviceIcon = (deviceType) => {
    const type = deviceType?.toLowerCase() || '';
    if (type.includes('router') || type.includes('gateway')) return <ApiOutlined />;
    if (type.includes('server')) return <CloudServerOutlined />;
    if (type.includes('mobile') || type.includes('phone')) return <MobileOutlined />;
    if (type.includes('laptop') || type.includes('mac')) return <LaptopOutlined />;
    if (type.includes('iot') || type.includes('smart')) return <WifiOutlined />;
    return <DesktopOutlined />;
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 7) return 'red';
    if (riskScore >= 4) return 'orange';
    if (riskScore >= 2) return 'yellow';
    return 'green';
  };

  const getRiskLevel = (riskScore) => {
    if (riskScore >= 7) return 'HIGH';
    if (riskScore >= 4) return 'MEDIUM';
    if (riskScore >= 2) return 'LOW';
    return 'MINIMAL';
  };

  const scanTypes = [
    { value: 'comprehensive', label: 'Comprehensive Scan', description: 'Full port scan + vulnerability assessment' },
    { value: 'stealth', label: 'Stealth Scan', description: 'SYN scan to avoid detection' },
    { value: 'fast', label: 'Fast Scan', description: 'Quick scan of common ports' },
    { value: 'vulnerability', label: 'Vulnerability Scan', description: 'Web vulnerability assessment' },
    { value: 'network_discovery', label: 'Network Discovery', description: 'Find devices on your local network' }
  ];

  const predefinedTargets = [
    { value: 'localhost', label: 'Localhost (Safe)', description: 'Scan local system' },
    { value: 'test-targets', label: 'Test Environment', description: 'Controlled vulnerable environment' },
    { value: '192.168.1.0/24', label: 'Local Network', description: 'Scan local network range' }
  ];

  const startAdvancedScan = async () => {
    setScanning(true);
    setScanProgress(0);
    
    // Check if this is a network discovery scan
    if (scanType === 'network_discovery') {
      try {
        // Try to fetch real network devices from API
        const response = await axios.get('http://localhost:8001/api/network/devices', {
          headers: { 'Authorization': 'Bearer demo-token' }
        });
        
        // Convert network devices to scan results format
        const deviceResults = response.data.devices.map((device, index) => ({
          key: index.toString(),
          finding: `Device Found: ${device.hostname || device.ip_address}`,
          severity: device.is_online ? 'INFO' : 'LOW',
          tool: 'Network Discovery',
          description: `${device.device_type || 'Unknown'} device at ${device.ip_address}${device.mac_address ? ` (MAC: ${device.mac_address})` : ''}`
        }));
        
        setScanProgress(100);
        setScanResults(deviceResults);
        
        // Add to recent scans
        const newScan = {
          id: Date.now(),
          target: selectedTarget,
          type: scanType,
          timestamp: new Date().toISOString(),
          findings: deviceResults.length,
          status: 'completed'
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
        
        setTimeout(() => {
          setScanning(false);
          setScanProgress(0);
        }, 1000);
        
        return;
      } catch (error) {
        console.log('Using mock network discovery for cloud deployment');
        // Use mock data for network discovery
        const mockDeviceResults = [
          {
            key: '1',
            finding: 'Device Found: router.local',
            severity: 'INFO',
            tool: 'Network Discovery',
            description: 'Router/Gateway device at 192.168.1.1 (MAC: 00:1B:44:11:3A:B7)'
          },
          {
            key: '2',
            finding: 'Device Found: workstation-01',
            severity: 'INFO',
            tool: 'Network Discovery',
            description: 'Windows Computer device at 192.168.1.100 (MAC: 00:50:56:C0:00:08)'
          },
          {
            key: '3',
            finding: 'Device Found: iPhone-Alex',
            severity: 'INFO',
            tool: 'Network Discovery',
            description: 'Mobile Device at 192.168.1.150 (MAC: 8C:85:90:12:34:56)'
          },
          {
            key: '4',
            finding: 'Device Found: server-01',
            severity: 'LOW',
            tool: 'Network Discovery',
            description: 'Linux Server device at 192.168.1.200 (MAC: 00:15:5D:FF:FF:FF)'
          },
          {
            key: '5',
            finding: 'Device Found: smart-tv',
            severity: 'MEDIUM',
            tool: 'Network Discovery',
            description: 'IoT Device at 192.168.1.75 (MAC: 00:26:37:12:34:56) - OFFLINE'
          }
        ];
        
        setScanProgress(100);
        setScanResults(mockDeviceResults);
        
        const newScan = {
          id: Date.now(),
          target: selectedTarget,
          type: scanType,
          timestamp: new Date().toISOString(),
          findings: mockDeviceResults.length,
          status: 'completed'
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
        
        setTimeout(() => {
          setScanning(false);
          setScanProgress(0);
        }, 1000);
        
        return;
      }
    }
    
    // Demo version - uses mock data only for public safety
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate realistic scan time
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      
      // Generate realistic mock results
      const mockResults = generateMockScanResults(scanType);
      setScanResults(mockResults);
      
      // Add to recent scans
      const newScan = {
        id: Date.now(),
        target: selectedTarget,
        type: scanType,
        timestamp: new Date().toISOString(),
        findings: mockResults.length,
        status: 'completed'
      };
      setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setScanning(false);
        setScanProgress(0);
      }, 1000);
    }, 3000);
  };

  const handleSimulation = async (attackType) => {
    setScanning(true);
    try {
      const result = await mockApi.simulateAttack(attackType);
      
      // Show success message
      alert(`Simulation Complete!\n\n${result.message}\n\nAttacks: ${result.attacks_launched.join(', ')}\nIncidents Created: ${result.incidents_created}\nDuration: ${result.duration}\n\nCheck Live Threats and Threat Intelligence for results!`);
      
      // Add simulation results to recent scans
      const newScan = {
        id: Date.now(),
        target: 'Simulation Environment',
        type: `${attackType}_simulation`,
        timestamp: new Date().toISOString(),
        findings: result.incidents_created,
        status: 'completed'
      };
      setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
      
    } catch (error) {
      alert('Simulation failed: ' + error.message);
    } finally {
      setScanning(false);
    }
  };

  const generateMockScanResults = (type) => {
    const baseResults = [
      {
        key: '1',
        finding: 'Open Port: 80/tcp (HTTP)',
        severity: 'INFO',
        tool: 'Nmap',
        description: 'HTTP service detected on port 80'
      },
      {
        key: '2', 
        finding: 'Open Port: 443/tcp (HTTPS)',
        severity: 'INFO',
        tool: 'Nmap',
        description: 'HTTPS service detected on port 443'
      }
    ];

    if (type === 'comprehensive') {
      return [
        ...baseResults,
        {
          key: '3',
          finding: 'SSH Service: OpenSSH 8.2',
          severity: 'LOW',
          tool: 'Nmap',
          description: 'SSH service version detected'
        },
        {
          key: '4',
          finding: 'Web Server: Apache/2.4.41',
          severity: 'INFO',
          tool: 'Nmap',
          description: 'Apache web server detected'
        },
        {
          key: '5',
          finding: 'OS Detection: Linux 5.4',
          severity: 'INFO',
          tool: 'Nmap',
          description: 'Operating system fingerprint detected'
        }
      ];
    } else if (type === 'vulnerability') {
      return [
        ...baseResults,
        {
          key: '3',
          finding: 'Directory Listing Enabled',
          severity: 'MEDIUM',
          tool: 'Nikto',
          description: 'Server allows directory browsing'
        },
        {
          key: '4',
          finding: 'Missing Security Headers',
          severity: 'LOW',
          tool: 'Nikto',
          description: 'X-Frame-Options header not set'
        },
        {
          key: '5',
          finding: 'Admin Panel Found: /admin',
          severity: 'HIGH',
          tool: 'Dirb',
          description: 'Administrative interface discovered'
        }
      ];
    }

    return baseResults;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'INFO': 'blue',
      'LOW': 'green', 
      'MEDIUM': 'orange',
      'HIGH': 'red',
      'CRITICAL': 'purple'
    };
    return colors[severity] || 'default';
  };

  const scanResultColumns = [
    {
      title: 'Finding',
      dataIndex: 'finding',
      key: 'finding',
      width: '30%'
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Tag color={getSeverityColor(severity)}>{severity}</Tag>
      ),
      width: '15%'
    },
    {
      title: 'Tool',
      dataIndex: 'tool',
      key: 'tool',
      width: '15%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '40%'
    }
  ];

  const recentScansColumns = [
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Findings',
      dataIndex: 'findings',
      key: 'findings'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'blue'}>{status}</Tag>
      )
    }
  ];

  const deviceColumns = [
    {
      title: 'Device',
      key: 'device',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {getDeviceIcon(record.device_type)}
          <div>
            <div style={{ fontWeight: 'bold' }}>
              {record.hostname || record.ip_address}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.ip_address}
            </div>
          </div>
        </div>
      ),
      width: '25%'
    },
    {
      title: 'Type',
      dataIndex: 'device_type',
      key: 'device_type',
      render: (type) => (
        <Tag color="blue">{type || 'Unknown'}</Tag>
      ),
      width: '15%'
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (vendor) => vendor || 'Unknown',
      width: '15%'
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge 
            status={record.is_online ? 'success' : 'error'} 
            text={record.is_online ? 'Online' : 'Offline'} 
          />
        </div>
      ),
      width: '12%'
    },
    {
      title: 'Open Ports',
      dataIndex: 'open_ports',
      key: 'open_ports',
      render: (ports) => (
        <div>
          {(ports || []).slice(0, 3).map(port => (
            <Tag key={port} size="small" color="geekblue">{port}</Tag>
          ))}
          {(ports || []).length > 3 && (
            <Tooltip title={`All ports: ${(ports || []).join(', ')}`}>
              <Tag size="small">+{(ports || []).length - 3}</Tag>
            </Tooltip>
          )}
        </div>
      ),
      width: '18%'
    },
    {
      title: 'Risk Level',
      key: 'risk',
      render: (_, record) => (
        <Tag color={getRiskColor(record.risk_score || 0)}>
          {getRiskLevel(record.risk_score || 0)}
        </Tag>
      ),
      width: '10%'
    },
    {
      title: 'Last Seen',
      dataIndex: 'last_seen',
      key: 'last_seen',
      render: (lastSeen) => {
        if (!lastSeen) return 'Never';
        const date = new Date(lastSeen);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
        return `${Math.floor(diffMinutes / 1440)}d ago`;
      },
      width: '15%'
    }
  ];

  return (
    <div className="cyberhawk-content">
      <div className="page-header">
        <h1>Security & Discovery</h1>
        <p>Comprehensive security tools and network asset discovery. Scan systems, discover devices, and assess security posture.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <ScanOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{recentScans.length}</div>
            <div className="stat-label">Total Scans</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon critical">
            <BugOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{scanResults.filter(r => r.severity === 'HIGH' || r.severity === 'CRITICAL').length}</div>
            <div className="stat-label">High Risk</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon success">
            <GlobalOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{deviceStats.online}</div>
            <div className="stat-label">Online Devices</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <DesktopOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{deviceStats.total}</div>
            <div className="stat-label">Total Devices</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon warning">
            <SecurityScanOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{networkDevices.filter(d => (d.risk_score || 0) >= 4).length}</div>
            <div className="stat-label">Risk Devices</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon info">
            <WifiOutlined />
          </div>
          <div className="stat-content">
            <div className="stat-number">{deviceStats.new_today}</div>
            <div className="stat-label">New Today</div>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card scan-config">
          <h3>Scan Configuration</h3>
          <div className="form-group">
            <label>Target:</label>
            <Select
              value={selectedTarget}
              onChange={setSelectedTarget}
              style={{ width: '100%', marginTop: 8 }}
            >
              {predefinedTargets.map(target => (
                <Option key={target.value} value={target.value}>
                  {target.label}
                </Option>
              ))}
            </Select>
            <Input
              placeholder="Or enter custom target"
              style={{ marginTop: 8 }}
              onChange={(e) => setSelectedTarget(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Scan Type:</label>
            <Select
              value={scanType}
              onChange={setScanType}
              style={{ width: '100%', marginTop: 8 }}
            >
              {scanTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            icon={scanning ? <StopOutlined /> : <PlayCircleOutlined />}
            onClick={startAdvancedScan}
            loading={scanning}
            block
            size="large"
            className="scan-button"
          >
            {scanning ? 'Scanning...' : 'Start Advanced Scan'}
          </Button>

          {scanning && (
            <div className="scan-progress">
              <Progress percent={scanProgress} status="active" />
              <p>Running {scanType} scan on {selectedTarget}</p>
            </div>
          )}
        </div>
      </div>

      <div className="content-card">
        <Tabs defaultActiveKey="devices" className="cyberhawk-tabs">
        <TabPane tab={
          <span>
            Network Devices 
            <Badge count={deviceStats.total} style={{ marginLeft: 8 }} />
          </span>
        } key="devices">
          <div className="devices-section">
            <div className="section-header">
              <h4>Network Asset Discovery</h4>
              <Button 
                icon={<ScanOutlined />} 
                onClick={loadNetworkDevices}
                loading={devicesLoading}
              >
                Discover Assets
              </Button>
            </div>
            
            <div className="device-stats">
              <div className="device-stat">
                <div className="stat-value" style={{ color: '#52c41a' }}>
                  {deviceStats.online}
                </div>
                <div className="stat-label">Online</div>
              </div>
              <div className="device-stat">
                <div className="stat-value" style={{ color: '#f5222d' }}>
                  {deviceStats.offline}
                </div>
                <div className="stat-label">Offline</div>
              </div>
              <div className="device-stat">
                <div className="stat-value" style={{ color: '#fa8c16' }}>
                  {networkDevices.filter(d => (d.risk_score || 0) >= 4).length}
                </div>
                <div className="stat-label">High Risk</div>
              </div>
              <div className="device-stat">
                <div className="stat-value" style={{ color: '#1890ff' }}>
                  {deviceStats.new_today}
                </div>
                <div className="stat-label">New Today</div>
              </div>
            </div>
            <Table
              columns={deviceColumns}
              dataSource={networkDevices}
              loading={devicesLoading}
              pagination={{ pageSize: 10 }}
              size="small"
              rowKey="id"
              className="cyberhawk-table"
            />
          </div>
        </TabPane>

        <TabPane tab="Security Scans" key="results">
          <div className="scan-results-section">
            <h4>Latest Scan Results</h4>
            {scanResults.length > 0 ? (
              <Table
                columns={scanResultColumns}
                dataSource={scanResults}
                pagination={false}
                size="small"
                className="cyberhawk-table"
              />
            ) : (
              <div className="empty-state">
                <ScanOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                <p>No scan results yet. Start a scan to see findings here.</p>
              </div>
            )}
          </div>
        </TabPane>

        <TabPane tab="Attack Simulation" key="simulation">
          <div className="simulation-section">
            <h4>Security Testing & Attack Simulation</h4>
            <div className="simulation-controls">
              <div className="simulation-card">
                <h5>Comprehensive Attack Demo</h5>
                <p>Simulate realistic cyber attacks including port scanning, brute force, and vulnerability exploitation</p>
                <Button 
                  type="primary" 
                  danger
                  onClick={() => handleSimulation('comprehensive')}
                  loading={scanning}
                >
                  Run Full Attack Simulation
                </Button>
              </div>
              <div className="simulation-card">
                <h5>Port Scan Simulation</h5>
                <p>Generate port scanning activity to test detection capabilities</p>
                <Button 
                  onClick={() => handleSimulation('port_scan')}
                  loading={scanning}
                >
                  Simulate Port Scan
                </Button>
              </div>
              <div className="simulation-card">
                <h5>Brute Force Simulation</h5>
                <p>Test brute force attack detection and response systems</p>
                <Button 
                  onClick={() => handleSimulation('brute_force')}
                  loading={scanning}
                >
                  Simulate Brute Force
                </Button>
              </div>
            </div>
            <div className="simulation-info">
              <h6>Simulation Results:</h6>
              <p>After running a simulation, check the following sections for generated alerts:</p>
              <ul>
                <li><strong>Live Threats</strong> - Real-time alerts will appear</li>
                <li><strong>Threat Intelligence</strong> - Incidents will be logged</li>
                <li><strong>Network Monitor</strong> - Traffic patterns will be visible</li>
              </ul>
              <p><em>Note: All simulations are safe and only generate mock data for demonstration purposes.</em></p>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Scan History" key="history">
          <div className="scan-history-section">
            <h4>Scan History</h4>
            <Table
              columns={recentScansColumns}
              dataSource={recentScans}
              pagination={false}
              size="small"
              className="cyberhawk-table"
            />
          </div>
        </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedScanning;