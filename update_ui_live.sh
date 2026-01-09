#!/bin/bash

echo "🎨 Updating SecureNet Monitor UI..."

# Copy the new CSS to the running container
docker compose cp frontend/src/App.css dashboard:/usr/share/nginx/html/static/css/

# Restart nginx to pick up changes
docker compose exec dashboard nginx -s reload

echo "✅ UI updated! Visit http://localhost:3000 to see changes"
echo "🔄 If changes don't appear, try hard refresh (Ctrl+F5)"