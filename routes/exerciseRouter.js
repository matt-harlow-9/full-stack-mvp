import express from 'express';

const exerciseRouter = express.Router();

// Get all exercises
exerciseRouter.get('/', async (req, res) => {
    console.log("Getting all exercises");
    const exerciseQuery = `SELECT * FROM Exercises`;
    try {
        const data = await pool.query(exerciseQuery);
        console.log(data.rows);
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// Get one exercise
exerciseRouter.get('/:exerciseId', async (req, res) => {
    const exerciseId = Number.parseInt(req.params.exerciseId);
    console.log("Getting exercise at id: ", exerciseId);
    const exerciseQuery = `SELECT * FROM Exercises WHERE exercise_id = $1`;
    try {
        const data = await pool.query(exerciseQuery, [exerciseId]);
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
});

// Post new exercise
exerciseRouter.post('/', async (req, res) => {
    const { name, category, description } = req.body;
    console.log(`Creating exercise with name: ${name}`);
    try {
        const data = await pool.query(`INSERT INTO Exercises (name, category, description) VALUES ($1, $2, $3) RETURNING *`, 
        [name, category, description]);
        const exercise = data.rows[0];
        res.json(exercise);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});