import "./Window.css";
import type { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
}

export default function Window({ title, children }: WindowProps) {
  return (
    <div className="window">
      <div className="window-header">
        <div className="window-title">
          📎 <span>{title}</span>
        </div>

        <div className="window-controls">
          <button>×</button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </div>
  );
}