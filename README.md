# AI-First CRM for HCP Interactions (Task 1)

## Overview

This project is a **minimal AI-first CRM prototype** built to demonstrate how an AI agent (LangGraph) can be integrated into a real backend workflow and exposed via APIs, with a simple React frontend.

The goal of Task 1 is **not UI polish or model accuracy**, but to clearly show:

* LangGraph agent orchestration
* Tool routing and execution
* Backend API integration
* End-to-end flow from frontend → backend → agent → database

---

## Tech Stack

### Frontend

* React (Create React App)
* Single screen: AI Chat → Auto-fill Form → Submit

### Backend

* FastAPI
* LangGraph (single agent)
* SQLite (lightweight persistence)

### Database

* SQLite (`crm.db`)
* Table: `interactions`

---

## Project Structure

```
ai-first-crm-hcp/
│
├── frontend/
│   └── react-app/
│       └── src/App.js
│
├── backend/
│   ├── main.py
│   ├── langgraph_agent.py
│   ├── db.py
│   ├── crm.db
│   └── tools/
│       ├── log_interaction.py
│       ├── edit_interaction.py
│       ├── fetch_hcp.py
│       ├── summarize.py
│       └── recommend_followup.py
│
└── README.md
```

---

## Key Features

### 1. AI Chat → Auto-fill Form

* User enters unstructured interaction notes in the **AI Assistant** textbox
* System simulates AI extraction and auto-fills structured form fields
* User can review/edit before submitting

### 2. LangGraph Agent (Core Requirement)

* Single LangGraph agent
* 5 registered tools
* Conditional routing based on action

### 3. Tools Implemented

| Tool                 | Purpose                       |
| -------------------- | ----------------------------- |
| LogInteraction       | Stores interaction text in DB |
| EditInteraction      | Dummy update of interaction   |
| FetchHCPProfile      | Returns mock HCP data         |
| SummarizeInteraction | Returns a simple summary      |
| RecommendFollowUp    | Suggests next action          |

> Note: Tool logic is intentionally simple to focus on orchestration rather than NLP accuracy.

---

## API Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| POST   | /log-interaction    | Logs an interaction via LangGraph |
| POST   | /edit-interaction   | Edits an existing interaction     |
| GET    | /fetch-hcp          | Fetches mock HCP profile          |
| POST   | /recommend-followup | AI-based follow-up suggestion     |

---

## Running the Project

### Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

Swagger UI:

```
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd frontend/react-app
npm start
```

Frontend URL:

```
http://localhost:3000
```

---

## Database

* SQLite file: `backend/crm.db`
* Data is persisted in table `interactions`
* Can be viewed using **DB Browser for SQLite**

---

## What I Understood from Task 1

This task tested my ability to integrate **AI agents into real backend workflows**, rather than focusing on UI design or model accuracy.

I prioritized:

* Clear LangGraph routing
* Tool visibility and execution
* Explainable, minimal architecture

The frontend intentionally represents the **AI Assistant interaction flow**, which can later be connected to a richer CRM UI.

---

## Future Enhancements (Out of Scope for Task 1)

* Real NLP-based entity extraction
* Role-based access control
* Advanced analytics and dashboards
* Production-grade database (PostgreSQL)

---

## Author

**Arshpreet Kaur**

---

## Demo

A 10–15 minute walkthrough video is provided separately as per submission instructions.
