# Use an official Node.js runtime as the base image
FROM node:22

# Install Firebase CLI globally
RUN npm install -g firebase-tools

# Create a work directory
WORKDIR /src

RUN npm i -g firebase-tools
RUN npm i -g @angular/cli

# Clear the npm cache to keep the image tidy
RUN npm cache clean --force

EXPOSE 4200

# Set the command to run the application
#ENTRYPOINT ["/usr/local/bin/firebase"]
CMD ["ng", "serve"]
