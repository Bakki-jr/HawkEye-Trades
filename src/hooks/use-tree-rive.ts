import { useStateMachineInput } from "rive-react";

export const STATE_TREE_MACHINE_NAME = "State Machine 1";
export const TREE_INPUT_NAME = "input";

export const useTreeRiveInputChange = (TreeRiveInstance: any) => {
	return useStateMachineInput(
		TreeRiveInstance,
		STATE_TREE_MACHINE_NAME,
		TREE_INPUT_NAME
	);
};
