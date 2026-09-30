import type { CSSProperties } from "react";
import type { EngineeringStage } from "@/content/interactive";

type StageVisualProps = {
  stage: EngineeringStage;
  active: boolean;
};

export function StageVisual({ stage, active }: StageVisualProps) {
  const steps = [...stage.flow, stage.outcome];

  return (
    <div className={`stage-visual${active ? " is-active" : ""}`} data-tone={stage.tone}>
      <div className="stage-visual-head">
        <span className="stage-visual-light" />
        <span className="stage-visual-title">{stage.label}</span>
        <span className="stage-visual-tag">Illustrative flow</span>
      </div>
      <ol className="stage-flow">
        {steps.map((step, index) => {
          const isOutcome = index === steps.length - 1;
          return (
            <li
              className={isOutcome ? "stage-flow-step is-outcome" : "stage-flow-step"}
              key={step}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="stage-flow-node" />
              <span className="stage-flow-label">{step}</span>
              <span className="stage-flow-status">{isOutcome ? "Ready" : "Pass"}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
