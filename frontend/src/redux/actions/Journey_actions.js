import { ActionTypes } from '../constants/actionTypes'
export const setJourney = (journeys) => {
  return {
    type: ActionTypes.SET_JOURNEYS,
    payload: journeys,
  }
}

export const selectedJourney = (journey) => {
  return {
    type: ActionTypes.SELECTED_JOURNEY,
    payload: journey,
  }
}

export const removeSelectedJourney = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_JOURNEY,
  }
}

export const setDraft = (draft) => {
  return {
    type: ActionTypes.SET_DRAFT,
    payload: draft,
  }
}
export const removeDraft = () => {
  return {
    type: ActionTypes.REMOVE_DRAFT,
  }
}
