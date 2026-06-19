import { useState } from "react";

export default function GetBlob({ onFetch, loading }) {
  const [id, setId] = useState("");

  return (
    <div className="card p-3 mb-3">
      <h5>Get Blob</h5>

      <input
        className="form-control mb-2"
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={() => onFetch(id)}
        disabled={loading}
      >
        {loading ? "Fetching…" : "Fetch"}
      </button>
    </div>
  );
}