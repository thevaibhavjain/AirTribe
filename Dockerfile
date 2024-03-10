# Use Node.js 14 as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4000 (or use the one specified in your environment variable)
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
