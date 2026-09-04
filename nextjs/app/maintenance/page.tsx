type MaintenanceAlert = {
  id: number;
  vehicle: string;
issue: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  date: string;
  component: string;
};

const maintenanceAlerts: MaintenanceAlert[] = [];

export default function MaintenancePage() {
  const highPriority = maintenanceAlerts.filter(
    (alert) => alert.priority === "HIGH"
  ).length;

  const mediumPriority = maintenanceAlerts.filter(
    (alert) => alert.priority === "MEDIUM"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wide text-orange-600">
          VEHICLE HEALTH
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Maintenance Alerts
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor vehicles that require maintenance or attention.
            </p>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase text-orange-600">
              Active Alerts
            </p>
            <p className="mt-1 text-2xl font-bold text-orange-700">
              {maintenanceAlerts.length}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Alerts
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {maintenanceAlerts.length}
              </h2>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-2xl">
              ⚠️
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Vehicles requiring attention
          </p>
        </div>

        {/* High */}
        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                High Priority
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {highPriority}
              </h2>
            </div>

            <div className="rounded-xl bg-red-50 p-3 text-2xl">
              🚨
            </div>
          </div>

          <p className="mt-4 text-sm text-red-500">
            Requires immediate attention
          </p>
        </div>

        {/* Medium */}
        <div className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Medium Priority
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                {mediumPriority}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-50 p-3 text-2xl">
              🔧
            </div>
          </div>

          <p className="mt-4 text-sm text-yellow-600">
            Schedule maintenance soon
          </p>
        </div>
      </div>

      {/* Alert List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col gap-2 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Active Maintenance Alerts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the latest vehicle maintenance issues.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {maintenanceAlerts.length} alerts
          </span>
        </div>

        {/* Cards */}
        <div className="divide-y divide-slate-100">
          {maintenanceAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}
                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                    🔧
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-slate-900">
                        {alert.vehicle}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          alert.priority === "HIGH"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {alert.priority}
                      </span>
                    </div>

                    <p className="mt-2 font-medium text-slate-700">
                      {alert.issue}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>⚙️ {alert.component}</span>
                      <span>📅 {alert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  View Details →
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Insight */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex gap-4">
          <div className="text-2xl">
            🤖
          </div>

          <div>
            <h3 className="font-bold text-blue-900">
              Smart Maintenance Insight
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              High-priority alerts should be reviewed first to reduce vehicle
              downtime and improve fleet safety.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}