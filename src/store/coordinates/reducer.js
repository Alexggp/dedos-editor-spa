const initialState = {
  x:0,
  y:0
}


const reducer = (state = initialState, action )=>(
  {
    ...state,
    x: action.payload ? action.payload.x : state.x,
    y: action.payload ? action.payload.y : state.y
  }
)

export default reducer