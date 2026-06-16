import "./Desktop.css";

import TopBar from "../TopBar/TopBar";
import MissionLog from "../../apps/MissionLog/MissionLog";

export default function Desktop() {
  return (
    <div className="desktop">
      <TopBar />

      <MissionLog />

      <div className="grain"></div>
      <div className="vignette"></div>
    </div>
  );
}