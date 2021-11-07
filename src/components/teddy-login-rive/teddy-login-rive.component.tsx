const TeddyRiveComponent = ({
	riveComponent: TeddyRive,
}: {
	riveComponent: any;
}) => {
	return (
		<TeddyRive
			style={{
				position: "absolute",
				bottom: "-42px",
				width: "100%",
				height: "100%",
			}}
		/>
	);
};

export default TeddyRiveComponent;
