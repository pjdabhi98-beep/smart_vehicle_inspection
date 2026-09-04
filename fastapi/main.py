from fastapi import FastAPI

app = FastAPI(title="Smart Vehicle AI")


@app.get("/")
def home():
    return {
        "message": "Smart Vehicle AI Service is running"
    }


@app.post("/analyze")
def analyze_vehicle(data: dict):

    tyre = data.get("tyres")
    brakes = data.get("brakes")
    engine = data.get("engine")

    problems = []

    if tyre == "poor":
        problems.append("Tyre condition is poor")

    if brakes == "poor":
        problems.append("Brake condition is poor")

    if engine == "poor":
        problems.append("Engine condition is poor")

    if len(problems) >= 2:
        priority = "HIGH"
        insight = "Vehicle requires immediate maintenance."

    elif len(problems) == 1:
        priority = "MEDIUM"
        insight = "Vehicle should be inspected soon."

    else:
        priority = "LOW"
        insight = "Vehicle condition looks good."

    return {
        "priority": priority,
        "insight": insight,
        "problems": problems
    }