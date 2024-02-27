import express from 'express';

const workoutExerciseRouter = express.Router();

// Get all workouts
workoutExerciseRouter.get('/', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    console.log("Getting all workouts");
    const workoutQuery = `SELECT * FROM WorkoutExercises`;
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
    // Access pool from request object
    const pool = req.app.get('pool');
    const workoutId = Number.parseInt(req.params.workoutId);
    console.log("Getting workout at id: ", workoutId);
    const workoutQuery = `SELECT * FROM WorkoutExercises WHERE workout_id = $1`;
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
    // Access pool from request object
    const pool = req.app.get('pool');

    // Destructure properties from request body
    const { sets, reps, weight } = req.body;
    const workoutId = req.body.workout_id;
    const exerciseId = req.body.exercise_id;
    try {
        if (!workoutId || !exerciseId) {
            return res.status(400).json({ error: 'Workout ID and Exercise ID are required'});
        } 
        // Check if the exercise is already in the workout
        const existingExercise = await pool.query(`
            SELECT * FROM WorkoutExercises 
            WHERE workout_id = $1 AND exercise_id = $2`,
            [workoutId, exerciseId]);
        if (existingExercise.rows.length > 0) {
            return res.status(400).json({ error: 'Exercise already in workout, recommend updating workout details' });
        }
        const data = await pool.query(`
            INSERT INTO WorkoutExercises (workout_id, exercise_id, sets, reps, weight)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`, 
            [workoutId, exerciseId, sets, reps, weight]);

        const workoutExercise = data.rows[0];
        res.json(workoutExercise);
    } catch(error) {
        console.log(error);
        res.sendStatus(500).json({ error: 'Internal Server Error'});
    }
})

// Update workout set/rep/weight information
workoutExerciseRouter.patch('/:workoutId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');

    const workoutId = Number.parseInt(req.params.workoutId);
    const exerciseId = Number.parseInt(req.body.exercise_id)
    const { sets, reps, weight } = req.body;
    if (Number.isNaN(workoutId) || Number.isNaN(exerciseId) || isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        return res.sendStatus(400);
    }
    console.log("Changing workout with id: ", workoutId)
    const workoutQuery =
        `UPDATE WorkoutExercises SET
            exercise_id = COALESCE($1, exercise_id),
            sets = COALESCE($2, sets),
            reps = COALESCE($3, reps),
            weight = COALESCE($4, weight)
        WHERE workout_id = $5 RETURNING *`;
    try {
        const data = await pool.query(workoutQuery, [exerciseId, sets, reps, weight, workoutId]);
        // If no data returns, send back 404
        if (data.rows.length === 0) {
            return res.sendStatus(404);
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
    // Access pool from request object
    const pool = req.app.get('pool');
    const workoutId = Number.parseInt(req.params.workoutId);
    if (Number.isNaN(workoutId)) {
        res.sendStatus(400);
        return;
    }
    console.log("Deleting workout with id: ", workoutId);
    try {
        const data = await pool.query(`
            DELETE FROM WorkoutExercises
            WHERE id $1 RETURNING *`, [workoutId]);
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

export default workoutExerciseRouter;