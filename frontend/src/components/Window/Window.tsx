import "./Window.css";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Window({
  title,
  children,
  onClose,
}: WindowProps) {
  return (
    <div className="window">
      <div className="window-header">
        <div>{title}</div>

        <button onClick={onClose}>×</button>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  );
}