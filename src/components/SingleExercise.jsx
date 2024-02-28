const SingleExercise = (props) => {
    
    const handleClick = () => {
        setCurrent
    }

    return (
        <div>
            <div>{props.name}</div>
            <div>Category: {props.category}</div>
            <div>Description: {props.description}</div>
        </div>
    )
}

export default SingleExercise;