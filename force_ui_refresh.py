#!/usr/bin/env python3
"""
Force UI Refresh Script
Helps clear browser cache and see the new UI
"""

import webbrowser
import time
import requests

def force_ui_refresh():
    """Force refresh the UI and clear cache"""
    
    print("🔄 SecureNet Monitor - Force UI Refresh")
    print("=" * 50)
    
    # Check if new build is ready
    try:
        response = requests.get('http://localhost:3000', timeout=10)
        if response.status_code == 200:
            print("✅ New frontend build is ready!")
            
            # Check if it's the new build by looking for new CSS
            if 'main.' in response.text and '.css' in response.text:
                print("✅ New CSS files detected in build")
            else:
                print("⚠️  CSS files may not be updated yet")
        else:
            print(f"❌ Frontend returned status {response.status_code}")
            return
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend not accessible: {e}")
        print("Make sure the container is running: docker compose ps")
        return
    
    print("\n🧹 CLEAR YOUR BROWSER CACHE:")
    print("=" * 40)
    print("1. Open Developer Tools (F12)")
    print("2. Right-click the refresh button")
    print("3. Select 'Empty Cache and Hard Reload'")
    print("")
    print("OR use keyboard shortcuts:")
    print("• Windows/Linux: Ctrl + Shift + R")
    print("• Mac: Cmd + Shift + R")
    print("• Chrome: Ctrl + F5")
    print("")
    
    print("🎨 WHAT YOU SHOULD SEE:")
    print("=" * 30)
    print("✓ Dark blue sidebar on the left")
    print("✓ Clean white content area")
    print("✓ Professional stat cards")
    print("✓ 'Network Security Operations Center' header")
    print("✓ Menu items: Command Center, Threat Intelligence, etc.")
    print("")
    
    print("🚀 Opening browser...")
    
    try:
        # Open with cache-busting parameter
        cache_buster = int(time.time())
        url = f'http://localhost:3000?v={cache_buster}'
        webbrowser.open(url)
        print(f"✅ Opened: {url}")
        
        print(f"\n💡 TROUBLESHOOTING:")
        print(f"If you still see the old UI:")
        print(f"1. Close ALL browser tabs for localhost:3000")
        print(f"2. Clear browser cache completely:")
        print(f"   • Chrome: Settings > Privacy > Clear browsing data")
        print(f"   • Firefox: Settings > Privacy > Clear Data")
        print(f"3. Try incognito/private browsing mode")
        print(f"4. Try a different browser")
        print(f"5. Wait 2-3 minutes for container to fully start")
        
        print(f"\n🔍 VERIFY NEW UI:")
        print(f"• Sidebar should be dark blue gradient")
        print(f"• Content area should be light gray/white")
        print(f"• Navigation should say 'Command Center', 'Threat Intelligence'")
        print(f"• Logo should say 'SecureNet' with shield icon")
        
    except Exception as e:
        print(f"❌ Could not open browser: {e}")
        print(f"📱 Manually visit: http://localhost:3000")

if __name__ == "__main__":
    force_ui_refresh()