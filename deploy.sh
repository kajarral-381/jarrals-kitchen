#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
npx netlify deploy --prod --dir=dist

echo "Deployment complete!"
