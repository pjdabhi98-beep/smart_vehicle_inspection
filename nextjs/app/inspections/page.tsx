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

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const response = await fetch("/api/inspection");

      if (!response.ok) {
        throw new Error("Failed to load inspections");
      }

      const data = await response.json();

      setInspections(data);
    } catch (error) {
      console.error("Inspection loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Counters
  const totalInspections = inspections.length;

  const passedInspections = inspections.filter(
    (inspection) =>
      inspection.overall_status === "safe"
  ).length;

  const maintenanceInspections = inspections.filter(
    (inspection) =>
      inspection.overall_status === "maintenance" ||
      inspection.overall_status === "critical"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              INSPECTION MANAGEMENT
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Vehicle Inspections
            </h1>

            <p className="mt-2 text-slate-600">
              View and manage vehicle inspection records.
            </p>
          </div>

          <a
            href="/inspections/new"
            className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + Add Inspection
          </a>

        </div>

        {/* Statistics */}

        <div className="mb-8 grid gap-5 md:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Inspections
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {loading ? "..." : totalInspections}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-xl">
                🔍
              </div>

            </div>

          </div>

          {/* Passed */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Passed
                </p>

                <p className="mt-3 text-3xl font-bold text-green-600">
                  {loading ? "..." : passedInspections}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-xl">
                ✓
              </div>

            </div>

          </div>

          {/* Maintenance */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Needs Maintenance
                </p>

                <p className="mt-3 text-3xl font-bold text-red-600">
                  {loading ? "..." : maintenanceInspections}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-xl">
                ⚠️
              </div>

            </div>

          </div>

        </div>

        {/* Inspection Records */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Inspection Records
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Latest vehicle inspection results from Odoo.
            </p>

          </div>

          {loading ? (

            <div className="p-8 text-center text-slate-600">
              Loading inspection records...
            </div>

          ) : inspections.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-4xl">
                📋
              </div>

              <p className="mt-3 font-semibold text-slate-900">
                No inspections found
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Add an inspection to see it here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Inspection Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Fuel
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Tyres
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Brakes
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Engine
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-200">

                  {inspections.map((inspection) => (

                    <tr
                      key={inspection.id}
                      className="hover:bg-slate-50"
                    >

                      {/* Vehicle */}

                      <td className="px-6 py-4 font-semibold text-slate-900">

                        {inspection.vehicle_id
                          ? inspection.vehicle_id[1]
                          : "Unknown Vehicle"}

                      </td>

                      {/* Date */}

                      <td className="px-6 py-4 text-slate-700">
                        {inspection.inspection_date}
                      </td>

                      {/* Fuel */}

                      <td className="px-6 py-4 text-slate-700">
                        {inspection.fuel_level}
                      </td>

                      {/* Tyres */}

                      <td className="px-6 py-4">

                        <span
                          className={
                            inspection.tyre_condition === "poor"
                              ? "font-semibold text-red-600"
                              : "text-slate-700"
                          }
                        >
                          {inspection.tyre_condition}
                        </span>

                      </td>

                      {/* Brakes */}

                      <td className="px-6 py-4">

                        <span
                          className={
                            inspection.brake_condition === "poor"
                              ? "font-semibold text-red-600"
                              : "text-slate-700"
                          }
                        >
                          {inspection.brake_condition}
                        </span>

                      </td>

                      {/* Engine */}

                      <td className="px-6 py-4">

                        <span
                          className={
                            inspection.engine_condition === "poor"
                              ? "font-semibold text-red-600"
                              : "text-slate-700"
                          }
                        >
                          {inspection.engine_condition}
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            inspection.overall_status === "safe"
                              ? "bg-green-100 text-green-800"
                              : inspection.overall_status === "maintenance"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {inspection.overall_status === "safe"
                            ? "Safe"
                            : inspection.overall_status === "maintenance"
                            ? "Maintenance"
                            : "Critical"}
                        </span>

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