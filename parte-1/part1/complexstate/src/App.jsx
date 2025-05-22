import { useState } from 'react'

// const History = (props) => {

//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )

// }

// const Button = ({handleClick, text}) => ( 
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

const Display = props => <div>{props.value}</div>

const Button = (props) => {
  <button onClick={props.handleClick}>
    {props.text}
  </button>
} 

const App = () => {

  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })

  // const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
  // const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})

  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  // const [allClicks, setAll] = useState([])
  // const [total, setTotal] = useState(0)

  //   const handleLeftClick = () => {
  //   setAll(allClicks.concat('L'))
  //   const updatedLeft = left + 1
  //   setLeft(updatedLeft)
  //   setTotal(updatedLeft + right)
  // }
  
  // const handleRightClick = () => {
  //   setAll(allClicks.concat('R'))
  //   const updatedRight = right + 1
  //   setRight(updatedRight)
  //   setTotal(updatedRight + left)
  // }

  // return (
  //   <div>
  //     {/* {clicks.left} */}
  //     {left}
  //     <Button handleClick={handleLeftClick} text="left" />
  //     <Button handleClick={handleRightClick} text="right" />
  //     {/* {clicks.right} */}
  //     {right}
  //     {/* <p>{allClicks.join(' ')}</p> */}
  //     <p>total {total}</p>
  //     <History allClicks={allClicks} />
  //   </div>
  // )

  const [value, setValue] = useState(10)

  // const handleClick = () => {
  //   console.log('clicked the button')
  //   setValue(0)
  // }
  // const hello = (who) => () => {
  //   console.log('hello', who)
  // }
  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value+1)} text="increment" />
    </div>
  )

}

export default App
