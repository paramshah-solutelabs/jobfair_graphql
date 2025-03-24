# Use an official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before copying source code (to leverage Docker caching)
COPY package*.json ./

# Install dependencies explicitly
RUN npm install --only=production

# Copy the remaining project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
