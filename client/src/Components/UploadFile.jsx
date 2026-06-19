import { useState } from "react";

export default function UploadFile({ onUpload }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
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

    setUploading(true);
    // use filename as id
    await onUpload(file.name, base64);
    setUploading(false);
    setSuccess(true);
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Upload File</h5>

      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading…" : "Upload"}
      </button>

      {uploading && (
        <div className="mt-3 px-1">
          <div className="progress loading-bar">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {success && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-0 mt-3 py-2 px-3 upload-success">
          <span>&#10003;</span>
          <span><strong>{file.name}</strong> saved successfully!</span>
        </div>
      )}
    </div>
  );
}