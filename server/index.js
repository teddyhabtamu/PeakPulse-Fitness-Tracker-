require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("./db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const resetPasswordEmail = require("./templates/resetPasswordEmail");
const welcomeEmail = require("./templates/welcomeEmail");

const secretKey = process.env.JWT_SECRET || "your_secret_key";
const googleClientId = process.env.GOOGLE_CLIENT_ID;

const app = express();
const port = 5000;
const BASE_URL = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


// CORS configuration
const allowedOrigins = [
  process.env.BASE_URL,
  'http://localhost:3000',
  'https://peakpulse.tewodroshabtamu.dev',
  'https://peak-pulse-fitness-tracker-kb1c.vercel.app',
  'https://peak-pulse-fitness-tracker.vercel.app'
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins, 
  credentials: true, 
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use the CORS options

// Route for signup
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await db.execute(
      "SELECT user_id FROM users WHERE email = $1",
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
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())",
      [name, email, hashedPassword]
    );

    try {
      await transporter.sendMail({
        from: `"PeakPulse" <${process.env.SMTP_FROM || "noreply@peakpulse.app"}>`,
        to: email,
        subject: "Welcome to PeakPulse!",
        html: welcomeEmail(name),
      });
    } catch (emailErr) {
      console.warn("Welcome email failed:", emailErr.message);
    }

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
      "SELECT * FROM users WHERE email = $1",
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

    res.status(200).json({ 
      message: "Sign in successful", 
      token,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for forgot password
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT user_id FROM users WHERE email = $1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await db.execute(
      "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
      [resetToken, tokenExpiry, email]
    );

    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    try {
      await transporter.sendMail({
        from: `"PeakPulse" <${process.env.SMTP_FROM || "noreply@peakpulse.app"}>`,
        to: email,
        subject: "Reset your PeakPulse password",
        html: resetPasswordEmail(resetUrl),
      });
    } catch (emailErr) {
      console.warn("Email sending failed:", emailErr.message, emailErr.response);
      console.log("Reset URL (logged for debugging):", resetUrl);
    }

    console.log(`Password reset URL for ${email}: ${resetUrl}`);

    res.status(200).json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for reset password
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and password are required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT user_id, reset_token_expiry FROM users WHERE reset_token = $1",
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const user = rows[0];

    if (new Date() > new Date(user.reset_token_expiry)) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.execute(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE user_id = $2",
      [hashedPassword, user.user_id]
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for Google OAuth sign-in / sign-up
app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Google credential is required" });
  }

  try {
    if (!googleClientId) {
      return res.status(500).json({ message: "Google OAuth is not configured" });
    }

    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    if (!email) {
      return res.status(400).json({ message: "Google account has no email" });
    }

    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let userId;

    if (existingUser.length > 0) {
      const user = existingUser[0];
      userId = user.user_id;

      if (!user.google_id) {
        await db.execute(
          "UPDATE users SET google_id = $1 WHERE user_id = $2",
          [googleId, userId]
        );
      }
    } else {
      const result = await db.execute(
        "INSERT INTO users (name, email, password, google_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING user_id",
        [name, email, "", googleId]
      );
      userId = result[0][0]?.user_id || result[0]?.user_id;

      try {
        await transporter.sendMail({
          from: `"PeakPulse" <${process.env.SMTP_FROM || "noreply@peakpulse.app"}>`,
          to: email,
          subject: "Welcome to PeakPulse!",
          html: welcomeEmail(name),
        });
      } catch (emailErr) {
        console.warn("Welcome email failed for Google user:", emailErr.message);
      }
    }

    const token = jwt.sign({ id: userId, email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google sign-in successful",
      token,
      name,
      email,
    });
  } catch (error) {
    console.error("Google auth error:", error);
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
    const [workouts] = await db.query("SELECT * FROM Workout WHERE user_id = $1 ORDER BY date DESC", [userId]);

    const workoutStats = workouts.map((w, idx) => ({
      id: idx + 1,
      user_id: userId,
      calories_burned: 0,
      sets: w.sets,
      reps: w.reps,
      weight: w.weight,
      duration: w.duration,
      date: w.date,
    }));

    const dailyMap = {};
    workouts.forEach((w) => {
      if (!w.date) return;
      const dateKey = new Date(w.date).toISOString().split("T")[0];
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = { id: Object.keys(dailyMap).length + 1, user_id: userId, calories_burned: 0, date: dateKey };
      }
    });
    const dailyStats = Object.values(dailyMap);

    const weeklyMap = {};
    workouts.forEach((w) => {
      if (!w.date) return;
      const d = new Date(w.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = { id: Object.keys(weeklyMap).length + 1, user_id: userId, calories_burned: 0, week_start_date: weekKey };
      }
    });
    const weeklyStats = Object.values(weeklyMap);

    const now = new Date();
    const recentCutoff = new Date(now);
    recentCutoff.setDate(now.getDate() - 7);
    const prevCutoff = new Date(now);
    prevCutoff.setDate(now.getDate() - 14);

    const recent = workouts.filter((w) => w.date && new Date(w.date) >= recentCutoff);
    const previous = workouts.filter(
      (w) => w.date && new Date(w.date) >= prevCutoff && new Date(w.date) < recentCutoff
    );

    const calcTrend = (recentVal, prevVal) => {
      if (prevVal === 0) return recentVal > 0 ? 100 : 0;
      return Math.round(((recentVal - prevVal) / prevVal) * 100);
    };

    const recentWorkoutCount = recent.length;
    const prevWorkoutCount = previous.length;

    const recentDuration = recent.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
    const prevDuration = previous.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);

    const recentVolume = recent.reduce(
      (sum, w) => sum + (Number(w.sets) || 0) * (Number(w.reps) || 0) * (Number(w.weight) || 0),
      0
    );
    const prevVolume = previous.reduce(
      (sum, w) => sum + (Number(w.sets) || 0) * (Number(w.reps) || 0) * (Number(w.weight) || 0),
      0
    );

    const trends = {
      totalWorkouts: calcTrend(recentWorkoutCount, prevWorkoutCount),
      totalDuration: calcTrend(recentDuration, prevDuration),
      totalVolume: calcTrend(recentVolume, prevVolume),
    };

    res.status(200).json({ dailyStats, weeklyStats, workoutStats, workouts, trends });
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
      "SELECT * FROM Workout WHERE user_id = $1 AND CAST(date AS DATE) = $2",
      [userId, today]
    );
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching today's workouts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/workouts", authenticateToken, async (req, res) => {
  let { category, workout_name, sets, reps, weight, duration, date } =
    req.body;
  const userId = req.userId;

  sets = sets === "" || sets === undefined || sets === null ? null : sets;
  reps = reps === "" || reps === undefined || reps === null ? null : reps;
  weight = weight === "" || weight === undefined || weight === null ? null : weight;
  duration = duration === "" || duration === undefined || duration === null ? null : duration;

  try {
    await db.execute(
      "INSERT INTO Workout (user_id, category, workout_name, sets, reps, weight, duration, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
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
      "SELECT * FROM Workout WHERE user_id = $1 AND CAST(date AS DATE) = $2",
      [userId, date]
    );
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workouts for the date:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/blog", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    await db.execute(
      "INSERT INTO Blog (author_id, title, content, created_at) VALUES ($1, $2, $3, NOW())",
      [userId, title, content]
    );
    res.status(201).json({ message: "Blog post created successfully" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/blog", async (req, res) => {
  try {
    const [blogPosts] = await db.execute(
      "SELECT Blog.*, users.name AS author_name FROM Blog JOIN users ON Blog.author_id = users.user_id ORDER BY created_at DESC"
    );
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/user/profile", authenticateToken, async (req, res) => {
  const userId = req.userId;
  try {
    const [rows] = await db.execute(
      "SELECT name, email FROM users WHERE user_id = $1",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/user/profile", authenticateToken, async (req, res) => {
  const userId = req.userId;
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    await db.execute("UPDATE users SET name = $1 WHERE user_id = $2", [name.trim(), userId]);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on ${BASE_URL || `http://localhost:${port}`}`);
});

module.exports = app;
