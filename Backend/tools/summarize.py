def summarize_interaction(state):
    text = state["text"]
    return {"result": {"summary": f"Summary of: {text}"}}
