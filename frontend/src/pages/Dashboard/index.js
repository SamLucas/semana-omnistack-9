import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadspot() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", { headers: { user_id } });
      setSpots(response.data);
    }
    loadspot();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot.id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
