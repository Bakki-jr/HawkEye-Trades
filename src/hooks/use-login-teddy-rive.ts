import { useStateMachineInput } from "rive-react";

export const STATE_TEDDY_MACHINE_NAME = "State Machine 1";
const TEDDY_FAILURE = "fail";
const TEDDY_SUCCESS = "success";

export const useTeddyRiveFailure = (TeddyRiveInstance: any) => {
	return useStateMachineInput(
		TeddyRiveInstance,
		STATE_TEDDY_MACHINE_NAME,
		TEDDY_FAILURE
	);
};

export const useTeddyRiveSuccess = (TeddyRiveInstance: any) => {
	return useStateMachineInput(
		TeddyRiveInstance,
		STATE_TEDDY_MACHINE_NAME,
		TEDDY_SUCCESS
	);
};