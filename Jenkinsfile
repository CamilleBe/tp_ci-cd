pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('app-test') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('app-test') {
                    sh 'npm test -- --watch=false --browsers=ChromeHeadless --code-coverage'
                }
            }
        }

        stage('Quality') {
            steps {
                dir('app-test') {
                    withSonarQubeEnv('SonarCloud') {
                        sh """
                            ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                              -Dsonar.organization=camille-epsi \
                              -Dsonar.projectKey=CamilleBe_tp_ci-cd \
                              -Dsonar.sources=src \
                              -Dsonar.tests=src \
                              -Dsonar.test.inclusions=**/*.spec.ts \
                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }

        stage('Packaging') {
            steps {
                dir('app-test') {
                    sh 'tar -czf app-test-build.tar.gz -C dist .'
                    archiveArtifacts artifacts: 'app-test-build.tar.gz', fingerprint: true
                }
            }
        }
    }
}