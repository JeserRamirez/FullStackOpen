
const Part = (props) => {

    return (
        <>
            <p>{props.part} {props.exercises}</p>
        </>
    )

}

const Content = (props) => {

    const { parts } = props.parts
    const [first, second, third] = parts

    return (
        <>
            <Part part={first.name} exercises={first.exercises} />
            <Part part={second.name} exercises={second.exercises} />
            <Part part={third.name} exercises={third.exercises} />
        </>
    )

}

export default Content
