import { useState, useEffect } from "react";

function getDocumentHeight() {
	const { scrollHeight: height } = document.documentElement;
	return height;
}

const useDocumentHeight = () => {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		function handleResize() {
			setHeight(getDocumentHeight());
		}
    handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
      window.removeEventListener("resize", handleResize);
    }
	});

	return height;
};

export default useDocumentHeight;
