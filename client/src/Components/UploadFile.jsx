import { useState } from "react";

export default function UploadFile({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        // remove prefix "data:*/*;base64,"
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };

      reader.onerror = reject;
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    const base64 = await convertToBase64(file);

    // use filename as id (or you can generate uuid)
    await onUpload(file.name, base64);
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Upload File</h5>

      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}