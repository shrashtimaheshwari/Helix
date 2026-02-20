# 🧬 HELIX - A Gene-Guided Prescribing Platform
## Explainable AI-Powered Pharmacogenomic Risk Assessment Platform  

> Precision medicine starts with understanding genetics.  
> HELIX transforms raw genomic data into clinically interpretable, drug-specific risk intelligence.

## 🌍 Live Demo  
🔗 **Live Application:** [https://helix-fa85.vercel.app/] 
🎥 **LinkedIn Demo Video:** [https://www.linkedin.com/posts/shloknaidu_rift2026-pharmaguard-pharmacogenomics-ugcPost-7430442068713369600-Fl8Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAExzGggBjkPUUP9rQifXAPNgqNz049z8YBE]  

## 📌 Overview  

HELIX is a HealthTech clinical decision-support platform that analyzes patient genetic variants (VCF files) to predict drug-specific risks using pharmacogenomics.

Modern prescribing often relies on population averages — but genetics vary significantly between individuals. The same medication may be:

- Safe for one patient  
- Ineffective for another  
- Potentially toxic for someone else  

HELIX bridges this gap by combining:

- Genomic variant parsing  
- Rule-based pharmacogenomic logic  
- Evidence-weighted risk scoring  
- AI-generated biological explanations  

The result is a clinician-friendly, explainable pharmacogenomic risk assessment system.

> ⚠️ HELIX is a research prototype and clinical decision-support tool. It does not replace medical judgment.

# 🎯 Core Features  

✅ Upload patient VCF (Variant Call Format) files  
✅ Multi-drug input support  
✅ Variant identification & gene mapping  
✅ Drug risk classification:
- Safe  
- Adjust Dosage  
- Toxic  
- Ineffective  
- Unknown  

✅ Evidence-weighted confidence scoring  
✅ AI-generated biological explanations  
✅ Suggested safer alternatives (when applicable)  
✅ Clean clinician-focused UI  
✅ Strict JSON schema output for interoperability  

# 🏗️ Architecture Overview  

🔄 End-to-End Flow

VCF → Variant Parsing → Diplotype → Phenotype → CPIC Rule Engine → Risk Classification → Confidence Score → Guarded LLM Explanation → JSON Output → MongoDB Logging

1️⃣ Data Ingestion

Accepts .vcf via REST API

Extracts gene, star allele, rsID

Defensive parsing with quality tracking

2️⃣ Genomic Interpretation

Diplotype Construction (e.g., CYP2D6 → *10/*17)

Phenotype Mapping (PM, IM, NM, Unknown)

3️⃣ Clinical Decision Engine (Deterministic)

Rule-based CPIC logic

Drug → Gene → Phenotype → Clinical Action

LLM does not influence medical decisions

4️⃣ Risk & Confidence Modeling

Outcomes: Safe / Adjust / Toxic / Ineffective

Severity classification

Confidence score (0.1–0.95) based on data quality & evidence strength

5️⃣ Controlled LLM Explanation

Generates human-readable explanation only

Strict JSON validation

Hallucination filtering

Safe fallback responses

6️⃣ Persistence Layer

Optional MongoDB logging

Fail-safe error handling

# 🛠️ Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- Groq API (llama-3.3-70b-versatile)
- Custom Genomic processing Engine (VCF parsing, diplotype, phenotype, CPIC rules)
- AI Guardrails (JSON schema validation + citation filtering)
- dotenv, multer, nodemon

 
# 🚀 Installation & Local Setup

1️⃣ Clone the Repository

git clone https://github.com/shrashtimaheshwari/Helix.git
cd Helix/backend

2️⃣ Install Dependencies

npm install

3️⃣ Create .env File

Inside /backend create a file named:
.env

Add:

PORT=5000
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=your_mongodb_atlas_connection_string

4️⃣ Start the Server

npm start

Or with nodemon:

npx nodemon server.js

You should see:

Server running on port 5000
MongoDB Connected

5️⃣ Test the API

curl -X POST http://localhost:5000/api/analyze \
  -F "vcf_file=@your_file.vcf" \
  -F "drugs=codeine"

# 📘 API Documentation

🔹 Base URL

http://localhost:5000

🔹 Analyze Pharmacogenomic Profile

Endpoint

POST /api/analyze

Content-Type

multipart/form-data

🔹 Request Parameters

Field	Type	Required	Description

vcf_file	File	✅ Yes	Patient VCF file
drugs	String	✅ Yes	Comma-separated drug names


Supported Drugs :

-CODEINE
-WARFARIN
-CLOPIDOGREL
-SIMVASTATIN
-AZATHIOPRINE
-FLUOROURACIL

🔹 Example Request

curl -X POST http://localhost:5000/api/analyze \
  -F "vcf_file=@patient.vcf" \
  -F "drugs=codeine,warfarin"

🔹 Example Response

[
  {
    "patient_id": "PATIENT_ABC123",
    "drug": "CODEINE",
    "risk_assessment": {
      "risk_label": "Safe",
      "confidence_score": 0.95,
      "severity": "none"
    },
    "pharmacogenomic_profile": {
      "primary_gene": "CYP2D6",
      "diplotype": "*10/*17",
      "phenotype": "NM"
    },
    "clinical_recommendation": {
      "action": "Use standard dosing.",
      "evidence_level": "CPIC Level A"
    }
  }
]


🔹 Error Responses

Missing File

{ "error": "VCF file is required" }

Invalid Drug

{ "error": "Invalid drug name: ASPIRIN" }

# 🧪 Example Use Case


🔹 1. Analyze Single Drug

curl -X POST http://localhost:5000/api/analyze \
  -F "vcf_file=@TC_P1_PATIENT_001_Normal.vcf" \
  -F "drugs=codeine"

🔹 2. Analyze Multiple Drugs

curl -X POST http://localhost:5000/api/analyze \
  -F "vcf_file=@TC_P1_PATIENT_001_Normal.vcf" \
  -F "drugs=codeine,warfarin,clopidogrel"

🔹 3. Expected Successful Response (Example)

[
  {
    "patient_id": "PATIENT_ABC123",
    "drug": "CODEINE",
    "risk_assessment": {
      "risk_label": "Safe",
      "confidence_score": 0.95,
      "severity": "none"
    },
    "pharmacogenomic_profile": {
      "primary_gene": "CYP2D6",
      "diplotype": "*10/*17",
      "phenotype": "NM"
    },
    "clinical_recommendation": {
      "action": "Use standard dosing.",
      "evidence_level": "CPIC Level A"
    }
  }
]

🔹 4. Invalid Drug Example

curl -X POST http://localhost:5000/api/analyze \
  -F "vcf_file=@patient.vcf" \
  -F "drugs=aspirin"

Response:

{ "error": "Invalid drug name: ASPIRIN" }

🔹 5. Missing File Example

curl -X POST http://localhost:5000/api/analyze \
  -F "drugs=codeine"

Response:

{ "error": "VCF file is required" }


# 👥 Team-Code Cartel

Teamlead Name – Shlok Naidu
LinkedIn: [https://www.linkedin.com/in/shloknaidu/]

Teammate Name – Vedant Singh Kushwah
LinkedIn: [https://www.linkedin.com/in/vedant-kushwah/]

Teammate Name – Shrashti Maheshwari
LinkedIn: [https://www.linkedin.com/in/shrashti-maheshwari-03bb14285/]

Teammate Name – Shrey Shubham Pandey
LinkedIn: [https://www.linkedin.com/in/shreyshubhampandey/]

