#!/usr/bin/env python3
"""
Device Discovery Demo Script
Demonstrates the network device discovery feature in SecureNet Monitor
"""

import requests
import json
import time
from datetime import datetime

def demo_device_discovery():
    """Demonstrate the device discovery feature"""
    
    print("🌐 SecureNet Monitor - Device Discovery Demo")
    print("=" * 50)
    
    api_url = "http://localhost:8001/api/network/devices"
    headers = {"Authorization": "Bearer demo-token"}
    
    try:
        # Fetch network devices
        print("📡 Fetching discovered network devices...")
        response = requests.get(api_url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            devices = data.get('devices', [])
            stats = data.get('stats', {})
            
            print(f"\n📊 Network Statistics:")
            print(f"   Total Devices: {stats.get('total', 0)}")
            print(f"   Online: {stats.get('online', 0)}")
            print(f"   Offline: {stats.get('offline', 0)}")
            print(f"   New Today: {stats.get('new_today', 0)}")
            
            print(f"\n🔍 Discovered Devices ({len(devices)} total):")
            print("-" * 80)
            
            # Group devices by type
            device_types = {}
            for device in devices:
                device_type = device.get('device_type', 'Unknown')
                if device_type not in device_types:
                    device_types[device_type] = []
                device_types[device_type].append(device)
            
            # Display devices by type
            for device_type, type_devices in device_types.items():
                print(f"\n📱 {device_type} ({len(type_devices)} devices):")
                
                for device in type_devices[:5]:  # Show first 5 of each type
                    ip = device.get('ip_address', 'Unknown')
                    hostname = device.get('hostname', 'Unknown')
                    vendor = device.get('vendor', 'Unknown')
                    status = "🟢 Online" if device.get('is_online') else "🔴 Offline"
                    risk = device.get('risk_score', 0)
                    ports = device.get('open_ports', [])
                    
                    risk_level = "🔴 HIGH" if risk >= 7 else "🟡 MEDIUM" if risk >= 4 else "🟢 LOW"
                    
                    print(f"   • {ip:<15} | {(hostname or 'Unknown'):<20} | {(vendor or 'Unknown'):<15} | {status} | Risk: {risk_level}")
                    
                    if ports:
                        print(f"     Open Ports: {', '.join(ports[:5])}")
                        if len(ports) > 5:
                            print(f"     ... and {len(ports) - 5} more ports")
                
                if len(type_devices) > 5:
                    print(f"   ... and {len(type_devices) - 5} more {device_type} devices")
            
            # Show high-risk devices
            high_risk_devices = [d for d in devices if d.get('risk_score', 0) >= 4]
            if high_risk_devices:
                print(f"\n⚠️  High Risk Devices ({len(high_risk_devices)}):")
                print("-" * 50)
                for device in high_risk_devices:
                    ip = device.get('ip_address', 'Unknown')
                    hostname = device.get('hostname', 'Unknown')
                    risk = device.get('risk_score', 0)
                    device_type = device.get('device_type', 'Unknown')
                    
                    print(f"   🚨 {ip} ({hostname}) - {device_type} - Risk Score: {risk}")
            
            print(f"\n✅ Device discovery demo completed!")
            print(f"📱 Access the Advanced Scanning dashboard at: http://localhost:3000")
            print(f"   Navigate to 'Advanced Scanning' → 'Network Devices' tab")
            
        else:
            print(f"❌ Failed to fetch devices: HTTP {response.status_code}")
            print("Make sure the SecureNet Monitor is running:")
            print("   docker compose up -d")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed. Make sure SecureNet Monitor is running:")
        print("   docker compose up -d")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    demo_device_discovery()