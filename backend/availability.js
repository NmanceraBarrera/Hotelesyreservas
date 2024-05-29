import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  database: "hotel_reservation",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

app.use(cors());

app.get("/api/availability", (req, res) => {
  const { ciudad, fechaInicio, fechaFin, numeroPersonas, tipoHabitacion } =
    req.query;

  console.log("Parámetros recibidos:", {
    ciudad,
    fechaInicio,
    fechaFin,
    numeroPersonas,
    tipoHabitacion,
  });

  const query = `
      SELECT h.nombre AS hotel, ha.tipo, ha.cantidad_disponible
      FROM hoteles h
      JOIN habitaciones ha ON h.id_hotel = ha.id_hotel
      WHERE h.ciudad = ? AND ha.tipo = ? AND ha.capacidad_max >= ?;
    `;

  db.query(query, [ciudad, tipoHabitacion, numeroPersonas], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Resultados de la consulta:", results);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
