import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = props => {
  const dipatch = useDispatch()

  return (
    <div>
        all
          <input
            type="radio"
            name="filter"
            onChange={() => dipatch(filterChange('ALL'))} 
          />
        important
          <input
            type="radio"
            name="filter"
            onChange={() => dipatch(filterChange('IMPORTANT'))}
          />
        nonimportant
          <input
            type="radio"
            name="filter"
            onChange={() => dipatch(filterChange('NONIMPORTANT'))}
          />
      </div>
  )
}

export default VisibilityFilter