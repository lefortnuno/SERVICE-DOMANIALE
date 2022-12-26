import React, { useEffect } from "react";
import GoogleMap from "../GoogleMapIntegration/GoogleMap";

function ChildComponent(props) {
  useEffect(() => {
    props.GetDataValue("By Trofel ");
  });
  return (
    <>
      <GoogleMap />
    </>
  );
}
export default ChildComponent;
