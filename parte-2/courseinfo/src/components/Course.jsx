

const Course = (props) => {
    return (
        <>
            {
                props.course.map(course => {
                    return (
                        <div key={course.id}>
                        <Header course={course} />
                        <Content parts={course} />
                        <Total parts={course} />
                        </div>
                    )
                })
            }
    </>
    )
}

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Content = (props) => {
    const isEmpty = (props) => {
        return !props.parts.parts || props.parts.parts === 0;
    }

    return (
        <div>
            {
                isEmpty(props)
                ? <p>No parts available</p>
                : props.parts.parts.map(part => {
                    return (
                        <Part key={part.id} part={part} />
                    )
                })
            }
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    if (!props.parts.parts || props.parts.parts.length === 0) {
        return <p>No exercises available</p>
    }

    const total = props.parts.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p>
            <strong>Total of {total} exercises</strong>
        </p>
    ) 
}

export default Course