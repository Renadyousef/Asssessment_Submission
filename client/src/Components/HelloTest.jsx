import { useState } from "react";

export default function HelloTest() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const [student, setStudent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, level }),
      });

      const data = await res.json();

      setMsg(data.message);
      setStudent(data.student);

      // clear form
      setName("");
      setLevel("");

    } catch (error) {
      console.error("Error:", error);
      setMsg("Failed to send data");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <p>{msg}</p>

      {student && (
        <div>
          <h3>Saved Student:</h3>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Level: {student.level}</p>
        </div>
      )}
    </div>
  );
}