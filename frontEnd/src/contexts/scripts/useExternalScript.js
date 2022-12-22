import { useEffect } from "react";

export default function ImportScript (resourceUrl) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [resourceUrl]);
};

