"use client";

import { useEffect, useState } from "react";

type Inspection = {
  id: number;
  vehicle_id: [number, string];
  inspection_date: string;
  fuel_level: string;
  tyre_condition: string;
  brake_condition: string;
  engine_condition: string;
  overall_status: string;
  remarks: string;
};

export default function Dashboard() {
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
        console.error("Dashboard error:", error);
        setLoading(false);
      });
  }, []);

  const total = inspections.length;

  const passed = inspections.filter(
    (item) => item.overall_status === "safe"
  ).length;

  const maintenance = inspections.filter(
    (item) =>
      item.overall_status === "maintenance" ||
      item.overall_status === "critical"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            SMART VEHICLE INSPECTION
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Real-time vehicle inspection summary.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Total Inspections
            </p>

            <p className="mt-3 text-4xl font-bold text-slate-900">
              {total}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Passed
            </p>

            <p className="mt-3 text-4xl font-bold text-green-600">
              {passed}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Needs Maintenance
            </p>

            <p className="mt-3 text-4xl font-bold text-red-600">
              {maintenance}
            </p>
          </div>

        </div>

        {/* Recent Inspections */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Inspections
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Latest inspection records from Odoo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Engine
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {inspections.slice(0, 5).map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {item.vehicle_id?.[1] || "Unknown"}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {item.inspection_date}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-700">
                        {item.engine_condition}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          item.overall_status === "safe"
                            ? "bg-green-100 text-green-700"
                            : item.overall_status === "maintenance"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.overall_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}