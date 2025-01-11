# Use the official Node.js image as the base image
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Serve the React app using a simple web server (e.g., serve)
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the React app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
