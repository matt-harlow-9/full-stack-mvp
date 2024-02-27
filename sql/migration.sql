DROP TABLE IF EXISTS WorkoutExercises;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS Exercises;

CREATE TABLE Workouts (
    workout_id SERIAL PRIMARY KEY,
    date DATE,
    notes TEXT
);

CREATE TABLE Exercises (
    exercise_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT
);

CREATE TABLE WorkoutExercises (
    workout_id INT,
    exercise_id INT,
    sets INT,
    reps INT,
    weight DECIMAL (10, 2),
    PRIMARY KEY (workout_id, exercise_id),
    FOREIGN KEY (workout_id) REFERENCES Workouts(workout_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
);

