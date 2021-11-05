import styled from "styled-components";

interface ISpinner {
  height: number;
  spinnerPosition: string;
}

export const PageSpinnerWrapper = styled.div<ISpinner>`
	position: ${(props) => props.spinnerPosition ? props.spinnerPosition : "absolute"};
  top: 0;
  left: 0;
	display: grid;
	place-items: center;
	width: 100%;
  height: ${(props) => props.height}px;
	background: #00000050;
  `;
  