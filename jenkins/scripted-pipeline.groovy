node {
    try {
        stage('Checkout') {
            checkout scm
        }
        stage('Build Backend') {
            dir('backend') {
                sh 'mvn -B clean package'
            }
        }
        stage('Test Quiz Service') {
            dir('quiz-service') {
                sh 'python3 -m pip install -r requirements.txt'
                sh 'python3 -m unittest discover -s tests -v'
            }
        }
        stage('Build Images') {
            sh 'docker build -t devpath-backend:scripted ./backend'
            sh 'docker build -t devpath-quiz:scripted ./quiz-service'
        }
    } catch (err) {
        currentBuild.result = 'FAILURE'
        throw err
    } finally {
        echo "Scripted pipeline finished with result: ${currentBuild.currentResult}"
    }
}
