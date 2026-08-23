# Student Data Pipeline & UI

## Overview
(image.png)
The Student Data Pipeline & UI is a fully functional React application designed to clean, validate, and analyze student datasets. This technical assessment project allows users to upload a raw CSV dataset, automatically processes it (handling duplicates and missing values), recalculates and validates scores, and presents the cleaned data in a dynamic table with real-time filtering and live statistics. 

## Features

- **CSV Upload**: Simple drag-and-drop or file selection to upload student data.
- **Automatic Cleaning**: Normalizes strings, handles typos, and processes values efficiently.
- **Duplicate Handling**: Identifies and removes duplicate student rows dynamically.
- **Missing-Value Handling**: Intelligently infers missing subject scores (defaults to 0 for missing numeric fields and flags them as validation warnings).
- **Total Validation**: Verifies that the `Total` column equals `Math + Science + English`. If it's missing or incorrect, it recalculates the value instantly.
- **Cleaned Data Table**: Responsive, paginated table displaying the cleaned records.
- **Minimum Total Filtering**: Instantly filter the shortlist by specifying a minimum Total score.
- **Live Shortlist**: A dynamically updating shortlist based on search, status, and score filters.
- **Active / Debarred Status**: A real-time toggle switch to debar a student, immediately excluding them from the active shortlist without page reloads or file re-uploads.
- **CSV Export**: Click to download the currently filtered and active shortlist as a ready-to-use CSV file.

## Data Cleaning Logic

1. **Duplicates**: Uses a unique key generated from normalized `Name`, `Gender`, and `Grade` to identify and remove exact duplicate records.
2. **Missing Values**: Missing or invalid non-numeric subject scores are safely converted to `0`. Missing names or grades are kept as empty strings to prevent fabricated data, but flagged appropriately.
3. **Score Validation**: Converts strings to numbers where applicable, checks for negative or `NaN` values, and flags warnings.
4. **Total Calculation**: Explicitly evaluates `Math + Science + English`. If the uploaded `Total` deviates from this sum, the application overrides the `Total` with the correct calculated value.

## Tech Stack

- **Frontend Framework**: React 18 (via Vite)
- **Styling**: Vanilla Modern CSS (CSS Variables, Flexbox/Grid)
- **Data Processing**: PapaParse (CSV Parsing)
- **Icons**: Lucide React
- **Charts/Stats**: Recharts
- **Animations**: Framer Motion

## Architecture

```
src/
│
├── components/
│   ├── Navbar.jsx               # App navigation & status
│   ├── DatasetUploader.jsx      # CSV drag-and-drop
│   ├── DataQualitySummary.jsx   # Cleaning statistics cards
│   ├── FilterBar.jsx            # Search, Min Score, Export
│   ├── StudentTable.jsx         # Paginated data table & status toggle
│   ├── ShortlistSummary.jsx     # Live active shortlist stats
│   └── ScoreChart.jsx           # Distribution bar chart (Recharts)
│
├── services/
│   ├── csvParser.js             # PapaParse implementation
│   ├── dataCleaner.js           # Cleaning, Validation, Total logic
│   └── exportService.js         # CSV Blob generation/download
│
├── hooks/
│   └── useStudentData.js        # Global state and memoized shortlist logic
│
├── App.jsx                      # Main UI assembly & layout
├── main.jsx                     # Entry point
└── index.css                    # Design system and aesthetics
```

## Local Setup

Ensure you have Node.js installed, then run:

```bash
npm install
npm run dev
```

## CSV Schema

The expected CSV format requires these exact core columns:

```text
Name
Gender
Grade
Math
Science
English
Total
```

*Note: The application internally manages a `Status` field (Active/Debarred), which is automatically assigned during processing.*

## Filtering Logic

The Live Shortlist is derived instantly via:

```javascript
student.Status === "Active" 
  && student.Total >= MinimumScore 
  && (Matches Search Query)
```

## Export

Clicking **Export CSV** will generate a new `.csv` file containing only the students currently visible in the Live Shortlist (respecting the Minimum Score and Debarred status filters).

## Video Demo

[Watch 90-second Demo](https://drive.google.com/file/d/1bwoHzbW_Il_2LMb6EWBLM9OCH406KPpE/view?usp=sharing)
