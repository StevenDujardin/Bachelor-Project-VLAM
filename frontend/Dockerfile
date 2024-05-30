# frontend/Dockerfile
FROM node:22.2.0

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose the port the app runs on
EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
