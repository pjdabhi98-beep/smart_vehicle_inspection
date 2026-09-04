"use client";

import { useEffect, useState } from "react";

type Inspection = {
  id: number;
  vehicle_id: [number, string] | false;
  inspection_date: string;
  fuel_level: string;
  tyre_condition: string;
  brake_condition: string;
  engine_condition: string;
  overall_status: string;
  remarks: string | false;
};

export default function MaintenancePage() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inspection")
      .then((res) => res.json())
      .then((data) => {
        setInspections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Maintenance error:", error);
        setLoading(false);
      });
  }, []);

  const maintenanceRecords = inspections.filter(
    (item) =>
      item.overall_status === "maintenance" ||
      item.overall_status === "critical"
  );

  const critical = inspections.filter(
    (item) => item.overall_status === "critical"
  ).length;

  const medium = inspections.filter(
    (item) => item.overall_status === "maintenance"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold text-red-600">
            AI MAINTENANCE
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Maintenance
          </h1>

          <p className="mt-2 text-slate-600">
            Maintenance requirements detected from vehicle inspections.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Maintenance Required
            </p>

            <p className="mt-2 text-4xl font-bold text-orange-600">
              {loading ? "..." : maintenanceRecords.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Critical
            </p>

            <p className="mt-2 text-4xl font-bold text-red-600">
              {loading ? "..." : critical}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Medium Priority
            </p>

            <p className="mt-2 text-4xl font-bold text-yellow-600">
              {loading ? "..." : medium}
            </p>
          </div>

        </div>

        {/* Maintenance Records */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Maintenance Alerts
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Vehicles requiring attention based on AI analysis.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-600">
              Loading maintenance records...
            </div>
          ) : maintenanceRecords.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl">✓</div>

              <p className="mt-3 font-semibold text-slate-900">
                No maintenance required
              </p>

              <p className="mt-1 text-sm text-slate-600">
                All inspected vehicles are currently safe.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-slate-50">
                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Tyres
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Brakes
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Engine
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Priority
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Remarks
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {maintenanceRecords.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-slate-200 hover:bg-slate-50"
                    >

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {item.vehicle_id
                          ? item.vehicle_id[1]
                          : "Unknown Vehicle"}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {item.inspection_date}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-700">
                        {item.tyre_condition}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-700">
                        {item.brake_condition}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-700">
                        {item.engine_condition}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-bold ${
                            item.overall_status === "critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.overall_status === "critical"
                            ? "HIGH"
                            : "MEDIUM"}
                        </span>

                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        {item.remarks || "No remarks"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}