import './App.css'
import { useState } from "react";
// import UploadBlob from "./components/UploadBlob";
import GetBlob from "./components/GetBlob";
import ResultView from "./components/ResultView";
import UploadFile from "./components/UploadFile";

export default function App() {
  const [result, setResult] = useState(null);

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
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Blob Storage Test</h2>

      <UploadFile onUpload={uploadBlob} />
      <GetBlob onFetch={getBlob} />
      <ResultView result={result} />
    </div>
  );
}