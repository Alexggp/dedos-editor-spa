export const project = (title, userId) => ({
    _id: Date.now(),
    userId,
    title
})


export const activity = (projectId) => ({
  _id: Date.now(),
  projectId, 
})


export const area = (projectId, activityId, offset) => ({
  _id: Date.now(),
  activityId,
  projectId,
  type: 'Player', // Player / Game
  offset: {
    x: offset.x - 180,
    y: offset.y - 100
  },
  size: {w: 360, h: 240},
  background: ''
})

const token = (projectId, activityId, offset) => ({

    activityId,
    projectId,
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

export const text = (projectId, activityId, offset) => ({
  ...token(projectId, activityId, offset),
  ...{
    type: 'txt',
    content: {
      text: ''
    }
  }

})

export const image = (projectId, activityId, offset) => ({
    ...token(projectId, activityId, offset),
    ...{
      type: 'img',
      content: {
        urlList: []
      }
    }
  
})