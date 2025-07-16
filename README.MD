# 🚀 CodeAlpha Full Stack ExpressJS

A modular backend project using Node.js, Express.js, MongoDB, and Handlebars (HBS). Developed as part of the CodeAlpha Full Stack Development Internship.

---

## 🌟 Features

- RESTful API using Express.js
- MongoDB integration via Mongoose
- Templating with Handlebars (.hbs)
- Modular folder structure (MVC-friendly)
- Environment variable support using dotenv
- Easily extensible and beginner-friendly

---

## 🛠️ Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Sayandas35/CodeAlpha_FullStack_ExpressJS.git
cd CodeAlpha_FullStack_ExpressJS/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/your_database_name
```

Replace `your_database_name` with the name of your local MongoDB database.

### 4. Start the Server

```bash
node app.js
# Or if you're using nodemon:
nodemon app.js
```

Server will start on: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
CodeAlpha_FullStack_ExpressJS/
│
├── backend/
│   ├── app.js          # Main server file
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── views/          # Handlebars templates (.hbs)
│   ├── .env            # Environment variables
│   └── package.json    # Project metadata & dependencies
│
└── README.md           # Project documentation
```

---

## 📦 Dependencies

| Package  | Description                                |
| -------- | ------------------------------------------ |
| express  | Fast, minimalist web framework for Node.js |
| mongoose | MongoDB ODM to manage schema and models    |
| hbs      | Handlebars templating for rendering views  |
| dotenv   | Load .env variables into process.env       |
| path     | Built-in Node module for path handling     |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 👤 Author

**Sayan Das**  
🔗 [GitHub Profile](https://github.com/Sayandas35)

---

## 📝 License

This project is for learning and academic purposes under
