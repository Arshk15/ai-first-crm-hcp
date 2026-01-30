from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langgraph_agent import agent

app = FastAPI()

# ✅ CORS (required for React frontend on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/log-interaction")
def log_interaction(payload: dict):
    return agent.invoke({
        "action": "log",
        "text": payload["text"]
    })

@app.post("/edit-interaction")
def edit_interaction(payload: dict):
    return agent.invoke({
        "action": "edit",
        "text": payload.get("text")
    })

@app.get("/fetch-hcp")
def fetch_hcp():
    return agent.invoke({"action": "fetch"})

@app.post("/recommend-followup")
def recommend():
    return agent.invoke({"action": "recommend"})
