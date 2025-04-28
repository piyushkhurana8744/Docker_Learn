# 1. Use an official Node.js image
FROM node:20

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (for better cache on rebuilds)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your application code (including /routes, /controllers etc.)
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Start the app
CMD ["npm", "start"]
