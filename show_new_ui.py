#!/usr/bin/env python3
"""
SecureNet Monitor UI Demo
Shows the new cybersecurity-themed interface and real network devices
"""

import webbrowser
import time
import requests

def show_ui_demo():
    """Demonstrate the new UI and features"""
    
    print("🎨 SecureNet Monitor - New UI Demo")
    print("=" * 50)
    
    # Check if services are running
    try:
        response = requests.get('http://localhost:3000', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running at http://localhost:3000")
        else:
            print(f"❌ Frontend returned status {response.status_code}")
            return
    except requests.exceptions.RequestException:
        print("❌ Frontend is not accessible. Make sure services are running:")
        print("   docker compose up -d")
        return
    
    # Check API
    try:
        response = requests.get('http://localhost:8001/api/network/devices', 
                              headers={'Authorization': 'Bearer demo-token'}, timeout=5)
        if response.status_code == 200:
            data = response.json()
            device_count = len(data.get('devices', []))
            print(f"✅ API is running - {device_count} network devices discovered")
        else:
            print(f"⚠️  API returned status {response.status_code}")
    except requests.exceptions.RequestException:
        print("⚠️  API is not accessible")
    
    print(f"\n🚀 New Features:")
    print(f"   • Professional cybersecurity theme with dark blue gradients")
    print(f"   • Enhanced menu labels: 'Command Center', 'Threat Intelligence', 'Cyber Arsenal'")
    print(f"   • Real network device discovery showing YOUR actual devices")
    print(f"   • Custom stat cards with hover effects")
    print(f"   • Professional color scheme and typography")
    
    print(f"\n📱 Navigation Guide:")
    print(f"   1. Command Center - Main dashboard with your real network devices")
    print(f"   2. Cyber Arsenal - Advanced Scanning → Network Devices tab")
    print(f"   3. Threat Intelligence - Security incidents and analysis")
    print(f"   4. Live Threats - Real-time alert monitoring")
    
    print(f"\n🌐 Opening SecureNet Monitor...")
    
    # Open the browser
    try:
        webbrowser.open('http://localhost:3000')
        print(f"✅ Browser opened!")
        
        print(f"\n💡 Tips:")
        print(f"   • If you don't see changes, try hard refresh (Ctrl+F5 or Cmd+Shift+R)")
        print(f"   • Check the 'Command Center' for your real network devices")
        print(f"   • Go to 'Cyber Arsenal' → 'Network Devices' tab for detailed device info")
        
    except Exception as e:
        print(f"❌ Could not open browser: {e}")
        print(f"📱 Manually visit: http://localhost:3000")

if __name__ == "__main__":
    show_ui_demo()