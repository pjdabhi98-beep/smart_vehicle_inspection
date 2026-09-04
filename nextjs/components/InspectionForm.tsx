"use client";

import { useEffect, useState } from "react";

type Vehicle = {
  id: number;
  name: string;
  registration_no: string;
  active: boolean;
};

type AIResult = {
  priority: string;
  insight: string;
  problems: string[];
};

export default function InspectionForm() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [fuel, setFuel] = useState("");
  const [tyres, setTyres] = useState("");
  const [brakes, setBrakes] = useState("");
  const [engine, setEngine] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<AIResult | null>(null);

  // --------------------------------
  // Load REAL vehicles from Odoo
  // --------------------------------

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");

        if (!response.ok) {
          throw new Error("Could not load vehicles");
        }

        const data = await response.json();

        setVehicles(data);

      } catch (error) {
        console.error("Vehicle loading error:", error);
        alert("Could not load vehicles from Odoo.");
      } finally {
        setLoadingVehicles(false);
      }
    };

    loadVehicles();
  }, []);

  // --------------------------------
  // Submit inspection
  // --------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/inspection", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          vehicle_id: vehicleId,
          inspection_date: date,
          fuel,
          tyres,
          brakes,
          engine,
          remarks,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Inspection failed");
      }

      setResult(data.ai);

      alert(
        "Inspection saved successfully!\n\n" +
        `AI Priority: ${data.ai.priority}\n` +
        `${data.ai.insight}`
      );

      // Clear form
      setVehicleId("");
      setDate("");
      setFuel("");
      setTyres("");
      setBrakes("");
      setEngine("");
      setRemarks("");

    } catch (error) {
      console.error("Inspection error:", error);

      alert(
        "Inspection failed.\n\n" +
        String(error)
      );

    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Clear form
  // --------------------------------

  const clearForm = () => {
    setVehicleId("");
    setDate("");
    setFuel("");
    setTyres("");
    setBrakes("");
    setEngine("");
    setRemarks("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-6">

          <p className="text-sm font-semibold text-blue-600">
            INSPECTION MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            New Vehicle Inspection
          </h1>

          <p className="mt-2 text-slate-600">
            Record vehicle condition and get AI maintenance analysis.
          </p>

        </div>

        {/* Form */}

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

                <p className="text-sm text-slate-600">
                  Select a vehicle from Odoo.
                </p>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Vehicle */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Vehicle
                </label>

                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                  disabled={loadingVehicles}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >

                  <option value="">
                    {loadingVehicles
                      ? "Loading vehicles..."
                      : vehicles.length === 0
                      ? "No vehicles found in Odoo"
                      : "Select vehicle"}
                  </option>

                  {vehicles.map((vehicle) => (
                    <option
                      key={vehicle.id}
                      value={vehicle.id}
                    >
                      {vehicle.name} - {vehicle.registration_no}
                    </option>
                  ))}

                </select>

              </div>

              {/* Date */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Inspection Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                <p className="text-sm text-slate-600">
                  Select the current condition.
                </p>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Fuel */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Fuel Level
                </label>

                <input
                  type="text"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="Example: 50%"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Tyres */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Tyres
                </label>

                <select
                  value={tyres}
                  onChange={(e) => setTyres(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
                >

                  <option value="">
                    Select condition
                  </option>

                  <option value="good">
                    Good
                  </option>

                  <option value="average">
                    Average
                  </option>

                  <option value="poor">
                    Poor
                  </option>

                </select>

              </div>

              {/* Brakes */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Brakes
                </label>

                <select
                  value={brakes}
                  onChange={(e) => setBrakes(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
                >

                  <option value="">
                    Select condition
                  </option>

                  <option value="good">
                    Good
                  </option>

                  <option value="average">
                    Average
                  </option>

                  <option value="poor">
                    Poor
                  </option>

                </select>

              </div>

              {/* Engine */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Engine
                </label>

                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"
                >

                  <option value="">
                    Select condition
                  </option>

                  <option value="good">
                    Good
                  </option>

                  <option value="average">
                    Average
                  </option>

                  <option value="poor">
                    Poor
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Remarks */}

          <div className="p-6 md:p-8">

            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Additional Remarks
            </label>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={5}
              placeholder="Enter inspection remarks..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={clearForm}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={loading || loadingVehicles}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving & Analyzing..."
                : "✓ Submit Inspection"}
            </button>

          </div>

        </form>

        {/* AI Result */}

        {result && (

          <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-bold text-slate-900">
              🤖 AI Inspection Result
            </h2>

            <div className="mb-4 rounded-xl bg-slate-100 p-4">

              <p className="text-sm font-semibold text-slate-600">
                Maintenance Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {result.priority}
              </p>

            </div>

            <div className="mb-4">

              <p className="text-sm font-semibold text-slate-600">
                AI Insight
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {result.insight}
              </p>

            </div>

            {result.problems.length > 0 && (

              <div>

                <p className="text-sm font-semibold text-slate-600">
                  Problems Detected
                </p>

                <ul className="mt-2 list-disc pl-5 text-slate-900">

                  {result.problems.map(
                    (problem, index) => (
                      <li key={index}>
                        {problem}
                      </li>
                    )
                  )}

                </ul>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}