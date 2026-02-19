export default function FifaPanel({ title, children }) {
  return (
    <div className="fifa-panel">
      <h2 className="fifa-panel-title">{title}</h2>
      <div className="fifa-panel-content">{children}</div>
    </div>
  );
}
