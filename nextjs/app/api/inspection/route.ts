import { NextResponse } from "next/server";

const ODOO_URL = process.env.ODOO_URL!;
const ODOO_DB = process.env.ODOO_DB!;
const ODOO_USERNAME = process.env.ODOO_USERNAME!;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD!;

const FASTAPI_URL =
  process.env.FASTAPI_URL || "http://127.0.0.1:8000";

async function odooRequest(
  service: string,
  method: string,
  args: any[]
) {
  const response = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        service,
        method,
        args,
      },
      id: Date.now(),
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data.result;
}

/* =========================================
   GET - Load inspections from Odoo
========================================= */

export async function GET() {
  try {
    const uid = await odooRequest(
      "common",
      "authenticate",
      [
        ODOO_DB,
        ODOO_USERNAME,
        ODOO_PASSWORD,
        {},
      ]
    );

    if (!uid) {
      throw new Error("Odoo authentication failed");
    }

    const inspections = await odooRequest(
      "object",
      "execute_kw",
      [
        ODOO_DB,
        uid,
        ODOO_PASSWORD,
        "smart.vehicle.inspection",
        "search_read",
        [[]],
        {
          fields: [
            "id",
            "vehicle_id",
            "inspection_date",
            "fuel_level",
            "tyre_condition",
            "brake_condition",
            "engine_condition",
            "overall_status",
            "remarks",
          ],
          order: "inspection_date desc",
        },
      ]
    );

    return NextResponse.json(inspections);

  } catch (error) {
    console.error("Odoo Inspection GET Error:", error);

    return NextResponse.json(
      {
        error: "Could not load inspections from Odoo",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

/* =========================================
   POST - Save inspection + AI analysis
========================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      vehicle_id,
      inspection_date,
      fuel,
      tyres,
      brakes,
      engine,
      remarks,
    } = body;

    // -----------------------------
    // 1. AI analysis
    // -----------------------------

    const aiResponse = await fetch(
      `${FASTAPI_URL}/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fuel,
          tyres,
          brakes,
          engine,
        }),
      }
    );

    if (!aiResponse.ok) {
      throw new Error("FastAPI AI service failed");
    }

    const aiResult = await aiResponse.json();

    // -----------------------------
    // 2. Convert AI priority
    // -----------------------------

    let overall_status = "safe";

    if (aiResult.priority === "HIGH") {
      overall_status = "critical";
    } else if (aiResult.priority === "MEDIUM") {
      overall_status = "maintenance";
    }

    // -----------------------------
    // 3. Convert fuel
    // -----------------------------

    let fuel_level = "low";

    const fuelNumber = parseInt(
      String(fuel).replace("%", ""),
      10
    );

    if (!isNaN(fuelNumber)) {
      if (fuelNumber >= 70) {
        fuel_level = "high";
      } else if (fuelNumber >= 30) {
        fuel_level = "medium";
      }
    }

    // -----------------------------
    // 4. Login to Odoo
    // -----------------------------

    const uid = await odooRequest(
      "common",
      "authenticate",
      [
        ODOO_DB,
        ODOO_USERNAME,
        ODOO_PASSWORD,
        {},
      ]
    );

    if (!uid) {
      throw new Error("Odoo authentication failed");
    }

    // -----------------------------
    // 5. Save inspection
    // -----------------------------

    const inspectionId = await odooRequest(
      "object",
      "execute_kw",
      [
        ODOO_DB,
        uid,
        ODOO_PASSWORD,
        "smart.vehicle.inspection",
        "create",
        [
          {
            vehicle_id: Number(vehicle_id),
            inspection_date,
            fuel_level,
            tyre_condition: tyres,
            brake_condition: brakes,
            engine_condition: engine,
            overall_status,
            remarks,
          },
        ],
      ]
    );

    // -----------------------------
    // 6. Return result
    // -----------------------------

    return NextResponse.json({
      success: true,
      inspection_id: inspectionId,
      ai: aiResult,
      overall_status,
    });

  } catch (error) {
    console.error("Inspection POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}