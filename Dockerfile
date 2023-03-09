# Specify a base image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]