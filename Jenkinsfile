pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Tools') {
            steps {
                bat 'git --version'
                bat 'java -version'
                bat 'bat '"C:\\Users\\ASUS\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version''
                bat 'python --version'
            }
        }

        stage('Build and Test Spring Boot') {
            steps {
                dir('backend') {
                    script {
                        if (fileExists('mvnw.cmd')) {
                            bat 'mvnw.cmd -B clean package'
                        } else {
                            bat 'mvn -B clean package'
                        }
                    }
                }
            }
        }

        stage('Test Flask Service') {
            steps {
                dir('quiz-service') {
                    bat 'python -m pip install -r requirements.txt'
                    bat 'python -m unittest discover -s tests -v'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t devpath-backend:1.0 ./backend'
                bat 'docker build -t devpath-quiz:1.0 ./quiz-service'
                bat 'docker build -t devpath-frontend:1.0 ./frontend'
            }
        }
    }

    post {
        success {
            echo 'DevPath CI pipeline completed successfully.'
        }
        failure {
            echo 'DevPath CI pipeline failed. Review the Console Output.'
        }
    }
}