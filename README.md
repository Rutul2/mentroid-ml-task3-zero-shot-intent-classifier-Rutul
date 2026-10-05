# Zero Shot Intent Classifier

A customer support intent classification system using Hugging Face's pretrained `facebook/bart-large-mnli` model. The system classifies messages into predefined intents without task specific model training and routes uncertain predictions to a human agent.

## Demo

**Live Demo:** [Add Vercel URL]

## Problem Statement

Build a dynamic mechanism to classify incoming customer support messages into specific intents such as:

- Billing
- Technical Support
- Account and Login
- Order and Delivery
- General Inquiry

The system should also handle uncertain predictions instead of forcing an incorrect intent.

## Approach

The project uses **BART MNLI zero shot classification**.

The model receives:

```text
Customer Message
        +
Candidate Intent Labels
        ↓
BART MNLI
        ↓
Confidence Score for Each Intent
```

The intent with the highest confidence is selected as the prediction.

Example:

```text
Billing              95.32%
Technical Support     1.82%
Account and Login     0.91%
Order and Delivery    0.74%
General Inquiry       1.21%
```

### Fallback Mechanism

A confidence threshold of **40%** is used.

```text
Highest confidence >= 40%
        ↓
Predicted intent
        ↓
Route to support team

Highest confidence < 40%
        ↓
Human Agent
```

This prevents uncertain messages from being incorrectly routed.

## Main Implementation

The core implementation is located in:

```text
backend/classifier.py
```

It handles:

- Loading the BART MNLI model
- Defining candidate intents
- Zero shot classification
- Confidence scores
- Intent selection
- Confidence based fallback
- Support team routing

The FastAPI backend and React frontend are used only to demonstrate the implementation through a web interface.

```text
zero-shot-intent-classifier/
│
├── classifier/
│   └── classifier.py
│
├── backend/
│   ├── main.py
│   └── schemas.py
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── requirements.txt
└── README.md
```

## Setup

### Backend

```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The backend runs on `http://localhost:8000` and the frontend runs on `http://localhost:5173`.

## Example Results

### Billing

**Input**

```text
I was charged twice for my subscription.
```

**Output**

```text
Intent: Billing
Route: Billing Support
Fallback: No
```

### Technical Support

**Input**

```text
The application keeps crashing when I upload a file.
```

**Output**

```text
Intent: Technical Support
Route: Technical Support Team
Fallback: No
```

### Low Confidence

**Input**

```text
Something happened and I need help.
```

**Output**

```text
Intent: Human Agent
Route: Human Support
Fallback: Yes
```

## Results

The system demonstrates:

- Zero shot intent classification without custom training
- Classification across five support intents
- Confidence scores for all candidate intents
- Automatic intent based routing
- Confidence based fallback to human support
- Interactive demonstration through React and FastAPI


Name : Rutul Ambaliya
Email : rutulambaliya125@gmail.com
