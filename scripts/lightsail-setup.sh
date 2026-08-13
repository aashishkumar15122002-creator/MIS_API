#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/MIS_API}"
REPO_URL="${REPO_URL:-https://github.com/aashishkumar15122002-creator/MIS_API.git}"
PUBLIC_IP="${PUBLIC_IP:-YOUR_SERVER_IP}"
DOMAIN_NAME="${DOMAIN_NAME:-}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"

echo "Preparing Ubuntu server..."
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl git wget gnupg unzip build-essential nginx certbot python3-certbot-nginx

if ! swapon --show | grep -q /swapfile; then
  echo "Adding 2 GB swap..."
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  if ! grep -q '^/swapfile ' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Cloning MIS_API..."
  git clone "$REPO_URL" "$APP_DIR"
else
  echo "Updating MIS_API..."
  git -C "$APP_DIR" pull --ff-only
fi

cd "$APP_DIR"
npm install

if [ ! -f .env ]; then
  echo "Creating .env..."
  BASE_URL="http://$PUBLIC_IP:4000"
  if [ -n "$DOMAIN_NAME" ]; then
    BASE_URL="https://$DOMAIN_NAME"
  fi
  cat > .env <<ENV
PORT=4000
BASE_URL=$BASE_URL
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=change_this_admin_password
TRIAL_DAYS=7
QUEUE_INTERVAL_MS=2000

PAYMENT_PLAN_NAME=Business Plan
PAYMENT_MONTHLY_PRICE=Rs. 3499
PAYMENT_UPI_ID=your-upi-id@bank
PAYMENT_SALES_EMAIL=Aworking822@gmail.com
ENV
fi

if [ -n "$DOMAIN_NAME" ]; then
  echo "Configuring Nginx for $DOMAIN_NAME..."
  sudo tee /etc/nginx/sites-available/mis-api >/dev/null <<NGINX
server {
  listen 80;
  server_name $DOMAIN_NAME;

  location / {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
NGINX
  sudo ln -sf /etc/nginx/sites-available/mis-api /etc/nginx/sites-enabled/mis-api
  sudo nginx -t
  sudo systemctl reload nginx

  if [ -n "$LETSENCRYPT_EMAIL" ]; then
    echo "Issuing SSL certificate..."
    sudo certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" --redirect
  else
    echo "Skipping SSL certificate because LETSENCRYPT_EMAIL is empty."
    echo "Run later: sudo certbot --nginx -d $DOMAIN_NAME"
  fi
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2..."
  sudo npm install -g pm2
fi

pm2 start src/server.js --name mis-api || pm2 restart mis-api
pm2 save

echo ""
echo "MIS_api is installed."
if [ -n "$DOMAIN_NAME" ]; then
  echo "Open ports 80 and 443 in Lightsail Networking, then visit:"
  echo "https://$DOMAIN_NAME"
else
  echo "For testing only, open port 4000 in Lightsail Networking, then visit:"
  echo "http://$PUBLIC_IP:4000"
  echo "For customers, use a domain with HTTPS instead of this IP URL."
fi
echo ""
echo "Run this once if PM2 prints a startup command:"
pm2 startup systemd -u "$USER" --hp "$HOME" || true
