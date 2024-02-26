// Get All Workouts
const getAllWorkouts = async (req, res, next) => {
    console.log("Getting all workouts");
    const workoutQuery = `SELECT * FROM Workouts`;
    try {
        const data = await pool.query(workoutQuery);
        console.log(data.rows);
        res.json(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        next(error);
    }
}

// Get workout from URL ID
const getOneWorkout = async (req, res, next) => {
    const workoutId = Number.parseInt(req.params.workoutId);
    console.log("Getting workout id: ", workoutId);
    const workoutQuery = `SELECT * FROM Workouts WHERE id = $1`;
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
        res.sendStatus(500)
        next(error)
    }
}

// Create workout
const createWorkout = async (req, res, next) => {
    const workoutId = Number.parseInt(req.params.workoutId);
    const { notes, dateParam } = req.body;
    const date = new Date(dateParam)
    // Return 400 error if stage name, real name, age, or teacher_id absent
    if (isNaN(date)) {
        res.sendStatus(400);
        return;
    }
    console.log(`Creating workout with on date: ${date}`);
    try {
        const data = await pool.query(`INSERT INTO Workouts (date, notes) VALUES ($1, $2) RETURNING *`,
        [date, notes]);
        const workout = data.rows[0];
        res.json(workout);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}