import {useEffect} from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

// // const counterReducer = (state = 0, action) => {
// //   switch (action.type) {
// //     case 'INCREMENT':
// //       return state + 1
// //     case 'DECREMENT':
// //       return state - 1
// //     case 'ZERO':
// //       return 0
// //     default:
// //       return state
// //   }
// // }

// // const store = createStore(counterReducer)

// const App = () => {
//   return (
//     <div>
//       <div>
//         {store.getState()}
//       </div>
//       <button 
//         onClick={e => store.dispatch({ type: 'INCREMENT' })}
//       >
//         plus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'DECREMENT' })}
//       >
//         minus
//       </button>
//       <button 
//         onClick={e => store.dispatch({ type: 'ZERO' })}
//       >
//         zero
//       </button>
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App