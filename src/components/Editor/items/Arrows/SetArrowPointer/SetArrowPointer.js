import { useEffect, useState } from 'react';
import {useXarrow} from 'react-xarrows';
import { useDispatch } from 'react-redux';
import { deleteObjetive } from '../../../../../store/actions/objetives';

import usePairing from '../../../../../hooks/usePairing';

const SetArrowPointer = ()=>{
  const dispatch = useDispatch();
  const updateXarrow = useXarrow();
  const {pairingId, cancelPairing} = usePairing();

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      updateXarrow();
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  const style = {
    position: 'fixed',
    width: '10px',
    height:'10px',
    top: mousePos.y-5 || 320,
    left: mousePos.x-5 || 620
  }

  const handleClick = ()=>{
    dispatch(deleteObjetive(pairingId))
    cancelPairing(false);
  
  }

  return (
    <div style={style} id={'arrowPointer'} onClick={handleClick}/>
  );
}

export default SetArrowPointer 