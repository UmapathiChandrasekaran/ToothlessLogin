# 🛠️ Complete Developer & Setup Guide

This guide outlines the environmental prerequisites, local development workflows, and git configuration steps required to run or modify the Cinematic Toothless Login Portal.

---

## 📋 1. Prerequisites & Environment Setup

Before running this project locally, ensure your machine has the following tools installed:

### Node.js & npm
Angular requires Node.js. Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).

### Angular CLI
Install the Angular Command Line Interface globally via your terminal:
```bash
npm install -g @angular/cli

Angular CLI
The framework architecture runs on Angular CLI version 21.2.12. Install or match it globally via your terminal using:
npm install -g @angular/cli@21.2.12

Tailwind CSS
All layout structures and utility designs are built using Tailwind CSS v4.3.0. The processing pipeline is integrated natively within the Angular component compilation layer.

Git (Version Control)
If your terminal fails to parse standard repository actions, install Git via git-scm.com. Ensure "Git from the command line and also from 3rd-party software" remains enabled during installation.

🔧 2. First-Time Git Identity Configuration
If you encounter an Author identity unknown error when executing a local commit, configure your global Git parameters:

Bash
# Set your global email address
git config --global user.email "your_email@example.com"

# Set your global display name
git config --global user.name "Your GitHub Username"


💻 3. Local Development Workflows
Once your workspace environment is ready, use the following standard commands to test and serve the application:

Running the Development Server
To spin up a local preview environment:

Bash
ng serve
Once initialized, navigate your web browser to http://localhost:4200/. The workspace handles automated live-reloading as you save edits.

Code Scaffolding
To generate modular architectural components seamlessly:

Bash
ng generate component component-name
Running Unit Tests
To execute your component specs using the built-in Vitest runner layout:

Bash
ng test

🚀 4. Production Bundling & Live Web Deployment
To compile your application production bundle and publish it directly to GitHub Pages:

Step A: Build Optimization
Compile the production layout and point the internal routing directly to your public repository target:

Bash
ng build --base-href "[https://YOUR-GITHUB-USERNAME.github.io/toothless-login/](https://YOUR-GITHUB-USERNAME.github.io/toothless-login/)"
Step B: Run the Deployment Pipeline
Install the distribution engine globally and push your optimized production files live:

Bash
npm install -g angular-cli-ghpages
npx angular-cli-ghpages --dir=dist/toothless-login
