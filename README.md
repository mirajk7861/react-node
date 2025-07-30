# React + Node.js Todo App (Fullstack Automation Showcase)

This is a simple fullstack Todo app built with **React (frontend)** and **Node.js + Express + MongoDB (backend)** to demonstrate automation testing skills using:

- **Playwright** for UI functional tests (with Page Object Model)
- **Postman + Newman** for API automation tests
- **GitHub Actions** for CI pipeline

---

## Tech Stack

| Layer       | Tech                                |
|------------|--------------------------------------|
| Frontend   | React, Axios                         |
| Backend    | Node.js, Express, MongoDB (Mongoose) |
| UI Tests   | Playwright (JavaScript)              |
| API Tests  | Postman + Newman (Collection Runner) |
| CI/CD      | GitHub Actions                       |

---

##  How to Run the Project Locally

###  Start Backend

```bash
cd backend
npm install
touch .env


Inside .env, add:

PORT=5050
MONGO_URI=mongodb://localhost:27017/todoapp
Then run:

node index.js
Your backend will run at: http://localhost:5050

Start Frontend

cd frontend
npm install
npm start
Frontend will start at: http://localhost:3000

Functional UI Tests (Playwright)
Folder Structure (Page Object Model)
arduino
Copy
Edit
tests/
│
├── pages/
│   ├── loginPage.js
│   └── todoPage.js
│
├── ui/
│   ├── login.spec.js
│   └── todo.spec.js
├── utils/
│   └── testData.js
└── playwright.config.js
Run UI Tests:
bash
Copy
Edit
npx playwright test
Tests cover: login, add/edit/delete todos, invalid scenarios, and validations.

API Test Automation (Postman)
We use Postman collections to test:

POST /api/login

GET /api/items

POST /api/items

PUT /api/items/:id

DELETE /api/items/:id

Run API Tests:

newman run postman/todo_collection.json -e postman/todo_env.json
 Includes positive and negative cases. Environment variables like baseURL, todo_id, and task_name are used.

GitHub Actions (CI Pipeline)
CI automatically runs UI tests on push using Playwright:

.github/workflows/playwright.yml

yaml

- name: Run UI Tests in local
  run: npx playwright test
Test Plan
What’s Tested:
UI: login, create, update, delete todos

API: All endpoints, status codes, validation errors

Coverage
Valid + invalid inputs

Boundary conditions

Positive/negative auth tests

Tools Used
React + Node.js for app

Playwright for UI

Postman for API

GitHub Actions for CI

Author
Miraj Khan
Reach out for collaboration!

