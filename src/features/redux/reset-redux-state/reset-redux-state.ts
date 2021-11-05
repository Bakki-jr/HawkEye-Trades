import { useAppDispatch } from "../redux-toolkit-hooks/redux-toolkit-hooks";
import { resetLoginData } from "../slice/login.slice";
import { resetUserTrades } from "../slice/trade-journal.slice";
import { resetUserData } from "../slice/user.slice";

const useResetReduxState = () => {
	const dispatch = useAppDispatch();

	const resetData = () => {
    const promise = new Promise<boolean>(resolve => {
      dispatch(resetUserData());
      dispatch(resetLoginData());
      dispatch(resetUserTrades());
      resolve(true);
    })
    return promise;
	};
	return resetData;
};

export default useResetReduxState;
