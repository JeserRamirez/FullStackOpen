
const Total = (props) => {

    const { parts } = props.parts
    const [first, second, third] = parts

    return (
        <>
            <p>Number of exercises {first.exercises + second.exercises + third.exercises}</p>
        </>
    )

}

export default Total
