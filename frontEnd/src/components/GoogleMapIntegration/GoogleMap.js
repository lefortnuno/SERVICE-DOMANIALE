import React, { useEffect } from "react";

function GoogleMap(){
    useEffect(()=>{
        const ifameData=document.getElementById("iframeId")
        const lat=  -21.462529;
        const lon= 47.076071;
        ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    })
    return(
        <div>
            <iframe id="iframeId" height="500px" width="100%"></iframe>
        </div>
    );
}
export default GoogleMap;