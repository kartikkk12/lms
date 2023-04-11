import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  journeys: [],
}
const draftInitial = {
  journey: null,
  stages: [],
}
const localStorageKey = 'myAppDraft'

// Load the draft data from local storage, if it exists
const savedDraftData = localStorage.getItem(localStorageKey)
const initialDraftData = savedDraftData
  ? JSON.parse(savedDraftData)
  : draftInitial

export const draftReducer = (state = initialDraftData, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DRAFT:
      localStorage.setItem(localStorageKey, JSON.stringify({ ...payload }))
      return { ...payload }
    case ActionTypes.REMOVE_DRAFT:
      localStorage.removeItem(localStorageKey)
      return {
        journey: {
          journey_name: '',
          display_name: '',
          overview_message: '',
          completion_message: '',
          journey_status: '',
        },
        stages: [],
      }
    default:
      return state
  }
}

export const JourneyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_JOURNEYS:
      return { ...state, journeys: payload }
    default:
      return state
  }
}

export const selectedJourneyReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_JOURNEY:
      return { ...state, ...payload }
    case ActionTypes.REMOVE_SELECTED_JOURNEY:
      return {}
    default:
      return state
  }
}
