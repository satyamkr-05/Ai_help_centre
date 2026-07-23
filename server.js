const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ CSS folder serve karein
app.use("/css", express.static(path.join(__dirname, "css")));

// Routes
const chatRoutes = require("./routes/chatRoutes");
const faqRoutes = require("./routes/faqRoutes");
const healthRoutes = require("./routes/healthRoutes");

app.use("/api", chatRoutes);
app.use("/api", faqRoutes);
app.use("/api", healthRoutes);

// ✅ HOMEPAGE - Root se serve (frontend folder nahi!)
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "HomePage.html");
    console.log(`📄 Serving: ${filePath}`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send(`HomePage.html not found at: ${filePath}`);
    }
});

// ✅ OTHER HTML PAGES
app.get("/:page", (req, res) => {
    let page = req.params.page;
    if (!page.includes(".html")) {
        page = page + ".html";
    }
    const filePath = path.join(__dirname, page);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send(`Page "${page}" not found!`);
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server Running on http://localhost:${PORT}`);
    console.log(`📁 Root folder: ${__dirname}`);
});