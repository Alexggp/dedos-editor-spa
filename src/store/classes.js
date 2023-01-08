export const project = (title, description, screenResolution) => ({
    title,
    description,
    screenResolution
})


export const activity = (projectId) => ({
  projectId,
  zIndexTop: 0,
})


export const area = (projectId, activityId, offset) => ({
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

export const objetive = (projectId, activityId, type, origin, target, value ) => ({
  projectId, 
  activityId,
  type,
  origin,
  target, 
  value
})