import { useState } from "react"

// const Hello = ({name,age}) => {
  
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )

// }

const Display = ({counter}) => <div>{counter}</div>


const Button = ({onSmash,text}) => <button onClick={onSmash}>{text}</button>

const App = () => {
  // const name="Peter"
  // const age=10

  // const friends = [
  //   { name: "Peter", age: 4 },
  //   { name: "Maya", age: 10 },
  // ]
  
  const [counter, setCounter] = useState(0)

  console.log('rendering whith counter value', counter)
  
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <>

      {/* <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} /> */}
      {/* <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p> */}

      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />

    </>
  )

}
export default App
