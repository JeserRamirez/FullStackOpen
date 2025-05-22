import { useState } from "react"

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} {props.text === "positive" ? "%" : null}</td>
        </tr>
  )
}

const App = () => {

  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>

      <Header text="give feedback" />  
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Header text="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)) || 0}/>
          <StatisticLine text="positive" value={((good * 100)/(good + neutral + bad)) || 0} />
        </tbody>
      </table>
      
    </>
  )
}

export default App
