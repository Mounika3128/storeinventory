# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port (match your app’s port)
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
