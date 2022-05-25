const initialState = {
  currentActivity: 0,
  activities:[
    {id: 0},
    {id: 1}
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