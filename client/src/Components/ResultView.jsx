function getMimeType(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  const map = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    pdf: "application/pdf",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    ogg: "video/ogg",
    avi: "video/x-msvideo",
  };
  return map[ext] ?? "application/octet-stream";
}

// ✅ SAFE base64 → Blob URL converter (IMPORTANT for PDFs/videos)
function base64ToBlobUrl(base64, mime) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mime });

  return URL.createObjectURL(blob);
}

export default function ResultView({ result }) {
  if (!result) return null;

  const { id, data } = result;
  const mime = getMimeType(id);

  let src;
  let preview;

  // =========================
  // IMAGES (keep simple base64)
  // =========================
  if (mime.startsWith("image/")) {
    src = `data:${mime};base64,${data}`;

    preview = (
      <img
        src={src}
        alt={id}
        className="result-image"
        style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
      />
    );
  }

  // =========================
  // PDF (FIXED → Blob URL)
  // =========================
  else if (mime === "application/pdf") {
    src = base64ToBlobUrl(data, mime);

    preview = (
      <iframe
        src={src}
        title={id}
        style={{
          width: "100%",
          height: "500px",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      />
    );
  }

  // =========================
  // VIDEO (Blob URL recommended too, but base64 ok for now)
  // =========================
  else if (mime.startsWith("video/")) {
    src = base64ToBlobUrl(data, mime);

    preview = (
      <video
        src={src}
        controls
        style={{
          maxWidth: "100%",
          borderRadius: "8px",
          marginTop: "10px",
          display: "block",
        }}
      />
    );
  }

  // =========================
  // FALLBACK (download)
  // =========================
  else {
    src = `data:${mime};base64,${data}`;

    preview = (
      <a href={src} download={id} className="btn btn-primary mt-3">
        Download {id}
      </a>
    );
  }

  return (
    <div className="card p-3">
      <h5>Result</h5>
      <p className="result-label">
        <strong>Name:</strong> {id}
      </p>
      {preview}
    </div>
  );
}