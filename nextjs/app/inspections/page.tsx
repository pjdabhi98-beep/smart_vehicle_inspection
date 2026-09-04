type Inspection = {
  id: number;
  vehicle: string;
  date: string;
  inspector: string;
  status: string;
  score: string;
};

const inspections: Inspection[] = [];

export default function InspectionsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            INSPECTION MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Vehicle Inspections
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage vehicle inspection records.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          + Add Inspection
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Inspections
            </p>

            <span className="rounded-lg bg-blue-50 p-2 text-lg">
              🔍
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Passed
            </p>

            <span className="rounded-lg bg-green-50 p-2 text-lg">
              ✓
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-600">
            0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Needs Maintenance
            </p>

            <span className="rounded-lg bg-red-50 p-2 text-lg">
              ⚠️
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-red-600">
            0
          </p>
        </div>

      </div>

      {/* Inspection Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">
            Inspection Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest vehicle inspection results.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vehicle
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Inspection Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Inspector
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {inspections.map((inspection) => (
                <tr
                  key={inspection.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Vehicle */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-50 p-2">
                        🚗
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {inspection.vehicle}
                        </p>

                        <p className="text-xs text-slate-400">
                          Vehicle ID #{inspection.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-sm text-slate-600">
                    {inspection.date}
                  </td>

                  {/* Inspector */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                        A
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {inspection.inspector}
                      </span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-bold ${
                          inspection.status === "Passed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {inspection.score}
                      </span>

                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            inspection.status === "Passed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: inspection.score,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        inspection.status === "Passed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {inspection.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </main>
  );
}