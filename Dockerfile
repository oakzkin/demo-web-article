FROM node:10.15.3-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt (Run on build)
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run when the container launches (Run on start)
CMD ["npm", "run", "dev"]