# 📚 FAQ App

**FAQ App** is a full-stack application designed to manage frequently asked questions (FAQs) with ease. It supports **CRUD operations**, **multi-language translations**, and **caching** for improved performance. Built with modern technologies, it offers a seamless experience for both developers and end-users.

---

## ✨ Features

- **CRUD Operations**: Create, Read, Update, and Delete FAQs effortlessly.
- **Multi-Language Support**: Translate FAQs into multiple languages (e.g., English, Hindi, Bengali).
- **Translation API**: Powered by a FastAPI service integrated with Google Translate.
- **Caching**: Utilizes Redis for faster data retrieval.
- **Dockerized Deployment**: Simplified setup and deployment using Docker.

---

## 🛠️ Tech Stack

| **Frontend**         | **Backend**          | **Translation Service** | **Containerization** | **Testing**         |
|:--------------------:|:--------------------:|:-----------------------:|:--------------------:|:-------------------:|
| React                | Node.js              | FastAPI                 | Docker               | Mocha               |
| Ant Design           | Express              | uvicorn                 | docker-compose       | Chai                |
| Axios                | MongoDB (Mongoose)   | googletrans             |                      | Supertest           |
| React-Quill          | Redis                |                         |                      |                     |

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm**
- **Docker** (optional, for containerized deployment)
- **MongoDB** (or use the Docker image provided)

### Clone the Repository
```bash
git clone https://github.com/your-username/faq-app.git
cd faq-app
```

### Running Without Docker
1. Ensure **MongoDB** is running locally.
2. Start **Redis**:
   ```bash
   redis-server
   ```
3. Run the translation service:
   ```bash
   cd translation-service
   python main.py
   ```
4. Install and start the backend:
   ```bash
   cd ../backend
   npm install
   npm start
   ```
5. Install and start the frontend:
   ```bash
   cd ../client
   npm install
   npm start
   ```

### Running with Docker
```bash
docker-compose up --build
```

---

## 📂 Project Structure
```plaintext
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.js
│   └── package.json
│
├── client
│   ├── public
│   ├── src
│   └── package.json
│
├── translation-service
│   ├── app
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── tests
│   ├── faq.test.js
│   └── faqRoutes.test.js
│
└── docker-compose.yml
```

