import express from 'express';

const workoutRouter = express.Router();

// Get all workouts
workoutRouter.get('/', async (req, res) => {
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

workoutRouter.get('/:workoutId', async (req, res) => {
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

workoutRouter.post('/', async (req, res) => {
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