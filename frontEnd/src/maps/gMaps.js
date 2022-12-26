import { useState } from "react";
import ChildComponent from "../components/Child/Child";

function GoogleMapsPartiel() {
  const [data, setData] = useState("No data");

  const GetData = (value) => {
    setData(value);
  };
  
  return (
    <>
      <ChildComponent GetDataValue={GetData} />
      {data}
    </>
  );
}

export default GoogleMapsPartiel;
