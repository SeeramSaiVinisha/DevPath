from flask import Flask, jsonify, request

app = Flask(__name__)

QUESTIONS = [
    {
        "id": 1,
        "topic": "Java",
        "question": "Which keyword is used to inherit a class in Java?",
        "options": ["implements", "extends", "inherits", "instanceof"],
        "answer": "extends",
        "explanation": "The extends keyword creates a class-to-class inheritance relationship."
    },
    {
        "id": 2,
        "topic": "Data Structures",
        "question": "Which data structure follows FIFO?",
        "options": ["Stack", "Queue", "Tree", "Graph"],
        "answer": "Queue",
        "explanation": "FIFO means First In, First Out."
    },
    {
        "id": 3,
        "topic": "DevOps",
        "question": "Which tool automates CI/CD pipelines in this project?",
        "options": ["Jenkins", "Notepad", "Paint", "Calculator"],
        "answer": "Jenkins",
        "explanation": "Jenkins automates build, test, and deployment workflows."
    }
]

@app.get("/health")
def health():
    return jsonify(status="UP", service="DevPath Quiz Service")

@app.get("/api/questions")
def questions():
    topic = request.args.get("topic")
    result = QUESTIONS if not topic else [
        q for q in QUESTIONS if q["topic"].lower() == topic.lower()
    ]
    # Never return answer keys in the question listing.
    public = [{k: v for k, v in q.items() if k not in ("answer", "explanation")}
              for q in result]
    return jsonify(public)

@app.post("/api/submit")
def submit():
    payload = request.get_json(silent=True) or {}
    question_id = payload.get("questionId")
    selected = payload.get("answer")
    question = next((q for q in QUESTIONS if q["id"] == question_id), None)
    if question is None:
        return jsonify(error="Unknown questionId"), 404
    correct = selected == question["answer"]
    return jsonify(
        questionId=question_id,
        correct=correct,
        explanation=question["explanation"]
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
