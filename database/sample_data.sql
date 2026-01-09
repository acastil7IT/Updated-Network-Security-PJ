-- Sample data for SecureNet Monitor

-- Insert sample network traffic
INSERT INTO network_traffic (timestamp, source_ip, dest_ip, source_port, dest_port, protocol, packet_size, flags, payload_hash) VALUES
(NOW() - INTERVAL '1 hour', '192.168.1.100', '8.8.8.8', 53421, 80, 'TCP', 1024, 'SYN', 'a1b2c3d4'),
(NOW() - INTERVAL '1 hour', '192.168.1.101', '10.0.0.1', 45123, 443, 'TCP', 512, 'ACK', 'e5f6g7h8'),
(NOW() - INTERVAL '50 minutes', '192.168.1.102', '172.16.0.1', 33445, 22, 'TCP', 256, 'SYN', 'i9j0k1l2'),
(NOW() - INTERVAL '45 minutes', '10.0.0.50', '192.168.1.100', 80, 54321, 'TCP', 2048, 'PSH', 'm3n4o5p6'),
(NOW() - INTERVAL '40 minutes', '192.168.1.103', '8.8.4.4', 12345, 53, 'UDP', 128, NULL, 'q7r8s9t0'),
(NOW() - INTERVAL '35 minutes', '172.16.0.10', '192.168.1.101', 443, 65432, 'TCP', 1536, 'FIN', 'u1v2w3x4'),
(NOW() - INTERVAL '30 minutes', '192.168.1.104', '203.0.113.1', 23456, 8080, 'TCP', 768, 'RST', 'y5z6a7b8'),
(NOW() - INTERVAL '25 minutes', '10.0.0.25', '192.168.1.102', 3389, 54123, 'TCP', 1280, 'SYN', 'c9d0e1f2'),
(NOW() - INTERVAL '20 minutes', '192.168.1.105', '1.1.1.1', 34567, 80, 'TCP', 896, 'ACK', 'g3h4i5j6'),
(NOW() - INTERVAL '15 minutes', '172.16.0.20', '192.168.1.103', 22, 45678, 'TCP', 640, 'PSH', 'k7l8m9n0'),
(NOW() - INTERVAL '10 minutes', '192.168.1.106', '8.8.8.8', 45678, 53, 'UDP', 192, NULL, 'o1p2q3r4'),
(NOW() - INTERVAL '5 minutes', '10.0.0.75', '192.168.1.104', 135, 56789, 'TCP', 384, 'SYN', 's5t6u7v8'),
(NOW() - INTERVAL '2 minutes', '192.168.1.107', '203.0.113.5', 56789, 443, 'TCP', 1152, 'ACK', 'w9x0y1z2'),
(NOW() - INTERVAL '1 minute', '172.16.0.30', '192.168.1.105', 445, 67890, 'TCP', 2560, 'PSH', 'a3b4c5d6');

-- Insert sample security incidents
INSERT INTO security_incidents (created_at, severity, incident_type, source_ip, description, status, assigned_to) VALUES
(NOW() - INTERVAL '2 hours', 'HIGH', 'PORT_SCAN', '10.0.0.50', 'Multiple port scan attempts detected from external IP', 'OPEN', NULL),
(NOW() - INTERVAL '1.5 hours', 'MEDIUM', 'SUSPICIOUS_PORT_ACCESS', '172.16.0.10', 'Access to administrative port 22 from unusual source', 'ACKNOWLEDGED', 'security_team'),
(NOW() - INTERVAL '1 hour', 'CRITICAL', 'NETWORK_ANOMALY', '192.168.1.107', 'Anomalous network behavior detected with high confidence', 'OPEN', NULL),
(NOW() - INTERVAL '45 minutes', 'LOW', 'UNUSUAL_TRAFFIC', '10.0.0.25', 'Unusual traffic pattern detected during off-hours', 'RESOLVED', 'admin'),
(NOW() - INTERVAL '30 minutes', 'HIGH', 'BRUTE_FORCE_ATTEMPT', '172.16.0.20', 'Multiple failed authentication attempts detected', 'ACKNOWLEDGED', 'security_analyst'),
(NOW() - INTERVAL '15 minutes', 'MEDIUM', 'SUSPICIOUS_PORT_ACCESS', '10.0.0.75', 'Access to Windows RPC port 135 detected', 'OPEN', NULL);

-- Insert corresponding alerts
INSERT INTO alerts (incident_id, alert_type, message, created_at, acknowledged) VALUES
(1, 'PORT_SCAN', 'Port scanning activity detected from 10.0.0.50', NOW() - INTERVAL '2 hours', false),
(2, 'SUSPICIOUS_PORT_ACCESS', 'SSH access attempt from 172.16.0.10', NOW() - INTERVAL '1.5 hours', true),
(3, 'NETWORK_ANOMALY', 'High confidence anomaly detected from 192.168.1.107', NOW() - INTERVAL '1 hour', false),
(4, 'UNUSUAL_TRAFFIC', 'Off-hours traffic from 10.0.0.25', NOW() - INTERVAL '45 minutes', true),
(5, 'BRUTE_FORCE_ATTEMPT', 'Multiple auth failures from 172.16.0.20', NOW() - INTERVAL '30 minutes', true),
(6, 'SUSPICIOUS_PORT_ACCESS', 'RPC port access from 10.0.0.75', NOW() - INTERVAL '15 minutes', false);

-- Insert sample network devices
INSERT INTO network_devices (ip_address, mac_address, hostname, device_type, vendor, os_fingerprint, open_ports, services, is_online, risk_score, last_seen, first_discovered, device_info) VALUES
('192.168.1.1', '00:1A:2B:3C:4D:5E', 'router.local', 'Router/Gateway', 'Netgear', 'Linux 3.4', ARRAY['80', '443', '22'], '{"80": {"service": "http", "version": "nginx 1.18"}, "443": {"service": "https", "version": "nginx 1.18"}, "22": {"service": "ssh", "version": "OpenSSH 7.4"}}', TRUE, 2, NOW() - INTERVAL '2 minutes', NOW() - INTERVAL '7 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:30:00Z"}'),
('192.168.1.100', '00:1B:44:11:3A:B7', 'workstation-01', 'Windows Computer', 'Dell Inc.', 'Windows 10', ARRAY['135', '139', '445'], '{"135": {"service": "msrpc", "version": "Microsoft Windows RPC"}, "139": {"service": "netbios-ssn", "version": ""}, "445": {"service": "microsoft-ds", "version": "Windows 10"}}', TRUE, 3, NOW() - INTERVAL '5 minutes', NOW() - INTERVAL '5 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:25:00Z"}'),
('192.168.1.101', '00:1B:44:11:3A:B8', 'macbook-pro', 'Mac Computer', 'Apple Inc.', 'Mac OS X 10.15', ARRAY['22', '88', '548'], '{"22": {"service": "ssh", "version": "OpenSSH 8.1"}, "88": {"service": "kerberos-sec", "version": ""}, "548": {"service": "afp", "version": "netatalk 3.1.12"}}', TRUE, 1, NOW() - INTERVAL '3 minutes', NOW() - INTERVAL '3 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:28:00Z"}'),
('192.168.1.102', '00:E0:4C:68:01:A0', 'ubuntu-server', 'Linux Server', 'VMware', 'Ubuntu Linux', ARRAY['22', '80', '443', '3306'], '{"22": {"service": "ssh", "version": "OpenSSH 8.2"}, "80": {"service": "http", "version": "Apache 2.4.41"}, "443": {"service": "https", "version": "Apache 2.4.41"}, "3306": {"service": "mysql", "version": "MySQL 8.0.25"}}', TRUE, 4, NOW() - INTERVAL '1 minute', NOW() - INTERVAL '10 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:32:00Z"}'),
('192.168.1.103', '00:1B:44:11:3A:BA', 'workstation-03', 'Windows Computer', 'HP Inc.', 'Windows 11', ARRAY['135', '139', '445', '3389'], '{"135": {"service": "msrpc", "version": "Microsoft Windows RPC"}, "139": {"service": "netbios-ssn", "version": ""}, "445": {"service": "microsoft-ds", "version": "Windows 11"}, "3389": {"service": "ms-wbt-server", "version": "Microsoft Terminal Services"}}', TRUE, 2, NOW() - INTERVAL '10 minutes', NOW() - INTERVAL '2 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:15:00Z"}'),
('192.168.1.25', '28:6E:D4:8B:C7:9F', 'iphone-12', 'Mobile Device', 'Apple Inc.', 'iOS 15.0', ARRAY[]::text[], '{}', TRUE, 0, NOW() - INTERVAL '8 minutes', NOW() - INTERVAL '1 day', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:20:00Z"}'),
('192.168.1.30', 'B8:27:EB:A1:B2:C3', 'raspberry-pi', 'IoT Device', 'Raspberry Pi Foundation', 'Linux ARM', ARRAY['22', '80'], '{"22": {"service": "ssh", "version": "OpenSSH 7.9"}, "80": {"service": "http", "version": "lighttpd 1.4.53"}}', TRUE, 2, NOW() - INTERVAL '4 minutes', NOW() - INTERVAL '6 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:35:00Z"}'),
('192.168.1.35', '00:17:88:5B:8A:1F', 'smart-tv', 'IoT Device', 'Samsung Electronics', 'Tizen OS', ARRAY['8080', '8443'], '{"8080": {"service": "http-proxy", "version": ""}, "8443": {"service": "https-alt", "version": ""}}', TRUE, 1, NOW() - INTERVAL '12 minutes', NOW() - INTERVAL '4 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:22:00Z"}'),
('192.168.1.40', '00:24:D7:3B:2E:8C', 'nas-storage', 'Network Storage', 'Synology Inc.', 'Linux 4.4', ARRAY['22', '80', '443', '5000', '5001'], '{"22": {"service": "ssh", "version": "OpenSSH 7.4"}, "80": {"service": "http", "version": "nginx"}, "443": {"service": "https", "version": "nginx"}, "5000": {"service": "upnp", "version": ""}, "5001": {"service": "commplex-link", "version": ""}}', TRUE, 3, NOW() - INTERVAL '6 minutes', NOW() - INTERVAL '8 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:38:00Z"}'),
('192.168.1.45', '00:0C:29:4F:A2:B1', 'windows-server', 'Windows Server', 'VMware', 'Windows Server 2019', ARRAY['53', '80', '135', '139', '389', '443', '445', '3389'], '{"53": {"service": "domain", "version": "Microsoft DNS"}, "80": {"service": "http", "version": "Microsoft IIS 10.0"}, "135": {"service": "msrpc", "version": "Microsoft Windows RPC"}, "139": {"service": "netbios-ssn", "version": ""}, "389": {"service": "ldap", "version": "Microsoft Windows Active Directory LDAP"}, "443": {"service": "https", "version": "Microsoft IIS 10.0"}, "445": {"service": "microsoft-ds", "version": "Windows Server 2019"}, "3389": {"service": "ms-wbt-server", "version": "Microsoft Terminal Services"}}', TRUE, 5, NOW() - INTERVAL '7 minutes', NOW() - INTERVAL '15 days', '{"scan_method": "nmap", "last_scan": "2024-01-09T10:40:00Z"}'),
('192.168.1.50', 'DC:A6:32:1F:8E:4B', 'android-phone', 'Mobile Device', 'Samsung Electronics', 'Android 12', ARRAY[]::text[], '{}', FALSE, 0, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 day', '{"scan_method": "nmap", "last_scan": "2024-01-09T09:15:00Z"}'),
('10.0.0.50', '00:1B:44:11:3A:C1', 'unknown-device', 'Unknown Device', 'Unknown', 'Unknown', ARRAY['80', '443'], '{"80": {"service": "http", "version": "unknown"}, "443": {"service": "https", "version": "unknown"}}', FALSE, 8, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', '{"scan_method": "nmap", "last_scan": "2024-01-09T08:30:00Z"}'),
('172.16.0.10', '00:1B:44:11:3A:C2', 'external-host', 'Unknown Device', 'Unknown', 'Linux', ARRAY['22', '80'], '{"22": {"service": "ssh", "version": "OpenSSH 7.6"}, "80": {"service": "http", "version": "Apache 2.4"}}', FALSE, 6, NOW() - INTERVAL '1.5 hours', NOW() - INTERVAL '1.5 hours', '{"scan_method": "nmap", "last_scan": "2024-01-09T08:45:00Z"}'),
('10.0.0.25', '00:1B:44:11:3A:C3', 'suspicious-host', 'Unknown Device', 'Unknown', 'Unknown', ARRAY['23', '80', '8080'], '{"23": {"service": "telnet", "version": ""}, "80": {"service": "http", "version": "unknown"}, "8080": {"service": "http-proxy", "version": "unknown"}}', FALSE, 7, NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '45 minutes', '{"scan_method": "nmap", "last_scan": "2024-01-09T09:30:00Z"}');