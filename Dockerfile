FROM node:20

WORKDIR /app

# Copy only package files first (improves caching)
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy all source files
COPY . /app

# Set environment variables
ENV PORT=3000

# Expose port explicitly
EXPOSE 3000

# Default command
CMD ["npm", "start"]
