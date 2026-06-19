export default function ResultView({ result }) {
  if (!result) return null;

  const { id, data } = result;

  // convert raw base64 → browser image URL
  const imageSrc = `data:image/png;base64,${data}`;

  return (
    <div className="card p-3">
      <h5>Result</h5>

      <p><strong>Name:</strong> {id}</p>

      <img
        src={imageSrc}
        alt={id}
        className="result-image"
        style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
      />

    </div>
  );
}