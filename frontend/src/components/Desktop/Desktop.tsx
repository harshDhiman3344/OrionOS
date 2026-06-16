import "./Desktop.css";

import TopBar from "../TopBar/TopBar";
import MissionLog from "../../apps/MissionLog/MissionLog";
import { useWindowStore } from "../../store/windowStore";

export default function Desktop() {
  const { missionLogOpen } = useWindowStore();

  return (
    <div className="desktop">
      <TopBar />

      {missionLogOpen && <MissionLog />}

      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}

