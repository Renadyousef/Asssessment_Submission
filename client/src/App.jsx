import './App.css'
import { useState } from "react";
// import UploadBlob from "./components/UploadBlob";
import GetBlob from "./components/GetBlob";
import ResultView from "./components/ResultView";
import UploadFile from "./components/UploadFile";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadBlob = async (id, data) => {
    await fetch("http://localhost:5000/v1/blobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer secret123",
      },
      body: JSON.stringify({ id, data }),
    });
  };

  const getBlob = async (id) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/v1/blobs/${id}`,
      {
        headers: {
          Authorization: "Bearer secret123",
        },
      }
    );

    const json = await res.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 app-title">Blob Storage Test</h2>

      <UploadFile onUpload={uploadBlob} />
      <GetBlob onFetch={getBlob} loading={loading} />

      {loading && (
        <div className="mb-3 px-1">
          <div className="progress loading-bar">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      <ResultView result={result} />
    </div>
  );
}