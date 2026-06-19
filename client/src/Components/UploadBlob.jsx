import { useState } from "react";

export default function UploadBlob({ onUpload }) {
  const [id, setId] = useState("");
  const [data, setData] = useState("");

  return (
    <div className="card p-3 mb-3">
      <h5>Upload Blob</h5>

      <input
        className="form-control mb-2"
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Base64 data"
        onChange={(e) => setData(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={() => onUpload(id, data)}
      >
        Upload
      </button>
    </div>
  );
}