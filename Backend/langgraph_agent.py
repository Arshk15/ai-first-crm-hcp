from langgraph.graph import StateGraph
from typing import TypedDict, Optional

from tools.log_interaction import log_interaction
from tools.edit_interaction import edit_interaction
from tools.fetch_hcp import fetch_hcp
from tools.summarize import summarize_interaction
from tools.recommend_followup import recommend_followup


class AgentState(TypedDict):
    action: str
    text: Optional[str]
    result: Optional[dict]


def router(state: AgentState):
    return state["action"]


graph = StateGraph(AgentState)

graph.add_node("log", log_interaction)
graph.add_node("edit", edit_interaction)
graph.add_node("fetch", fetch_hcp)
graph.add_node("summarize", summarize_interaction)
graph.add_node("recommend", recommend_followup)

graph.set_conditional_entry_point(
    router,
    {
        "log": "log",
        "edit": "edit",
        "fetch": "fetch",
        "summarize": "summarize",
        "recommend": "recommend",
    },
)

graph.set_finish_point("log")
graph.set_finish_point("edit")
graph.set_finish_point("fetch")
graph.set_finish_point("summarize")
graph.set_finish_point("recommend")

agent = graph.compile()
