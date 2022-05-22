const initialState = {
  tokenList: [
    {
      id: 4,
      activityId: 0,
      areaId: 1,
      type: 'img',
      offset:{
        x: 10,
        y: 384
      },
      size:{
        w: 300,
        h: 200
      },
      movable: true,
      content:{
        urlList:[
          "https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png",
          "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
        ]
      }
    },
    {
      activityId: 0,
      areaId: 0,
      id: 2,
      type: 'img',
      offset:{
        x: 177,
        y: 104
      },
      size:{
        w: 300,
        h: 200
      },
      movable: true,
      content:{
        urlList:[
          "https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png",
          "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
        ]
      }
    },
    {
      id: 3,
      activityId: 0,
      areaId: 0,
      type: 'txt',
      offset:{
        x: 475,
        y: 506
      },
      size:{
        w: 458,
        h: 220
      },
      movable: true,
      content:{
        text: 'holita hola holota'
      }
    },
    {
      id: 5,
      activityId: 1,
      areaId: 8,
      type: 'txt',
      offset:{
        x: 475,
        y: 506
      },
      size:{
        w: 458,
        h: 220
      },
      movable: true,
      content:{
        text: 'testo de la actividad 2'
      }
    }
  ]
}

const moveToken = (tokenId, offset) =>{
  return {
    type: "MOVE_TOKEN",
    tokenId: tokenId,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveTokenInState = (state, tokenId, offset) => {

  const cloneItemList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const coneToken = {...cloneItemList[tokenIndex]}

  coneToken.offset= offset;
  cloneItemList[tokenIndex] = coneToken;
  state.tokenList= cloneItemList;

  return state;
  
}

const tokensReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'MOVE_TOKEN':
      return moveTokenInState(state, action.tokenId, action.offset);
    default:
      return {
        ...state
      }
  }
}

export {tokensReducer, moveToken};