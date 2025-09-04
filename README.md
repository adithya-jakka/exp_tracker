Expense Tracker

This project was bootstrapped with Create React App.

Available Scripts

In the project directory, you can run:

npm start

Runs the app in development mode.
Open http://localhost:3000
 to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

Expense Tracker

Managing personal finances can often be challenging, and keeping track of daily expenses manually is inefficient. The Expense Tracker Application solves this problem by providing a simple and professional way to log, view, and manage expenses.

🚀 Features

Add and delete expenses easily.

Provide detailed expense information including title, amount, and category.

View summaries of all expenses.

Modern, responsive UI for seamless experience.

This application is especially useful for:

Individuals managing personal spending habits.

Students tracking pocket money and study-related expenses.

Professionals monitoring project or business expenses.

Access the live project here: http://34.100.150.166:3000

This coding and testing is done by(J.LEELA ADITYA(23211a6738) & J.REVANTH(23211a6739)).

Running with Docker:

This project includes a Dockerfile for containerized deployment.

🔹 For Other Developers (Pull & Run Image)

Login to Docker Hub
docker login

Pull the image
docker pull preetham1703/expensetracker:latest

Run the container
docker run -p 3000:3000 preetham1703/expensetracker:latest

Check running containers
docker ps

View logs (optional)
docker logs -f expensetracker-container

This part is done by H.SUMITH(23211a6736).

Jenkins + GKE Deployment Workflow:

We automated the deployment of the Expense Tracker Application using Jenkins CI/CD integrated with Google Kubernetes Engine (GKE).

⚙ Jenkins Pipeline (Batch Script for Windows Node)
REM ====== Configuration ======
set REPO_URL=https://github.com/adithya-jakka/exp_tracker.git
set BUILD_NUMBER=%BUILD_NUMBER%
set DOCKER_USER=adityajakka
set DOCKER_PASS=jakka@12345
set IMAGE_NAME=expensetracker-1
set GCP_PROJECT=cbd-a-6707
set CLUSTER_NAME=cluster-1
set CLUSTER_REGION=asia-south1
set SERVICE_ACCOUNT_KEY=C:\Users\adity\Downloads\cbd-a-6707-ba1d12e593bd.json
REM ====== Step 1: Clone latest code ======
cd C:\
if exist expensetracker rmdir /s /q expensetracker
git clone %REPO_URL% expensetracker
cd expensetracker

REM ====== Step 2: Build Docker image ======
docker build -t %DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER% .

REM ====== Step 3: Push to Docker Hub ======
echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
docker push %DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER%

REM ====== Step 4: Setup GCP & GKE credentials ======
set PATH=C:\Users\adity\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin;%PATH%
set USE_GKE_GCLOUD_AUTH_PLUGIN=True
call gcloud auth activate-service-account --key-file="%SERVICE_ACCOUNT_KEY%"
call gcloud container clusters get-credentials %CLUSTER_NAME% --region %CLUSTER_REGION% --project %GCP_PROJECT%

REM ====== Step 5: Update Kubernetes Deployment ======
echo "Tag to be used: %DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER%"
call kubectl set image deployment/deployment-1 expensetracker-1=docker.io/%DOCKER_USER%/%IMAGE_NAME%:%BUILD_NUMBER%
call kubectl rollout status deployment/deployment-1
This part is done by G.SAIRAM(23211a6728).
📌 Steps Explained

Clone Latest Code
Pulls the most recent commit from the GitHub repository to ensure Jenkins builds from the latest source.

Build Docker Image
Creates a Docker image with a unique Jenkins build tag (%BUILD_NUMBER%).

Push to Docker Hub
Authenticates and uploads the Docker image to Docker Hub for external availability.

Authenticate with GCP & GKE
Uses a service account JSON key for secure authentication and fetches credentials for the GKE cluster.

Update Kubernetes Deployment
Updates the container image in the Kubernetes deployment, refreshing pods with the latest build.

This part is done by (Ananthu Sujeeth(23211a6707) & B.Shivaram(23211a6717)).

✅ Advantages of this Setup

Fully automated CI/CD pipeline from GitHub → Jenkins → Docker Hub → GKE.

Each Jenkins build creates a unique versioned image (expensetracker:<build_number>).

Eliminates manual deployment errors.

Provides scalability and reliability using Kubernetes.

Live Deployment link:34.100.150.166:3000

This part is done by (B.Shivaram(23211a6717) & Ananathu Sujeeth(23211a6707))

