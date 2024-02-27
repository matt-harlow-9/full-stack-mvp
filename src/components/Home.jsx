import Workout from './Workout';
import ExerciseList from './ExerciseList';

const Home = (props) => {
    

    
    return (
        <div>
            <ExerciseList exerciseList={props.exerciseList}/>
        </div>
    )
}

export default Home;