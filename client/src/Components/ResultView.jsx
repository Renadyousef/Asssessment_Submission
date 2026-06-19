export default function ResultView({ result }) {
  if (!result) return null;

  return (
    <div className="card p-3">
      <h5>Result</h5>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}