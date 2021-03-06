import React, { useState, useMemo } from "react";
import api from "../../services/api";
import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmte(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("user");
    const data = new FormData();

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("price", price);
    data.append("techs", techs);

    await api.post("/spots", data, { headers: { user_id } });
    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmte}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : null}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        value={company}
        onChange={event => setCompany(event.target.value)}
        placeholder="Sua empresa incrivel"
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por virgula)</span>
      </label>
      <input
        id="techs"
        type="text"
        value={techs}
        onChange={event => setTechs(event.target.value)}
        placeholder="Quais Tecnologias usam?"
      />

      <label htmlFor="price">
        VALOR DA DIARIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        type="text"
        value={price}
        onChange={event => setPrice(event.target.value)}
        placeholder="Valor cobrado por dia"
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
