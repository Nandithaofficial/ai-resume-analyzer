🤖 AI-Powered ATS Resume Analyzer

An intelligent web application that evaluates resumes using AI, generates ATS scores, extracts keywords, and provides actionable feedback to improve job application success.

🔗 Live Demo: https://ai-resume-analyzer-nlsb.onrender.com

📦 Repository: https://github.com/Nandithaofficial/ai-resume-analyzer

📸 Preview
<img width="100%" alt="App Screenshot" src="https://github.com/user-attachments/assets/7dd94704-be95-4f3f-96cc-b78607b3f28a" />
🚀 Features
📄 Resume Parsing – Extracts content from PDF/TXT resumes
📊 ATS Score Generation – Evaluates resume effectiveness
🔍 Keyword Extraction – Identifies important and missing keywords
🎯 Job Description Matching – Compares resume with job requirements
💡 AI Feedback – Provides actionable improvement suggestions
⚡ Real-Time Processing – Fast and responsive API system
🛠️ Tech Stack
Backend
Node.js
Express.js
AI Integration
Groq API (LLaMA 3.1)
File Processing
pdfjs-dist
Deployment
Render
🧠 How It Works
User uploads a resume (PDF/TXT)
Backend extracts and parses content
Structured prompts are sent to the LLM
AI analyzes:
Resume quality
Keyword relevance
Job match score
System returns:
ATS score
Missing keywords
Improvement suggestions
📂 Project Structure
ai-resume-analyzer/
│── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│── frontend/
│── uploads/
│── package.json
│── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Nandithaofficial/ai-resume-analyzer.git
cd ai-resume-analyzer
2️⃣ Install dependencies
npm install
3️⃣ Configure environment variables

Create a .env file:

GROQ_API_KEY=your_api_key_here
PORT=5000
4️⃣ Run the server
npm start
🌐 API Endpoints
Method	Endpoint	Description
POST	/analyze	Analyze resume
POST	/match	Match resume with job description
🔐 Privacy & Ethics
No long-term storage of resumes
Secure API handling
No analysis of sensitive personal attributes
Transparent and explainable scoring
🚀 Future Improvements
Resume rewriting with AI
Multi-language support
Dashboard & analytics
User authentication system
👩‍💻 Author

Nanditha Dh
🔗 GitHub: https://github.com/Nandithaofficial

⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
