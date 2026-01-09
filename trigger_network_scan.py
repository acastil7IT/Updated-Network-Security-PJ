#!/usr/bin/env python3
"""
Trigger Network Scan Script
Forces a fresh network discovery scan to find real devices on your network
"""

import requests
import time

def trigger_scan():
    """Trigger a network discovery scan"""
    
    print("🔍 Triggering Network Discovery Scan...")
    print("=" * 50)
    
    # Clear sample data first
    print("🧹 Clearing sample data...")
    
    # Trigger network discovery service restart to force fresh scan
    import subprocess
    try:
        result = subprocess.run(['docker', 'compose', 'restart', 'network-discovery'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Network discovery service restarted")
        else:
            print(f"❌ Failed to restart service: {result.stderr}")
    except Exception as e:
        print(f"❌ Error restarting service: {e}")
    
    print("\n⏳ Waiting for network scan to complete...")
    print("This may take 1-2 minutes to discover all devices on your network...")
    
    # Wait for scan to complete
    time.sleep(60)
    
    # Check results
    try:
        response = requests.get('http://localhost:8001/api/network/devices', 
                              headers={'Authorization': 'Bearer demo-token'})
        
        if response.status_code == 200:
            data = response.json()
            devices = data.get('devices', [])
            
            print(f"\n🎉 Network scan completed!")
            print(f"📊 Found {len(devices)} devices on your network")
            
            # Show real devices (filter out sample data)
            real_devices = [d for d in devices if d.get('hostname') and 
                          not d.get('hostname').startswith('router.local')]
            
            if real_devices:
                print(f"\n🏠 Your Real Network Devices:")
                print("-" * 60)
                for device in real_devices[:10]:  # Show first 10
                    ip = device.get('ip_address', 'Unknown')
                    hostname = device.get('hostname', 'Unknown')
                    device_type = device.get('device_type', 'Unknown')
                    status = "🟢 Online" if device.get('is_online') else "🔴 Offline"
                    
                    print(f"  {ip:<15} | {hostname:<30} | {device_type:<15} | {status}")
                
                print(f"\n✅ Your network devices are now visible in the dashboard!")
                print(f"🌐 Visit: http://localhost:3000")
                print(f"📱 Go to: Advanced Scanning → Network Devices tab")
            else:
                print("\n⚠️  No real devices found yet. The scanner may need more time.")
                print("Network discovery runs continuously every 5 minutes.")
        else:
            print(f"❌ Failed to fetch devices: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error checking results: {e}")

if __name__ == "__main__":
    trigger_scan()