import { useDispatch, useSelector } from 'react-redux';
import { pairingActions } from '../store/reducers/pairing';
import { updateObjetive } from '../store/actions/objetives';

const usePairing = ()=>{
  const dispatch = useDispatch();
  const objetiveId = useSelector(state => state.pairing.objetiveId);

  const setPairing = (targetId)=>{
    if (objetiveId){
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