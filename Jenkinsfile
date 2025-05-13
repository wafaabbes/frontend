pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wafa23/frontendd"
    }

    options {
        skipStagesAfterUnstable()
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/wafaabbes/frontend.git'
            }
        }


        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies with npm ci..."
                sh 'npm ci --legacy-peer-deps'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def imageTag = "${DOCKER_IMAGE}:${commitHash}"
                    echo "Building Docker image with tag: ${imageTag}"
                    sh "docker build -t ${imageTag} ."
                    env.IMAGE_TAG = imageTag
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    echo "Logging into DockerHub and pushing image..."
                    sh """
                        echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                        docker push "${IMAGE_TAG}"
                    """
                }
            }
        }

        stage('Deploy to K3s') {
            steps {
                withCredentials([file(credentialsId: 'kubeeconfig', variable: 'KUBECONFIG')]) {
                    script {
                        echo "Deploying to K3s cluster..."
                        sh """
                            export KUBECONFIG=${KUBECONFIG}
                            kubectl apply -f k8s/frontend-deployment.yaml
                            kubectl apply -f k8s/frontend-service.yaml
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécutée avec succès !'
        }
        failure {
            echo '❌ Échec de l’exécution du pipeline.'
        }
        always {
            echo '📝 Fin du pipeline.'
        }
    }
}
