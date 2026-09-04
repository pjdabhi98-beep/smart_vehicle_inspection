"use client";

import { useEffect, useState } from "react";

type Vehicle = {
  id: number;
  name: string;
  registration_no: string;
  active: boolean;
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Vehicle error:", error);
        setLoading(false);
      });
  }, []);

  const activeVehicles = vehicles.filter((v) => v.active).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-bold text-blue-600">
            FLEET MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Vehicles
          </h1>

          <p className="mt-2 text-slate-600">
            Real vehicle information from Odoo.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Total Vehicles
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {loading ? "..." : vehicles.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-600">
              Active Vehicles
            </p>

            <p className="mt-2 text-4xl font-bold text-green-600">
              {loading ? "..." : activeVehicles}
            </p>
          </div>

        </div>

        {/* Vehicle Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Vehicle List
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Vehicles currently registered in Odoo.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-600">
              Loading vehicles...
            </div>
          ) : vehicles.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold text-slate-900">
                No vehicles found
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Add vehicles in Odoo first.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Vehicle Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Registration Number
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-t border-slate-200 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-slate-700">
                        #{vehicle.id}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {vehicle.name}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {vehicle.registration_no}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            vehicle.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {vehicle.active ? "Active" : "Inactive"}
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