import { pool } from "../DB_connection/db.js";

export const sayHello = async (req, res) => {
  try {
    const { name, level } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, level) VALUES ($1, $2) RETURNING *",
      [name, level]
    );

    res.json({
      message: "Student added successfully",
      student: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database insert failed" });
  }
};