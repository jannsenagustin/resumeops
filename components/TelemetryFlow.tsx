type TelemetryFlowProps = {
  className?: string;
};

export default function TelemetryFlow({ className = "" }: TelemetryFlowProps) {
  return (
    <span className={["telemetry-flow", className].filter(Boolean).join(" ")} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}
