import express from 'express';

const exerciseRouter = express.Router();

// Get all exercises
exerciseRouter.get('/', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
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
    // Access pool from request object
    const pool = req.app.get('pool');
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
    // Access pool from request object
    const pool = req.app.get('pool');
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

// Update exercise information
exerciseRouter.patch('/:exerciseId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const exerciseId = Number.parseInt(req.params.exerciseId);
    const { name, category, description } = req.body;
    if (Number.isNaN(exerciseId)) {
        res.sendStatus(400);
        return;
    }
    console.log("Changing exercise with id: ", exerciseId)
    const exerciseQuery =
        `UPDATE Exercises SET
            name = COALESCE($1, name),
            category = COALESCE($2, category),
            description = COALESCE($3, description)
        WHERE exercise_id = $4 RETURNING *`;
    try {
        const data = await pool.query(exerciseQuery, [name, category, description, exerciseId]);
        // If no data returns, send back 404
        if (data.rows.length === 0) {
            res.sendStatus(404);
            return;
        }
        // Exercise updated OK - send to client
        console.log("Exercise updated: \n", data.rows[0]);
        res.json(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete exercise from Exercises table
exerciseRouter.delete('/:exerciseId', async (req, res) => {
    // Access pool from request object
    const pool = req.app.get('pool');
    const exerciseId = Number.parseInt(req.params.exerciseId);
    if (Number.isNaN(exerciseId)) {
        res.sendStatus(400);
        return;
    }
    console.log("Deleting exercise with id: ", exerciseId);
    try {
        const data = await pool.query(`DELETE FROM Exercises WHERE exercise_id = $1 RETURNING *`, [exerciseId]);
        if (data.rows.length === 0) {
            console.log("No exercise found with that id");
            res.sendStatus(404);
        } else {
            console.log("Deleted exercise: \n", data.rows[0]);
            res.json(data.rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default exerciseRouter;