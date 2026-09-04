"use client";

import { useState } from "react";

export default function InspectionForm() {
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [fuel, setFuel] = useState("");
  const [tyres, setTyres] = useState("");
  const [brakes, setBrakes] = useState("");
  const [engine, setEngine] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Inspection submitted successfully!");

    setVehicle("");
    setDate("");
    setFuel("");
    setTyres("");
    setBrakes("");
    setEngine("");
    setRemarks("");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600">
            INSPECTION MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            New Vehicle Inspection
          </h1>

          <p className="mt-2 text-slate-500">
            Record the condition of the vehicle and submit the inspection.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Vehicle Information */}
          <div className="border-b border-slate-200 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-xl">
                🚗
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Vehicle Information
                </h2>

                <p className="text-sm text-slate-500">
                  Select the vehicle and inspection date.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Vehicle */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Vehicle
                </label>

                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select vehicle</option>
                  <option value="GJ01AB1234">
                    GJ01AB1234 - Tata Prima
                  </option>
                  <option value="GJ05CD5678">
                    GJ05CD5678 - Ashok Leyland
                  </option>
                  <option value="GJ03EF9012">
                    GJ03EF9012 - Mahindra Blazo
                  </option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Inspection Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>

          {/* Vehicle Condition */}
          <div className="border-b border-slate-200 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-3 text-xl">
                🔧
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Vehicle Condition
                </h2>

                <p className="text-sm text-slate-500">
                  Rate the condition of the major vehicle components.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Fuel */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fuel Level
                </label>

                <input
                  type="text"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="Example: 75%"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Tyres */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tyres
                </label>

                <select
                  value={tyres}
                  onChange={(e) => setTyres(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select condition</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              {/* Brakes */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Brakes
                </label>

                <select
                  value={brakes}
                  onChange={(e) => setBrakes(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select condition</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              {/* Engine */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Engine
                </label>

                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select condition</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

            </div>
          </div>

          {/* Remarks */}
          <div className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-xl">
                📝
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Additional Remarks
                </h2>

                <p className="text-sm text-slate-500">
                  Add any additional observations from the inspection.
                </p>
              </div>
            </div>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={5}
              placeholder="Enter inspection remarks..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => {
                setVehicle("");
                setDate("");
                setFuel("");
                setTyres("");
                setBrakes("");
                setEngine("");
                setRemarks("");
              }}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              ✓ Submit Inspection
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}