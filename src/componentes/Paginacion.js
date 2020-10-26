import React, { useState, useEffect, useCallback } from "react";
import { Pagination } from "react-bootstrap";

//
//@desc componente de paginacion, al ejecutar el handle click pasa como parametro el numero de pagina o
//en su defecto los valores 'primero' 'ultimo' 'previo' 'siguiente'
const Paginacion = React.memo(
  ({ handleClick, disabled, paginaActual, maximo, limite, offset }) => {
    const [items, setItems] = useState([]);

    const llenarItems = useCallback(() => {
      let tempItems = [];
      const inicio = offset * limite;
      for (let i = inicio; i <= limite + inicio; i++) {
        if (i >= maximo) break;
        let item = (
          <Pagination.Item
            active={i + 1 === paginaActual}
            key={i}
            disabled={disabled}
            onClick={handleClick(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        );
        tempItems.push(item);
      }
      setItems(tempItems);
    }, [paginaActual, maximo, limite, offset, disabled, handleClick]);

    useEffect(() => {
      llenarItems();
    }, [offset, llenarItems]);

    return (
      <Pagination className="overflow-auto m-auto">
        <Pagination.First
          onClick={handleClick("primero")}
          disabled={disabled || paginaActual <= 1}
        />
        <Pagination.Prev
          onClick={handleClick("previo")}
          disabled={disabled || paginaActual <= 1}
        />
        <Pagination.Ellipsis
          onClick={handleClick(
            paginaActual - limite <= 0 ? 1 : paginaActual - limite
          )}
          disabled={disabled || paginaActual <= 1}
        />
        {items}
        <Pagination.Ellipsis
          onClick={handleClick(
            paginaActual + limite > maximo ? maximo : paginaActual + limite
          )}
          disabled={disabled || paginaActual >= maximo}
        />
        <Pagination.Next
          onClick={handleClick("siguiente")}
          disabled={disabled || paginaActual >= maximo}
        />
        <Pagination.Last
          onClick={handleClick("ultimo")}
          disabled={disabled || paginaActual >= maximo}
        />
      </Pagination>
    );
  }
);

export default Paginacion;
