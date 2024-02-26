import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import dotenv from 'dotenv';

import workoutRouter from './routes/workoutRouter.js';
import exerciseRouter from './routes/exerciseRouter.js';

dotenv.config();

//const pgConnect = `postgres://mharlow9:3l5kE8Jb0vSPPeWFYANqyQM1oJEZldeq@dpg-cnef407109ks738v8h30-a/harlowdb`
const pgConnectLocal = `postgres://postgres:postgres@localhost:6432/postgres`
const { Pool } = pkg;
const app = express();
const port = 3000;

const pool = new Pool({
    connectionString: pgConnectLocal,
});

// Middleware
app.use(express.static("public"));
app.use(express.json())
app.use('/api/workouts', workoutRouter);
app.use('/api/exercises', exerciseRouter);

app.listen(port, () => {
    console.log("Listening on port: ", port);
})
