export class Project {
  constructor(title, userId){
    this.id = Date.now();
    this.userId = userId;
    this.title = title
  }
}


export class Activity {
  constructor(){
    this.id = Date.now();
  }
}

export class Area {
  constructor(proyectId, activityId, offset){
    this.id = Date.now();
    this.activityId = activityId;
    this.proyectId = proyectId;
    this.type = 'Player'; // Player / Game
    this.offset = {
      x: offset.x - 180,
      y: offset.y - 100
    };
    this.size = {w: 360, h: 240};
    this.background = '';
  }
}

const token = (proyectId, activityId, offset) => ({

    _id : Date.now(),
    activityId : activityId,
    proyectId : proyectId,
    areaId : 0, 
    type : '', // txt / img
    offset : {
      x: offset.x - 180,
      y: offset.y - 100
    },
    screenOffset : {
      x: 0,
      y: 0
    },
    size : {w: 360, h: 240},
    clickable : true,
    rotatable : true,
    resizable : true,
    movable : true,
    feedback : '',
    mathematics : 1,
    content: {},
})

export const text = (proyectId, activityId, offset) => ({
  ...token(proyectId, activityId, offset),
  ...{
    type: 'txt',
    content: {
      text: ''
    }
  }

})

export const image = (proyectId, activityId, offset) => ({
    ...token(proyectId, activityId, offset),
    ...{
      type: 'img',
      content: {
        urlList: []
      }
    }
  
})