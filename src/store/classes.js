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
    this.offset = {x: offset.x, y: offset.y};
    this.size = {w: 360, h: 240};
    this.background = '';
  }
}

class Token {
  constructor(activityId, areaId, offset){
    this.id = Date.now();
    this.activityId = activityId;
    this.areaId = areaId;
    this.type = ''; // txt / img
    this.numValue = 1;
    this.offset = {x: offset.x, y: offset.y};
    this.size = {w: 360, h: 240};
    this.clickable = true;
    this.rotable = true;
    this.resizable = true;
    this.movable = true;
    this.content= {};
  }

}

export class Text extends Token{
  constructor(activityId, areaId, offset){
    super(activityId, areaId, offset);
    this.type = 'txt';
    this.content = {
      text: ''
    }
  }
}

export class Image extends Token{
  constructor(activityId, areaId, offset){
    super(activityId, areaId, offset);
    this.type = 'img';
    this.content = {
      urlList: []
    }
  }
}