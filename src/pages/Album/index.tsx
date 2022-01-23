import React from "react";
import { useParams } from "react-router-dom";

const Album = () => {
  const params = useParams<{ id: string }>();
  console.log(params);
  return (
    <div>
      <div>{params.id}</div>
    </div>
  );
};

export default Album;
