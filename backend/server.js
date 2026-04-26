/*
require("dotenv").config();

const Groq = require("groq-sdk");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

console.log("🔑 KEY LOADED:", process.env.GROQ_API_KEY ? "✅ Found" : "❌ NOT FOUND");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fallback route
app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "../frontend/index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send("Server is running! Frontend not found at: " + indexPath);
    }
});

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowed = [".pdf", ".txt"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only .pdf and .txt files are allowed"));
        }
    }
});

async function extractText(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".pdf") {
        console.log("📄 Extracting text from PDF...");

        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

        const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
        const loadingTask = pdfjsLib.getDocument({
            data: dataBuffer,
            useSystemFonts: true //to use fonts already on the system
        });
        const pdfDoc = await loadingTask.promise;

        let fullText = "";

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
        }

        console.log(`📊 Total characters extracted: ${fullText.length}`);
        return fullText.slice(0, 8000);

    } else {
        console.log("📄 Reading TXT file...");
        return fs.readFileSync(filePath, "utf8").slice(0, 8000);
    }
}

app.post("/analyze", upload.single("resume"), async (req, res) => {
    console.log("🔥 Request received");

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const jobDescription = req.body.jobDescription || "";

    console.log("📁 File:", req.file.originalname);
    console.log("📋 Job Description:", jobDescription ? "✅ Provided" : "❌ Not provided");

    try {
        const resumeText = await extractText(req.file.path);

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ error: "Could not extract text. Make sure the PDF is not a scanned image." });
        }

        console.log("📡 Sending to Groq...");

        // Different prompt based on whether job description is provided
        const prompt = jobDescription
            ? `You are an expert ATS resume analyzer.

Compare this resume against the job description and provide:
- ATS Score out of 100 (based on match with job description)
- 3 Key Strengths (relevant to the job)
- 3 Areas for Improvement (specific to this job)
- Important Keywords Found (from job description that appear in resume)
- Missing Keywords Suggestions (from job description missing in resume)
- Overall Match Summary (2 sentences)

Job Description:
${jobDescription.slice(0, 3000)}

Resume:
${resumeText}`
            : `You are an expert ATS resume analyzer.

Analyze this resume and provide:
- ATS Score out of 100
- 3 Key Strengths
- 3 Areas for Improvement
- Important Keywords Found
- Missing Keywords Suggestions

Resume:
${resumeText}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant"
        });

        console.log("✅ AI responded");

        const aiOutput = chatCompletion.choices[0].message.content;
        fs.unlinkSync(req.file.path);

        res.json({
            result: aiOutput,
            hasJobDescription: !!jobDescription
        });

    } catch (err) {
        console.error("❌ ERROR:", err.message);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
*/
require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("✅ Server is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});