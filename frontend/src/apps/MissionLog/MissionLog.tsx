import Window from "../../components/Window/Window";
import "./MissionLog.css";
import { useWindowStore } from "../../store/windowStore";

export default function MissionLog() {
  const { setMissionLogOpen } = useWindowStore();

  return (
    <Window
      title="Mission Log"
      onClose={() => setMissionLogOpen(false)}
    >
      <h2>Today's Mission</h2>

      <div className="task">
        <input type="checkbox" />
        <span>Finish OrionOS</span>
      </div>

      <div className="task">
        <input type="checkbox" />
        <span>Practice Japanese</span>
      </div>

      <div className="task">
        <input type="checkbox" />
        <span>Track ISS Pass</span>
      </div>

      <div className="task">
        <input type="checkbox" />
        <span>Read 20 Pages</span>
      </div>

      <button className="add-task">
        + New Task
      </button>
    </Window>
  );
}