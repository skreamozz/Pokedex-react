import React from "react";
import { Card } from "react-bootstrap";
import useDescripcion from "../hooks/useDescripcion";

const Descripcion = ({ url = "" }) => {
  const Desc = useDescripcion(url);
  return (
    <div>
      <Card.Title className="mt-2">Descripcion</Card.Title>
      {Desc.map((desc, key) => (
        <Card.Text key={key}>{desc}</Card.Text>
      ))}
    </div>
  );
};

export default Descripcion;
