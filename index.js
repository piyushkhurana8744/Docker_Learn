const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const cors = require('cors');
const {RedisStore} = require('connect-redis');
const {createClient} = require("redis")

console.log("Redis host:", process.env.REDIS_HOST)
console.log("Redis port:", process.env.REDIS_PORT)
console.log("Redis secret:", process.env.REDIS_SECRET);

let redisClient = createClient({
    legacyMode: true, // This is necessary for connect-redis v6+
    socket: {
        host: process.env.REDIS_HOST, // or your Redis host
        port: process.env.REDIS_PORT,        // or your Redis port
    }
});


redisClient.connect().catch((err) => {
    console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your frontend URL
        credentials: true,
    })
);

const redisStore = new RedisStore({
    client: redisClient.v4,
    prefix: "myapp:",
  });
  

  app.use(
    session({
      store: redisStore,
      secret: process.env.REDIS_SECRET || 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000, // 1 minute for testing
        sameSite: "lax",
      },
    })
  );

  app.enable("trust proxy", 1); // trust first proxy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging middleware
app.use((req, res, next) => {
    console.log("Session data:", req.session);
    next();
});

app.get("/test-session", (req, res) => {
    req.session.user = "This is a test session";
    res.send("Session set!");
});


const allRoutes = require("./routes/index");
app.use("/api", allRoutes);

mongoose.connect(process.env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.get("/", (req, res) => {
    res.send("Hello World!!!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});