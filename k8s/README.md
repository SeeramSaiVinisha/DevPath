# Kubernetes lab notes

For Minikube:
```bash
minikube start
minikube image build -t devpath-backend:1.0 ./backend
minikube image build -t devpath-quiz:1.0 ./quiz-service
kubectl apply -f k8s/
kubectl get deployments,pods,services
minikube service devpath-backend --url
minikube service devpath-quiz --url
```

Troubleshooting:
```bash
kubectl describe pod <pod-name>
kubectl logs deployment/devpath-backend
kubectl logs deployment/devpath-quiz
kubectl rollout status deployment/devpath-backend
kubectl rollout restart deployment/devpath-backend
```
For a remote cluster, push the images to a registry, update the image names, and configure image pull credentials if the registry is private.
