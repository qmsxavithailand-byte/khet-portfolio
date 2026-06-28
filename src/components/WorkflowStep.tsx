interface Step {
  icon: string;
  label: string;
  sub: string;
  color: string;
  border: string;
}

interface Props {
  steps: Step[];
}

export default function WorkflowStep({ steps }: Props) {
  return (
    <div className="flex flex-wrap items-start gap-1">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start">
          <div className="flex flex-col items-center min-w-[110px]">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2 border"
              style={{ background: step.color, borderColor: step.border }}
            >
              {step.icon}
            </div>
            <div className="text-xs font-semibold text-[#94a3b8] text-center leading-tight"
              dangerouslySetInnerHTML={{ __html: step.label }} />
            <div className="text-[10px] text-[#475569] text-center mt-1 leading-tight"
              dangerouslySetInnerHTML={{ __html: step.sub }} />
          </div>
          {i < steps.length - 1 && (
            <div className="text-[#334155] text-xl mt-4 mx-1">›</div>
          )}
        </div>
      ))}
    </div>
  );
}
