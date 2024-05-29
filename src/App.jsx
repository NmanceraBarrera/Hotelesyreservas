import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ciudad, setCiudad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [numeroPersonas, setNumeroPersonas] = useState(1);
  const [tipoHabitacion, setTipoHabitacion] = useState("estándar");
  const [resultados, setResultados] = useState([]);

  const consultarDisponibilidad = async () => {
    try {
      console.log("Enviando solicitud con:", {
        ciudad,
        fechaInicio,
        fechaFin,
        numeroPersonas,
        tipoHabitacion,
      });

      const response = await axios.get(
        "http://localhost:3000/api/availability",
        {
          params: {
            ciudad,
            fechaInicio,
            fechaFin,
            numeroPersonas,
            tipoHabitacion,
          },
        }
      );

      console.log("Respuesta recibida:", response.data);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al consultar disponibilidad:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="left-column">
        <h1 className="title">Consulta de Habitaciones Disponibles</h1>
        <form className="form">
          <label>
            Ciudad:
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Cali">Cali</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Bogotá">Bogotá</option>
            </select>
          </label>
          <label>
            Fecha de Inicio:
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </label>
          <label>
            Fecha de Fin:
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </label>
          <label>
            Número de Personas:
            <input
              type="number"
              value={numeroPersonas}
              onChange={(e) => setNumeroPersonas(e.target.value)}
              min="1"
            />
          </label>
          <label>
            Tipo de Habitación:
            <select
              value={tipoHabitacion}
              onChange={(e) => setTipoHabitacion(e.target.value)}
            >
              <option value="estándar">Estándar</option>
              <option value="premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </label>
          <button type="button" onClick={consultarDisponibilidad}>
            Consultar Disponibilidad
          </button>
        </form>
      </div>
      <div className="right-column">
        <div className="results">
          <h2 className="results-title">Resultados</h2>
        </div>
        <div className="cards-container">
          {resultados.map((resultado, index) => (
            <div key={index} className="card">
              <p>Hotel: {resultado.hotel}</p>
              <p>Tipo: {resultado.tipo}</p>
              <p>Disponible: {resultado.cantidad_disponible}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
