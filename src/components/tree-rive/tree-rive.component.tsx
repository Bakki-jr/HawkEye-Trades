const TreeRiveComponent = ({
	riveComponent: TreeRive,
}: {
	riveComponent: any;
}) => {
	return (
		<TreeRive
			style={{
				position: "absolute",
				bottom: "0",
				right: "0",
				width: "304px",
				height: "304px",
			}}
		/>
	);
};

export default TreeRiveComponent;
