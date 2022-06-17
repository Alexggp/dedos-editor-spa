export const project = (title, userId) => ({
    _id: Date.now(),
    userId,
    title
})


export const activity = (projectId) => ({
  _id: Date.now(),
  projectId, 
})


export const area = (proyectId, activityId, offset) => ({
  _id: Date.now(),
  activityId,
  proyectId,
  type: 'Player', // Player / Game
  offset: {
    x: offset.x - 180,
    y: offset.y - 100
  },
  size: {w: 360, h: 240},
  background: ''
})

const token = (proyectId, activityId, offset) => ({

    _id : Date.now(),
    activityId,
    proyectId,
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
    clickable: true,
    rotatable: true,
    resizable: true,
    movable: true,
    feedback: '',
    mathematics : 1,
    content: {},
  }
)

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