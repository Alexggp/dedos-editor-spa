const initialState = {
  currentActivity: 1,
  activities:[
    {id: 0},
    {id: 1},
    {id: 2}
  ]
}



const activitiesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    
    default:
      return {
        ...state
      }
  }
}

export {activitiesReducer};