const initialState = {
  areaList: [
    {
      id: 1,
      activityId: 0,
      type: 'Player',
      offset:{
        x: 10,
        y: 15
      },
      size:{
        w: 1010,
        h: 792
      }, 
      background: "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
    },
    {
      id: 8,
      activityId: 1,
      type: 'Game',
      offset:{
        x: 10,
        y: 15
      },
      size:{
        w: 800,
        h: 600
      }, 
      background: "",
    }
  ]
}


const areasReducer = (state = initialState, action )=>(
  {
    ...state
  }
)

export {areasReducer};