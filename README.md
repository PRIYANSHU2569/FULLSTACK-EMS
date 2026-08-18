
# QuickEMS — Employee Management System

QuickEMS is a full-stack **Employee Management System** designed to simplify employee administration, attendance tracking, leave management, payroll records, and automated email notifications.

The system provides separate **Admin and Employee experiences** with secure JWT authentication, role-based authorization, automated background workflows, and transactional email notifications.

---

## 🚀 Live Demo

- **Frontend:** [Open QuickEMS](https://fullstack-ems-khaki.vercel.app/dashboard)
- **Backend API:** [Open Backend API](https://fullstack-ems-server-green.vercel.app/)

---

## ✨ Key Features

### 👨‍💼 Admin Features

- Secure Admin login
- Create, update, and delete employees
- View and manage employee records
- Department-wise employee management
- Admin dashboard with employee statistics
- Attendance monitoring
- View employee attendance history
- Manage leave applications
- Approve or reject leave requests
- Generate and manage employee payslips
- Monitor email notifications
- Admin-only SMTP email testing

### 👨‍💻 Employee Features

- Secure Employee login
- Personal profile management
- Daily check-in and check-out
- Attendance history
- Apply for leave
- Track leave application status
- View dashboard information
- Access payslip details

---

## 📧 Automated Email & Background Workflows

QuickEMS uses **Inngest** for background workflows and **Brevo SMTP + Nodemailer** for transactional emails.

### Automated Workflows

- 🕦 Daily attendance reminder at **11:30 AM IST**
- 📩 Attendance reminder for employees who have not checked in
- ⏰ Check-out reminder after **9 hours** of check-in
- 📝 Automatic attendance handling when checkout is missed
- 📬 Pending leave reminder to Admin after **24 hours**
- 🧪 Secure Admin-only SMTP test endpoint
- 📊 Transactional email delivery tracking through Brevo

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Vite | Development & build tool |
| Tailwind CSS | Styling |
| Axios | API requests |
| React Router | Client-side routing |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Nodemailer | Email service |
| Brevo SMTP | Transactional email delivery |
| Inngest | Background workflows |

### Deployment

- **Frontend:** Vercel
- **Backend:** Vercel
- **Database:** MongoDB Atlas

---

## 🏗️ Project Architecture

```text
QuickEMS
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   │
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── inngest/
│   ├── server.js
│   └── ...
│
└── README.md
````

---

## 📦 Main Modules

| Module                 | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| 🔐 Authentication      | JWT-based Admin and Employee authentication            |
| 👥 Employee Management | Create, update, delete, and view employees             |
| 🕒 Attendance          | Employee check-in, check-out, and attendance history   |
| 📝 Leave Management    | Apply, approve, reject, and monitor leave applications |
| 💰 Payroll             | Generate and view employee payslips                    |
| 📊 Dashboard           | Role-based dashboards with important statistics        |
| 📧 Email Service       | Transactional emails using Brevo SMTP                  |
| ⚙️ Background Jobs     | Scheduled workflows using Inngest                      |

---

## 🔌 API Highlights

| Method  | Endpoint            | Description                    |
| ------- | ------------------- | ------------------------------ |
| `POST`  | `/api/auth/login`   | Admin/Employee login           |
| `GET`   | `/api/auth/session` | Get authenticated user session |
| `GET`   | `/api/employees`    | Get employee list              |
| `POST`  | `/api/employees`    | Create employee                |
| `POST`  | `/api/attendance`   | Employee check-in/check-out    |
| `GET`   | `/api/attendance`   | Get attendance history         |
| `POST`  | `/api/leave`        | Create leave application       |
| `PATCH` | `/api/leave/:id`    | Approve/reject leave           |
| `GET`   | `/api/dashboard`    | Get role-based dashboard data  |
| `POST`  | `/api/email/test`   | Test Brevo SMTP email          |
| `ALL`   | `/api/inngest`      | Inngest workflow endpoint      |

> Protected endpoints require appropriate JWT authentication and role-based authorization.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email

SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
SENDER_EMAIL=your_verified_brevo_sender_email

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### ⚠️ Security

**Never upload your `.env` file to GitHub.**

Make sure your `.gitignore` contains:

```gitignore
.env
.env.local
node_modules/
```

---

## 💻 Run Locally

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FULLSTACK-EMS
```

### 2. Start the Backend

```bash
cd server
npm install
npm run server
```

Backend will run on:

```text
http://localhost:4000
```

### 3. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 📸 Screenshots

### 🔐 Login Page

*Add login page screenshot here.*

### 📊 Admin Dashboard

<img width="1920" height="973" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/4e3b3426-29c3-4b43-99d5-6ea9f0241d92" />

### 👨‍💼 Employee Dashboard

<img width="1920" height="973" alt="Employee Dashboard" src="https://github.com/user-attachments/assets/9ba1b207-6499-4a36-9285-aaca5d2cff12" />

### 👥 Employee Management

<img width="1920" height="991" alt="Employee Management" src="https://github.com/user-attachments/assets/74dd5426-44e8-46fc-be7d-1f17962e29d2" />

### 🕒 Attendance Management

<img width="1917" height="974" alt="Attendance Management" src="https://github.com/user-attachments/assets/2366f93e-c761-4137-8703-e53e65a06712" />

### 📝 Leave Management

<img width="1900" height="974" alt="Leave Management" src="https://github.com/user-attachments/assets/ad464ecb-b221-4f1e-b41c-324d8b93cfcc" />

---

## 🔒 Security Highlights

* JWT-based authentication
* Bcrypt password hashing
* Role-based authorization
* Protected API routes
* Admin-only email testing endpoint
* Environment variables for sensitive credentials
* Secure SMTP configuration
* MongoDB Atlas database security

---

## 🔄 Application Workflow

```text
                 ┌─────────────────┐
                 │      Login      │
                 └────────┬────────┘
                          │
                ┌─────────┴─────────┐
                │                   │
          ┌─────▼─────┐       ┌────▼─────┐
          │   Admin   │       │ Employee │
          └─────┬─────┘       └────┬─────┘
                │                  │
        ┌───────┼────────┐     ┌───┼──────────┐
        │       │        │     │   │          │
     Employee Attendance Leave  Attendance Leave
     Management          Mgmt.   │          │
        │       │        │       │          │
        └───────┼────────┘       └────┬─────┘
                │                     │
                └─────────┬───────────┘
                          │
                    ┌─────▼─────┐
                    │  MongoDB  │
                    │   Atlas   │
                    └───────────┘


             Background Workflows
                     │
                   Inngest
                     │
                     ▼
                Brevo SMTP
                     │
                     ▼
               Email Delivery
```

---

## 🚀 Future Improvements

* [ ] Email notification when leave is approved/rejected
* [ ] Employee profile image upload
* [ ] Advanced attendance analytics
* [ ] Admin reports and charts
* [ ] Improved mobile responsiveness
* [ ] Notification center
* [ ] Employee performance tracking
* [ ] Advanced payroll management

---

## 👨‍💻 Author

### Priyanshu Gupta

**Full Stack Developer | MERN Stack Developer**

* Computer Science Engineering Student
* Interested in Full-Stack Development, Backend Development, and DSA

---

## 🎯 Project Purpose

QuickEMS was developed as a **college-level full-stack project** to demonstrate practical experience in:

* MERN Stack Development
* Authentication & Authorization
* REST API Development
* MongoDB Database Design
* Role-Based Access Control
* Email Integration
* Background Job Processing
* Inngest Workflows
* SMTP Integration
* Vercel Deployment
* Full-Stack Application Architecture

---

## ⭐ If You Like This Project

If you find QuickEMS useful or interesting, consider giving the repository a ⭐ on GitHub.

> **QuickEMS — Simplifying Employee Management with Modern Full-Stack Technologies.**
