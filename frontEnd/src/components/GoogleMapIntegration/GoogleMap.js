import React, { useEffect } from "react";

function GoogleMap(props) {
	useEffect(() => {
		const ifameData = document.getElementById("iframeId");
		// const lat=  -21.462529;
		// const lon= 47.076071;
		const lat = props.latitude;
		const lon = props.longitude;
		ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&t=k&amp;&z=20&amp;&output=embed`;
		// q=${lat},${lon} === coordonnées laborde
		// &t=&amp === vue satellite par defaut
		// &z=20&amp === zoom fois 20 par defaut
	});
	return (
		<div>
			<iframe id="iframeId" height="250px" width="100%"></iframe>
		</div>
	);
}
export default GoogleMap;
