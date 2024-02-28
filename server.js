import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

import workoutRouter from './routes/workoutRouter.js';
import exerciseRouter from './routes/exerciseRouter.js';
import workoutExerciseRouter from './routes/workoutExerciseRouter.js';

dotenv.config();

const pgConnect = `postgres://mharlow9:3l5kE8Jb0vSPPeWFYANqyQM1oJEZldeq@dpg-cnef407109ks738v8h30-a/harlowdb`
const pgConnectLocal = `postgres://postgres:postgres@localhost:6432/postgres`
const { Pool } = pkg;
const app = express();
const port = 10000;


const pool = new Pool({
    connectionString: pgConnect,
    ssl: {
        rejectUnauthorized: false, // Only use this in development
    }
});

// Middleware
app.use(
    express.json(),
    express.static('dist'),
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type']
    })
);

app.set('pool', pool);

// Middleware
app.use('/api/workouts', workoutRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api/workout-details', workoutExerciseRouter);

app.listen(port, () => {
    console.log("Listening on port: ", port);
});
