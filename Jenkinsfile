pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test Spring Boot') {
            steps {
                dir('backend') {
                    sh 'mvn -B clean test package'
                }
            }
        }

        stage('Test Flask Service') {
            steps {
                dir('quiz-service') {
                    sh 'python3 -m pip install -r requirements.txt'
                    sh 'python3 -m unittest discover -s tests -v'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t devpath-backend:${BUILD_NUMBER} ./backend'
                sh 'docker build -t devpath-quiz:${BUILD_NUMBER} ./quiz-service'
                sh 'docker build -t devpath-frontend:${BUILD_NUMBER} ./frontend'
            }
        }
    }

    post {
        success {
            echo 'DevPath build and tests completed successfully.'
        }
        failure {
            echo 'DevPath pipeline failed. Review the stage logs.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
