export class Activity {
  constructor(){
    this.objetives = [];
    this.tokenList = [];
    this.areaList = [];
    this.arrows = [];
  }
}

export class Area {
  constructor(activityId, offset){
    this.id = Date.now();
    this.activityId = activityId;
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
  constructor(activityId, offset){
    this.id = Date.now();
    this.activityId = activityId;
    this.areaId = 0; 
    this.type = ''; // txt / img
    this.numValue = 1;
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
    this.rotable = true;
    this.resizable = true;
    this.movable = true;
    this.content= {};
  }

}

export class Text extends Token{
  constructor(activityId, offset){
    super(activityId, offset);
    this.type = 'txt';
    this.content = {
      text: ''
    }
  }
}

export class Image extends Token{
  constructor(activityId, offset){
    super(activityId, offset);
    this.type = 'img';
    this.content = {
      urlList: []
    }
  }
}