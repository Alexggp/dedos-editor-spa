import { useDispatch, useSelector } from 'react-redux';
import { pairingActions } from '../store/reducers/pairing';
import { updateObjetive } from '../store/actions/objetives';

const usePairing = ()=>{
  const dispatch = useDispatch();
  const objetiveId = useSelector(state => state.pairing.objetiveId);
  const objetiveList = useSelector(state => state.objetives.objetivesList);
  const objetive = objetiveList.find(o=>o._id === objetiveId);

  const setPairing = (targetId)=>{
    if (objetiveId && objetive.origin !== targetId){
      dispatch(pairingActions.set(false));
      dispatch(updateObjetive({
        objetiveId: objetiveId,
        data: {target: targetId}
      }));
    }
    return;
  }

  const cancelPairing = ()=>{
    dispatch(pairingActions.set(false));
  }

  return {setPairing, pairingId: objetiveId, cancelPairing};
}

export default usePairing;