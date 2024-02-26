-- Insert sample data into Exercises table
INSERT INTO Exercises (name, category, description) VALUES
    ('Push-up', 'Strength', 'Bodyweight exercise for upper body'),
    ('Running', 'Cardio', 'Jogging for cardiovascular health'),
    ('Squat', 'Strength', 'Lower body exercise with bodyweight or weights');

-- Insert sample data into Workouts table
INSERT INTO Workouts (date, notes) VALUES
    ('2022-01-01', 'Starting the year with a workout'),
    ('2022-01-05', 'Cardio and strength training'),
    ('2022-01-10', 'Leg day!');

-- Insert sample data into WorkoutExercises table
INSERT INTO WorkoutExercises (workout_id, exercise_id, sets, reps, weight) VALUES
    (1, 1, 3, 15, 0), -- Push-ups in the first workout
    (1, 2, NULL, NULL, NULL), -- Running in the first workout
    (2, 1, 4, 20, 0), -- More push-ups in the second workout
    (2, 3, 3, 12, 50), -- Squats in the second workout
    (3, 3, 4, 15, 60), -- Squats in the third workout
    (3, 2, NULL, NULL, NULL); -- Running in the third workout
