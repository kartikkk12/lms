import { combineReducers } from '@reduxjs/toolkit'
import {
  draftReducer,
  JourneyReducer,
  selectedJourneyReducer,
} from './JourneyReducer'
// console.log(JourneyReducer)

export const reducers = combineReducers({
  allJourneys: JourneyReducer,
  singleJourney: selectedJourneyReducer,
  draft: draftReducer,
})

// export default reducers
