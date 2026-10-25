import unittest
from app import app

class QuizServiceTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["status"], "UP")

    def test_questions_do_not_expose_answers(self):
        response = self.client.get("/api/questions")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json) > 0)
        self.assertNotIn("answer", response.json[0])

    def test_submit_correct_answer(self):
        response = self.client.post(
            "/api/submit",
            json={"questionId": 1, "answer": "extends"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json["correct"])

if __name__ == "__main__":
    unittest.main()
