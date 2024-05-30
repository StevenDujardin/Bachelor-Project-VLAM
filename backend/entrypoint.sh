# backend/entrypoint.sh
#!/bin/sh

# Print Node.js and npm versions for debugging
node -v
npm -v

dir ./node_modules/.bin/../node/bin
# Ensure node_modules/.bin is in the PATH
export PATH="./node_modules/.bin:$PATH"

# Generate Prisma client
npx prisma generate

# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm start
