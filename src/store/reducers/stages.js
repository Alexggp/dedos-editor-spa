const initialState = {
  stages:[
    {
      itemList: [
        {
          type: 'zone',
          itemId: 0,
          offset:{
            x: 10,
            y: 15
          },
          size:{
            w: 1010,
            h: 792
          }
        },
        {
          type: 'image',
          itemId: 1,
          offset:{
            x: 177,
            y: 104
          },
          size:{
            w: 300,
            h: 200
          }
        },
        {
          type: 'text',
          itemId: 2,
          offset:{
            x: 475,
            y: 506
          },
          size:{
            w: 458,
            h: 220
          }
        }
      ]
    },
    {
      itemList: [
        {
          type: 'zone',
          itemId: 0,
          offset:{
            x: 50,
            y: 30
          },
          size:{
            w: 800,
            h: 700
          }
        }
      ]
    }
  ]
}


const move = (x, y) =>{
  return {
    type: "MOVE_ITEM",
    payload: {
      x: x,
      y: y
    }
  }
}

const stagesReducer = (state = initialState, action )=>(
  {
    ...state
  }
)

export default stagesReducer;