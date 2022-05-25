 const checkOverlapping = (obj, list, activity) =>{
    
  const testList = list.filter(el => el.activityId === activity);
  let overlapsWith = [];

  testList.forEach(element => {

    // element.top > obj.bottom ||
    // element.right < obj.left ||
    // element.bottom < obj.top ||
    // element.left > obj.right

    const overlaps = !(
      element.offset.y > obj.offset.y + obj.size.h ||
      element.offset.x + element.size.w < obj.offset.x ||
      element.offset.y + element.size.h < obj.offset.y ||
      element.offset.x > obj.offset.x + obj.size.w
    );

    if (overlaps) overlapsWith.push(element.id);
    
  });
  return overlapsWith;
}

export default checkOverlapping;