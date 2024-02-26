import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pgConnect = `postgres://mharlow9:3l5kE8Jb0vSPPeWFYANqyQM1oJEZldeq@dpg-cnef407109ks738v8h30-a/harlowdb`

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: pgConnect,
    ssl: {
        rejectUnauthorized: false,
    }
});

// Middleware
app.use(express.static("public"));

app.get('/api/workouts/', async (req, res, next) => {
    console.log("Getting all workouts");
    const workoutQuery = `SELECT * FROM Workouts`;
    try {
        const data = await pool.query(workoutQuery);
        console.log(data.rows);
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

app.listen(port, () => {
    console.log("Listening on port: ", port);
})
