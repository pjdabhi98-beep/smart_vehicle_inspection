type InsightCardProps = {
  title?: string;
  message?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
};

export default function InsightCard({
  title = "Maintenance Required",
  message = "Brake and tyre condition poor.",
  priority = "HIGH",
}: InsightCardProps) {
  const priorityStyle = {
    HIGH: {
      badge: "bg-red-100 text-red-700",
      icon: "⚠️",
      label: "High Priority",
    },
    MEDIUM: {
      badge: "bg-yellow-100 text-yellow-700",
      icon: "⚡",
      label: "Medium Priority",
    },
    LOW: {
      badge: "bg-green-100 text-green-700",
      icon: "✓",
      label: "Low Priority",
    },
  };

  const currentPriority = priorityStyle[priority];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-50 p-3 text-xl">
            🤖
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              AI Insight
            </h2>

            <p className="text-xs text-slate-400">
              Smart inspection analysis
            </p>
          </div>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          AI POWERED
        </span>
      </div>

      {/* Insight */}
      <div className="p-6">

        <div className="rounded-xl border border-red-100 bg-red-50/60 p-5">

          <div className="flex items-start gap-3">
            <span className="text-xl">
              {currentPriority.icon}
            </span>

            <div>
              <h3 className="font-bold text-red-700">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {message}
              </p>
            </div>
          </div>

          {/* Priority */}
          <div className="mt-5 flex items-center justify-between border-t border-red-100 pt-4">
            <span className="text-sm font-medium text-slate-500">
              Priority
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${currentPriority.badge}`}
            >
              {currentPriority.label}
            </span>
          </div>

        </div>

        {/* AI note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span>✨</span>
          <span>
            Recommendation generated from inspection data
          </span>
        </div>

      </div>
    </div>
  );
}