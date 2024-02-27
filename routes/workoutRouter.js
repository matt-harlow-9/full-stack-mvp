import express from 'express';

const workoutRouter = express.Router();

// Get all workouts
workoutRouter.get('/', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    console.log("Getting all workouts");
    const workoutQuery = `SELECT * FROM Workouts`;
    try {
        const data = await pool.query(workoutQuery);
        console.log(data.rows);
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

// Get one workout
workoutRouter.get('/:workoutId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const workoutId = Number.parseInt(req.params.workoutId);
    console.log("Getting workout at id: ", workoutId);
    const workoutQuery = `SELECT * FROM Workouts WHERE workout_id = $1`;
    try {
        const data = await pool.query(workoutQuery, [workoutId]);
        console.log(data.rows);
        if (data.rows.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

})

// Post workout with date/time and notes
workoutRouter.post('/', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const date = req.body && req.body.date;
    console.log(date);
    const notes = req.body && req.body.notes;
    if (!date) {
        res.sendStatus(400);
        return;
    }
    const dateParam = new Date(date);
    // Return 400 error if data absent
    if (isNaN(dateParam)) {
        res.sendStatus(400);
        return;
    }
    console.log(`Creating workout with date: ${date}`);
    try {
        const data = await pool.query(`INSERT INTO Workouts (date, notes) VALUES ($1, $2) RETURNING *`, 
        [dateParam, notes]);
        const workout = data.rows[0];
        res.json(workout);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// Update workout information
workoutRouter.patch('/:workoutId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const workoutId = Number.parseInt(req.params.workoutId);
    const { notes } = req.body;
    const dateParam = req.body && req.body.date
    console.log(dateParam)
    const date = new Date(dateParam)
    console.log(date);
    console.log(notes);
    if (Number.isNaN(workoutId) || isNaN(date)) {
        res.sendStatus(400);
        return;
    }
    console.log("Changing workout with id: ", workoutId)
    const workoutQuery =
        `UPDATE Workouts SET
            date = COALESCE($1, date),
            notes = COALESCE($2, notes)
        WHERE workout_id = $3 RETURNING *`;
    try {
        const data = await pool.query(workoutQuery, [date, notes, workoutId]);
        // If no data returns, send back 404
        if (data.rows.length === 0) {
            res.sendStatus(404);
            return;
        }
        // Workout updated OK - send to client
        console.log("Workout updated: \n", data.rows[0]);
        res.json(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete workout from Workouts table
workoutRouter.delete('/:workoutId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const workoutId = Number.parseInt(req.params.workoutId);
    if (Number.isNaN(workoutId)) {
        res.sendStatus(400);
        return;
    }
    console.log("Deleting workout with id: ", workoutId);
    try {
        const data = await pool.query(`DELETE FROM Workouts WHERE workout_id = $1 RETURNING *`, [workoutId]);
        if (data.rows.length === 0) {
            console.log("No workout found with that id");
            res.sendStatus(404);
        } else {
            console.log("Deleted workout: \n", data.rows[0]);
            res.json(data.rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default workoutRouter;