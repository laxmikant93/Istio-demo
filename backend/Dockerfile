# Use official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Run the backend server
CMD ["node", "server.js"]
