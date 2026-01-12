#!/usr/bin/env python3
"""
Network Traffic Injector
Generates simulated network traffic patterns for CyberHawk demonstration
"""

import time
import random
import requests
from datetime import datetime

class TrafficInjector:
    def __init__(self):
        self.api_base = "http://localhost:8001"
        self.dashboard_url = "http://localhost:3000"
        
    def check_services(self):
        """Check if CyberHawk services are running"""
        print("🔍 Checking CyberHawk Services...")
        print("=" * 50)
        
        try:
            response = requests.get(f"{self.dashboard_url}", timeout=3)
            if response.status_code == 200:
                print("✅ CyberHawk Dashboard: RUNNING")
                return True
            else:
                print(f"⚠️  CyberHawk Dashboard: RESPONDING ({response.status_code})")
                return True
        except requests.exceptions.RequestException:
            print("❌ CyberHawk Dashboard: NOT ACCESSIBLE")
            print("\n💡 Please start CyberHawk first:")
            print("   docker compose up -d")
            return False
    
    def generate_port_scan_traffic(self, attacker_ip, target_ports):
        """Generate port scan traffic simulation"""
        print(f"\n📡 Generating Port Scan Traffic from {attacker_ip}")
        print("=" * 50)
        
        for i, port in enumerate(target_ports):
            # Simulate network packet
            packet_info = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'source_ip': attacker_ip,
                'dest_ip': '192.168.1.1',
                'source_port': 50000 + i,
                'dest_port': port,
                'protocol': 'TCP',
                'packet_size': 64,
                'flags': 'SYN'
            }
            
            print(f"📦 [{packet_info['timestamp']}] {packet_info['source_ip']}:{packet_info['source_port']} -> {packet_info['dest_ip']}:{packet_info['dest_port']} (TCP SYN)")
            time.sleep(0.1)  # Simulate network delay
    
    def generate_brute_force_traffic(self, attacker_ip, target_port, attempts):
        """Generate brute force traffic simulation"""
        print(f"\n🔐 Generating Brute Force Traffic from {attacker_ip}")
        print("=" * 50)
        
        credentials = [
            "admin:admin", "root:root", "admin:password", "user:user",
            "administrator:password", "admin:123456", "root:toor"
        ]
        
        for i in range(attempts):
            cred = random.choice(credentials)
            packet_info = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'source_ip': attacker_ip,
                'dest_ip': '192.168.1.1',
                'source_port': 40000 + i,
                'dest_port': target_port,
                'protocol': 'TCP',
                'credentials': cred
            }
            
            print(f"🔑 [{packet_info['timestamp']}] SSH Login Attempt: {cred} from {packet_info['source_ip']}:{packet_info['source_port']}")
            time.sleep(0.2)
    
    def generate_dos_traffic(self, attacker_ip, target_port, request_count):
        """Generate DoS traffic simulation"""
        print(f"\n💥 Generating DoS Traffic from {attacker_ip}")
        print("=" * 50)
        
        for i in range(request_count):
            packet_info = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'source_ip': attacker_ip,
                'dest_ip': '192.168.1.1',
                'source_port': 60000 + (i % 1000),
                'dest_port': target_port,
                'protocol': 'TCP',
                'packet_size': 256
            }
            
            if i % 5 == 0:
                print(f"📡 [{packet_info['timestamp']}] DoS Packet {i+1}/{request_count}: {packet_info['source_ip']}:{packet_info['source_port']} -> {packet_info['dest_ip']}:{packet_info['dest_port']}")
            time.sleep(0.05)
    
    def generate_web_attack_traffic(self, attacker_ip):
        """Generate web attack traffic simulation"""
        print(f"\n🌐 Generating Web Attack Traffic from {attacker_ip}")
        print("=" * 50)
        
        attack_urls = [
            "/admin", "/login.php", "/wp-admin", "/phpmyadmin",
            "/admin.php", "/administrator", "/admin/login",
            "/../../etc/passwd", "/admin'; DROP TABLE users; --"
        ]
        
        for i, url in enumerate(attack_urls):
            packet_info = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'source_ip': attacker_ip,
                'dest_ip': '192.168.1.1',
                'method': 'GET',
                'url': url,
                'user_agent': 'Mozilla/5.0 (Attack Scanner)'
            }
            
            print(f"🌐 [{packet_info['timestamp']}] {packet_info['method']} {packet_info['url']} from {packet_info['source_ip']}")
            time.sleep(0.15)

def main():
    """Main traffic injection simulation"""
    print("🚀 CyberHawk Traffic Injector")
    print("=" * 50)
    print("📊 Simulating realistic network attack patterns")
    print("🎯 This generates traffic simulation for demonstration")
    print()
    
    injector = TrafficInjector()
    
    # Check if services are running
    if not injector.check_services():
        return
    
    print("\n🚀 Starting Traffic Generation...")
    print("💡 Monitor results in CyberHawk Dashboard -> Network Monitor")
    print()
    
    # Generate different attack patterns
    injector.generate_port_scan_traffic(
        "203.0.113.200", 
        [22, 23, 80, 135, 443, 445, 1433, 3389]
    )
    
    injector.generate_brute_force_traffic(
        "198.51.100.100", 
        22, 
        8
    )
    
    injector.generate_web_attack_traffic(
        "192.0.2.75"
    )
    
    injector.generate_dos_traffic(
        "192.0.2.50", 
        80, 
        15
    )
    
    print("\n" + "=" * 50)
    print("✅ Traffic Generation Complete!")
    print("🔍 Check CyberHawk Dashboard for traffic analysis:")
    print(f"   {injector.dashboard_url}")
    print("\n💡 For real threat detection, use the Attack Simulation")
    print("   in Security & Discovery -> Attack Simulation tab")

if __name__ == "__main__":
    main()