import "./Desktop.css";
import TopBar from "../TopBar/TopBar";
import Window from "../Window/Window";

export default function Desktop() {
  return (
    <div className="desktop">
      <TopBar />

      <Window title="Observation Log">
        <h2>Operator: Harsh</h2>

        <p>Current Objective</p>

        <ul>
          <li>Build weird things</li>
          <li>Learn Japanese</li>
          <li>Talk to satellites</li>
          <li>Finish OrionOS</li>
        </ul>

        <button>Begin Session</button>
      </Window>

      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}
