export class Activity {
  constructor(){
    this.objetives = [],
    this.tokenList = [],
    this.areaList = [],
    this.arrows = []
  }
}

export class Area {
  constructor(id, {x, y}, {w, h}){
    this.id = id,
    this.type = 'Player', // Player / Game
    this.offset = {x: x, y:y},
    this.size = {w: w || 360, h: h || 240},
    this.background = '',
    this.tokenList = []
  }
}

class Token {
  constructor(id, {x, y}, {w, h}){
    this.id = id,
    this.type = '', // txt / img
    this.numValue = 1,
    this.offset = {x: x, y:y},
    this.size = {w: w || 360, h: h || 240},
    this.clickable = true, 
    this.rotable = true, 
    this.resizable = true, 
    this.movable = true
    this.content= {}
  }

}

export class Text extends Token{
  constructor(id, {x, y}, {w, h}){
    super(id, {x, y}, {w, h});
    this.type = 'txt',
    this.content = {
      text: ''
    }
  }
}

export class Image extends Token{
  constructor(id, {x, y}, {w, h}){
    super(id, {x, y}, {w, h});
    this.type = 'img',
    this.content = {
      urlList: []
    }
  }
}