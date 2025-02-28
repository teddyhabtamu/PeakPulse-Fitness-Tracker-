require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

const app = express();
const port = 5000;

// CORS configuration
const allowedOrigins = [
  "https://peak-pulse-fitness-tracker-kb1c.vercel.app", // Frontend URL
  "http://localhost:3000", // Local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use the CORS options
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

// Route for signup
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await db.execute(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists with that email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.execute(
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for signin
app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Both fields are required" });
  }

  try {
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = existingUser[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.user_id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
};

app.use("/api/dashboard", authenticateToken);
app.use("/api/todays-workouts", authenticateToken);

app.get("/api/dashboard", async (req, res) => {
  const userId = req.userId;
  try {
    const [[dailyStats], [weeklyStats], [workoutStats], workouts] =
      await Promise.all([
        db.query("SELECT * FROM DailyStat WHERE user_id = ?", [userId]),
        db.query("SELECT * FROM WeeklyStat WHERE user_id = ?", [userId]),
        db.query("SELECT * FROM WorkoutStat WHERE user_id = ?", [userId]),
        db.query("SELECT * FROM Workout WHERE user_id = ?", [userId]),
      ]);

    res.status(200).json({ dailyStats, weeklyStats, workoutStats, workouts });
  } catch (error) {
    console.error("Dashboard Data Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/todays-workouts", async (req, res) => {
  const userId = req.userId;
  const today = new Date().toISOString().split("T")[0];
  try {
    const [workouts] = await db.query(
      "SELECT * FROM Workout WHERE user_id = ? AND DATE(date) = ?",
      [userId, today]
    );
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching today's workouts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/workouts", authenticateToken, async (req, res) => {
  const { category, workout_name, sets, reps, weight, duration, date } =
    req.body;
  const userId = req.userId;

  try {
    await db.execute(
      "INSERT INTO Workout (user_id, category, workout_name, sets, reps, weight, duration, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, category, workout_name, sets, reps, weight, duration, date]
    );
    res.status(201).json({ message: "Workout added successfully" });
  } catch (error) {
    console.error("Error adding workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/workouts/:date", authenticateToken, async (req, res) => {
  const userId = req.userId;
  const { date } = req.params;
  try {
    const [workouts] = await db.query(
      "SELECT * FROM Workout WHERE user_id = ? AND DATE(date) = ?",
      [userId, date]
    );
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workouts for the date:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
