# DevPath — Programming Learning and Placement Preparation Portal

DevPath is a student-focused portal for programming courses, coding practice, quizzes, and placement preparation. This starter project demonstrates the DevOps syllabus using Git, GitHub, Jenkins, Maven, Spring Boot, Flask, Docker, and Kubernetes.

## Architecture
- `frontend/`: responsive React dashboard, served by Nginx.
- `quiz-service/`: Python Flask quiz API.
- `Dockerfile` files: container images for both services.
- `docker-compose.yml`: local multi-container development.
- `Jenkinsfile`: declarative CI/CD pipeline.
- `jenkins/`: scripted pipeline example and Freestyle job instructions.
- `k8s/`: Kubernetes Deployments and Services.
- `docs/`: project and lab guide.

> This is a runnable starter/MVP, not a production-ready platform. Authentication, persistent database storage, real code execution sandboxing, and production secrets management should be added before public deployment.

## Requirements
- JDK 17+
- Maven 3.9+ (or use Maven Wrapper when added)
- Python 3.11+
- Docker Desktop
- Git and a GitHub account
- Jenkins (optional for local development)
- Minikube or another Kubernetes cluster for Module 9

## Run locally without Docker
### Spring Boot
```bash
cd backend
mvn spring-boot:run
```
Open `http://localhost:8080/api/health` and `http://localhost:8080/api/courses`.

### Flask
```bash
cd quiz-service
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Open `http://localhost:5000/health` and `http://localhost:5000/api/questions`.

## Run with Docker Compose
From the project root:
```bash
docker compose up --build
```
- DevPath web portal: http://localhost:3000
- Spring Boot API: http://localhost:8081
- Flask quiz API: http://localhost:5001

Stop:
```bash
docker compose down
```

## Git/GitHub workflow (Modules 1–2)
```bash
git init
git add .
git commit -m "Initial DevPath project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/DevPath.git
git push -u origin main
```
Replace the URL with your own GitHub repository URL. Never commit passwords, access tokens, or secret keys.

## Jenkins setup (Modules 3–5)
1. Install Jenkins and ensure Git, JDK 17, Maven, Docker and Python are available to the Jenkins agent.
2. Create a Freestyle job called `DevPath-Backend-Build`: configure source control with the GitHub repository and add build step `Execute shell` (Linux agent) or `Execute Windows batch command` (Windows agent). Run `cd backend && mvn test package`.
3. Create `DevPath-Quiz-Test`: run `cd quiz-service && pip install -r requirements.txt && python -m unittest discover -s tests`.
4. Create `DevPath-Pipeline` as a Pipeline job, select “Pipeline script from SCM”, choose Git, and set script path to `Jenkinsfile`.
5. For upstream/downstream demonstration, configure `DevPath-Backend-Build` to trigger `DevPath-Pipeline` after a successful build, or use the Build Pipeline plugin to visualize the chain. Avoid creating circular triggers.
6. Docker build/push stages require a Docker-capable Jenkins agent and credentials configured in Jenkins Credentials. Do not hard-code registry credentials.

## Kubernetes (Module 9)
Build images and make them available to the cluster. For Minikube, one option is:
```bash
minikube start
minikube image build -t devpath-backend:1.0 ./backend
minikube image build -t devpath-quiz:1.0 ./quiz-service
kubectl apply -f k8s/
kubectl get deployments
kubectl get pods
kubectl get services
```
The manifests use `imagePullPolicy: IfNotPresent`, so locally built Minikube images can be used. For a remote cluster, push images to a registry and update image names in `k8s/`.

Get the backend service URL on Minikube:
```bash
minikube service devpath-backend --url
```
The Kubernetes manifests use NodePort for a simple lab demonstration. Production deployments should use an Ingress or cloud load balancer, resource limits, probes, secrets, and a proper persistent database.

## Suggested demo order
1. Show the portal APIs running.
2. Commit a small code change and push to GitHub.
3. Run a Jenkins Freestyle job.
4. Run the declarative Jenkinsfile pipeline.
5. Build Docker images and run with Compose.
6. Deploy to Kubernetes and show `kubectl get pods`.
7. Explain how each stage maps to the syllabus modules.


## Student learning experience (updated)
- First visit opens a demo student sign-in screen. Enter a name and email to create a local browser profile; this is a demonstration sign-in, not production authentication.
- Each of the five learning tracks includes 10 lessons with a written explanation, code/example, and a question.
- A lesson can be marked complete after its question is answered correctly. Finishing all 10 lessons displays **Course Completed!** and updates course status.
- Student profile shows completed lessons, completed courses, quiz activity, and per-course progress.
- Student profile, quiz results, course completion, and lesson completion are saved in browser local storage on that device/browser.
- The interface uses a light, responsive design with accessible contrast and clearer cards.

### Rebuild after replacing the project
From the folder containing `docker-compose.yml`:
```bash
docker compose down
docker compose up --build -d
```
Then open `http://localhost:3000`.
