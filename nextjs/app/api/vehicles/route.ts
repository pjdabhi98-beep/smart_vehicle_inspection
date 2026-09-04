import { NextResponse } from "next/server";

const ODOO_URL = process.env.ODOO_URL!;
const ODOO_DB = process.env.ODOO_DB!;
const ODOO_USERNAME = process.env.ODOO_USERNAME!;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD!;

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

export async function GET() {
  try {
    // Login to Odoo
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
      return NextResponse.json(
        { error: "Odoo login failed" },
        { status: 401 }
      );
    }

    // Get vehicles
    const vehicles = await odooRequest(
      "object",
      "execute_kw",
      [
        ODOO_DB,
        uid,
        ODOO_PASSWORD,
        "smart.vehicle",
        "search_read",
        [[]],
        {
          fields: [
            "id",
            "name",
            "registration_no",
            "active",
          ],
        },
      ]
    );

    return NextResponse.json(vehicles);

  } catch (error) {
    console.error("Odoo Vehicle Error:", error);

    return NextResponse.json(
      {
        error: "Could not connect to Odoo",
        details: String(error),
      },
      { status: 500 }
    );
  }
}