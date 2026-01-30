from db import conn, cursor

def log_interaction(state):
    text = state["text"]
    cursor.execute(
        "INSERT INTO interactions (text) VALUES (?)", (text,)
    )
    conn.commit()
    return {"result": {"status": "logged", "text": text}}
