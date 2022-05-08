const initialState = {
  isActive: false
}

const togleTrash = (bool) =>{
  return {
    type: 'TOGLE_TRASH',
    value: bool
  }
}

const trashIsActiveReducer = (state = initialState, action= {} )=>(
  {
    ...state,
    isActive: !!action.value
  }
)

export {trashIsActiveReducer, togleTrash};