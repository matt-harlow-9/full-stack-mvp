import express from 'express';

const workoutExerciseRouter = express.Router();

// Get all workouts
workoutExerciseRouter.get('/', async (req, res) => {
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
});

// Get one workout with sets/reps
workoutExerciseRouter.get('/:workoutId', async (req, res) => {
    const workoutId = Number.parseInt(req.params.workoutId);
    console.log("Getting workout at id: ", workoutId);
    const workoutQuery = `SELECT * FROM Workouts WHERE workout_id = $1`;
    try {
        const data = await pool.query(workoutQuery, [workoutId]);
        console.log(data.rows);
        // If no workouts in table, 404
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

// Post workout upon completion with sets, reps, weight
workoutExerciseRouter.post('/', async (req, res) => {
    const dateParam = req.body && req.body.date;
    console.log(dateParam);
    const notes = req.body && req.body.notes;
    if (!dateParam) {
        res.sendStatus(400);
        return;
    }
    const date = new Date(dateParam);
    // Return 400 error if data absent
    if (isNaN(date)) {
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

// Update workout set/rep/weight information
workoutExerciseRouter.patch('/:workoutId', async (req, res) => {
    const workoutId = Number.parseInt(req.params.workoutId);
    const { sets, reps, weight } = req.body;
    if (Number.isNaN(workoutId) || isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        res.sendStatus(400);
        return;
    }
    console.log("Changing workout with id: ", workoutId)
    const workoutQuery =
        `UPDATE Workouts SET
            sets = COALESCE($1, sets),
            reps = COALESCE($2, reps),
            weight = COALESCE($3, weight)
        WHERE id = $4 RETURNING *`;
    try {
        const data = await pool.query(workoutQuery, [sets, reps, weight, workoutId]);
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
workoutExerciseRouter.delete('/:workoutId', async (req, res) => {
    const workoutId = Number.parseInt(req.params.workoutId);
    if (Number.isNaN(workoutId)) {
        res.sendStatus(400);
        return;
    }
    console.log("Deleting workout with id: ", workoutId);
    try {
        const data = await pool.query(`DELETE FROM Workouts WHERE id $1 RETURNING *`, [workoutId]);
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
})