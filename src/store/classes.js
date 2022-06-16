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

class Token {
  constructor(proyectId, activityId, offset){
    this.id = Date.now();
    this.activityId = activityId;
    this.proyectId = proyectId;
    this.areaId = 0; 
    this.type = ''; // txt / img
    this.offset = {
      x: offset.x - 180,
      y: offset.y - 100
    };
    this.screenOffset = {
      x: 0,
      y: 0
    };
    this.size = {w: 360, h: 240};
    this.clickable = true;
    this.rotatable = true;
    this.resizable = true;
    this.movable = true;
    this.feedback = '';
    this.mathematics = 1;
    this.content= {};
  }

}

export class Text extends Token{
  constructor(proyectId, activityId, offset){
    super(proyectId, activityId, offset);
    this.type = 'txt';
    this.content = {
      text: ''
    }
  }
}

export class Image extends Token{
  constructor(proyectId, activityId, offset){
    super(proyectId, activityId, offset);
    this.type = 'img';
    this.content = {
      urlList: []
    }
  }
}