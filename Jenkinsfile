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
                    sh 'npm install --save-dev puppeteer'
                    script {
                        env.CHROME_BIN = sh(
                            script: "node -e \"console.log(require('puppeteer').executablePath())\"",
                            returnStdout: true
                        ).trim()
                    }
                    sh 'npm test -- --watch=false --browsers=ChromeHeadlessCI --code-coverage'
                }
            }
        }

        stage('Quality') {
            steps {
                dir('app-test') {
                    withSonarQubeEnv('SonarCloud') {
                        withEnv(["SONAR_SCANNER_OPTS=-Djavax.net.ssl.trustStoreType=jks"]) {
                            sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner -Dsonar.organization=camille-epsi -Dsonar.projectKey=CamilleBe_tp_ci-cd -Dsonar.projectBaseDir=\$(pwd) -Dsonar.sources=. -Dsonar.exclusions=**/*.spec.ts,**/node_modules/** -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                        }
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