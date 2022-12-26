import { useState } from "react";
import ChildComponent from "../components/Child/Child";

function MapsTany() {
  const [data, setData] = useState("No data");
  const GetData = (value) => {
    console.log(value, "got-value");
    setData(value);
  };
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">
              Circonscription Domaniale et Foncier de Fianarantsoa
            </h4>
            <p className="card-category">
              Map of the distribution of users around the world
            </p>
          </div>
          <div className="card-body">
            <ChildComponent GetDataValue={GetData} />
            {data}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapsTany;
