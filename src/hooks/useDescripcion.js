import { useState, useEffect } from "react";

const useDescripcion = (url = "") => {
  const [Desc, setDesc] = useState([]);
  useEffect(() => {
    const obtenerData = async () => {
      const list = await fetch(url).then((res) => res.json());
      const Entries = await list.flavor_text_entries
        .filter((x) => x.language.name === "es")
        .map((x) => x.flavor_text.replace(/\n|\r/g, " "))
        .reduce(
          (acc, value) => (acc.includes(value) ? acc : [...acc, value]),
          []
        );

      setDesc(Entries);
    };
    if (url === "") return;

    obtenerData();
  }, [url]);

  return Desc;
};

export default useDescripcion;
