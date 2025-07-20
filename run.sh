#!/bin/bash
echo "Starting the Nikud Chef..."

# Moving to the project directory
cd /home/user/chef-nikud-game

# Installing dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages..."
  npm install
fi

# Starting the development server
echo "Starting development server..."
npm start
