import SingleExercise from "./SingleExercise";

const ExerciseList = (props) => {
    
    const handleClick = () => {
        props.getExerciseList();
    }
    const exerciseList = props.exerciseList;
    return exerciseList.map((exercise) => (
        <SingleExercise name={exercise.name} category={exercise.category} description={exercise.description} />
    ))

}

export default ExerciseList