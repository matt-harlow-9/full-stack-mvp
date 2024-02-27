-- Insert sample data into Exercises table
INSERT INTO Exercises (name, category, description) VALUES
    ('Push-up', 'Bodyweight', 'Bodyweight exercise for upper body'),
    ('Squat', 'Weightlifting', 'Lower body exercise with bodyweight or weights'),
    ('Bench Press', 'Weightlifting', 'Upper body exercise using a barbell on a flat bench'),
    ('Deadlift', 'Weightlifting', 'Full-body exercise lifting a loaded barbell from the ground'),
    ('Barbell Rows', 'Weightlifting', 'Back exercise involving pulling a barbell towards the torso'),
    ('Overhead Press', 'Weightlifting', 'Shoulder exercise lifting a barbell overhead'),
    ('Romanian Deadlift', 'Weightlifting', 'Hamstring and lower back exercise with a barbell'),
    ('Front Squat', 'Weightlifting', 'Lower body exercise with a barbell, emphasizing the front of the legs');

-- Insert sample data into Workouts table
INSERT INTO Workouts (date, notes) VALUES
    ('2022-01-01', 'Starting the year with a workout'),
    ('2022-01-05', 'Cardio and strength training'),
    ('2022-01-10', 'Leg day!');

-- Insert sample data into WorkoutExercises table
INSERT INTO WorkoutExercises (workout_id, exercise_id, sets, reps, weight) VALUES
    (1, 1, 3, 15, 0), -- Push-ups in the first workout
    (2, 1, 4, 20, 0), -- More push-ups in the second workout
    (2, 3, 3, 12, 150), -- Squats in the second workout
    (3, 3, 4, 15, 135); -- Squats in the third workout
