# 📘 React Artworks Table

A React + TypeScript application that displays artworks from the Art Institute of Chicago API using PrimeReact DataTable. The application strictly follows server-side pagination rules and implements persistent row selection without prefetching or caching page data.

---

## 🚀 Live Demo

Live URL: (add your deployed link here)  
GitHub Repository: (this repository)

---

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- PrimeReact
- PrimeFlex
- Art Institute of Chicago Public API

---

## 📌 Features

### Server-Side Pagination

- Pagination is fully controlled by the API using page and limit parameters
- No client-side slicing or cached page data
- PrimeReact DataTable is used in lazy mode
- Each page change triggers a fresh API request

### Artwork Data Table

The table displays the following fields as required:

- Title
- Place of Origin
- Artist
- Inscriptions
- Start Date
- End Date

### Row Selection with Checkboxes

- Individual row selection using checkboxes
- Header checkbox selects rows from the current page only

### Persistent Selection Across Pages

- Selected rows remain selected when navigating between pages
- Selection state is stored globally using only artwork IDs
- No full row objects or page data are stored in memory

### Custom Row Selection Overlay

- Overlay panel allows selecting N rows from the current page
- Selection is limited strictly to the currently loaded page
- No additional API calls are made
- Selection logic is additive and does not affect other pages

---

## ❌ What This Application Intentionally Does NOT Do

- No prefetching of pages
- No bulk API requests
- No caching of page data
- No client-side pagination
- No storage of full row objects in state

These constraints are intentionally followed to match the assignment requirements.

---

## 🧠 Key Design Decisions

### Selection Logic

- A Set of artwork IDs is used to track selection
- On every page load, selection is derived by matching row IDs
- This prevents stale data issues and reduces memory usage

### Pagination Logic

- PrimeReact is used only for UI rendering
- The API fully controls pagination behavior
- Every page change results in a new API request

---

## 📂 Project Structure

```
src/
├── api/
│ └── artworks.ts             // API fetch logic
├── types/
│ └── artwork.ts              // TypeScript interfaces
├── App.tsx                   // Main UI and application logic
└── main.tsx                  // Application entry point
```

---

## ⚙️ Setup Instructions

Clone the repository:
git clone <repo-url>
cd react-artworks-table

Install dependencies:
npm install

Run the development server:
npm run dev

The application runs at:
http://localhost:5173

---

## 🧪 How to Test Functionality

1. Navigate between pages using pagination controls
2. Select rows on one page
3. Move to another page and select additional rows
4. Return to previous pages and verify selections persist
5. Use the Custom Select overlay to select N rows from the current page

---

## 📎 API Reference

Art Institute of Chicago API  
https://api.artic.edu/api/v1/artworks

---

## 📝 Notes

- Built using stable versions for ecosystem compatibility
- Designed to be clean, readable, and easy to explain in interviews
- No experimental or unsupported features are used

---

## 👤 Author

Chandra Pratap Singh
