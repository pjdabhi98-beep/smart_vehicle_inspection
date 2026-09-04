import InsightCard from "@/components/InsightCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          SMART VEHICLE INSPECTION
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Vehicle Inspection Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor vehicles, inspections and maintenance alerts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-3">

        {/* Vehicles */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-50 p-3 text-2xl">
              🚗
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              Active
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Vehicles
          </p>

          <h2 className="mt-1 text-4xl font-bold text-slate-900">
            0
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Vehicles registered in fleet
          </p>
        </div>

        {/* Inspections */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-purple-50 p-3 text-2xl">
              🔍
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              Inspections
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Inspections
          </p>

          <h2 className="mt-1 text-4xl font-bold text-slate-900">
            0
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Inspections completed
          </p>
        </div>

        {/* Alerts */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-red-50 p-3 text-2xl">
              ⚠️
            </div>

            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              Attention
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Maintenance Alerts
          </p>

          <h2 className="mt-1 text-4xl font-bold text-slate-900">
            0
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Vehicles need attention
          </p>
        </div>

      </div>

      {/* Lower Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Recent Inspection */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Inspection
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest vehicle inspection result
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              PASSED
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Vehicle
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  GJ01AB1234
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500">
                  Score
                </p>

                <p className="mt-1 text-2xl font-bold text-green-600">
                  0%
                </p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[92%] rounded-full bg-green-500" />
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-slate-500">
                Inspection Date
              </span>

              <span className="font-medium text-slate-700">
                04 Sep 2026
              </span>
            </div>
          </div>
        </section>

        {/* AI Insight */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <InsightCard />
        </section>

      </div>

      {/* Maintenance Alert */}
      <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-50 p-3 text-xl">
            ⚠️
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recent Maintenance Alert
            </h2>

            <p className="text-sm text-slate-500">
              Vehicle requiring immediate attention
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-red-100 bg-red-50/50 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-slate-500">
                Vehicle
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                GJ01AB1234
              </p>

              <p className="mt-2 text-slate-600">
                Brake and tyre condition require attention.
              </p>
            </div>

            <span className="w-fit rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
              HIGH PRIORITY
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}