import "./DesktopIcon.css";

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick?: () => void;
}

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <div className="desktop-icon" onDoubleClick={onDoubleClick}>
      <div className="icon">{icon}</div>
      <span>{label}</span>
    </div>
  );


}































