import { useState } from 'react'
import useCounter from './hooks/useCounter'
import useField from './hooks/useField'

const App = () => {
  // const counter = useCounter()

  // return (
  //   <div>
  //     <div>{counter.value}</div>
  //     <button onClick={counter.increase}>
  //       plus
  //     </button>
  //     <button onClick={counter.decrease}>
  //       minus
  //     </button>
  //     <button onClick={counter.zero}>
  //       zero
  //     </button>
  //   </div>
  // )

  // const left = useCounter()
  // const right = useCounter()

  // return (
  //   <div>
  //     {left.value}
  //     <button onClick={left.increase}>
  //       left
  //     </button>
  //     <button onClick={right.increase}>
  //       right
  //     </button>
  //     {right.value}
  //   </div>
  // )

  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        {/* <input 
          type={name.type}
          value={name.value}
          onChange={name.onChange}
        /> */}
        <input {...name} />
        <br />
        birthdate:
        {/* <input 
          type={born.type}
          value={born.value}
          onChange={born.onChange}
        /> */}
        <input {...born} />
        <br />
        height:
        {/* <input 
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        /> */}
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default App
