type Vehicle = {
  id: number;
  registration: string;
  model: string;
  driver: string;
  status: string;
};

const vehicles: Vehicle[] = [];

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            FLEET MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Vehicles
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all registered vehicles in your fleet.
          </p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          + Add Vehicle
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Vehicles
            </p>

            <span className="rounded-lg bg-blue-50 p-2 text-lg">
              🚗
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            0
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Registered vehicles
          </p>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Active Vehicles
            </p>

            <span className="rounded-lg bg-green-50 p-2 text-lg">
              ✓
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-600">
            0
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Currently operational
          </p>
        </div>

        {/* Maintenance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Maintenance
            </p>

            <span className="rounded-lg bg-yellow-50 p-2 text-lg">
              🔧
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-yellow-600">
            0
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Currently in maintenance
          </p>
        </div>

      </div>

      {/* Vehicle Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">
            Vehicle Fleet
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            All registered vehicles and their current status.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Registration
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Model
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Driver
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >

                  {/* Registration */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-50 p-2 text-lg">
                        🚗
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {vehicle.registration}
                        </p>

                        <p className="text-xs text-slate-400">
                          Vehicle ID #{vehicle.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Model */}
                  <td className="px-6 py-5">
                    <p className="font-medium text-slate-700">
                      {vehicle.model}
                    </p>
                  </td>

                  {/* Driver */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                        {vehicle.driver.charAt(0)}
                      </div>

                      <span className="font-medium text-slate-700">
                        {vehicle.driver}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        vehicle.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />

                      {vehicle.status}
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