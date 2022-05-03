const move = (x, y) =>{
  return {
    type: "MOVE_ITEM",
    payload: {
      x: x,
      y: y
    }
  }
}

export {move} 
