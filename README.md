# Table Value Adjustment App

This project is a React-based application created using Vite. It displays a table where users can dynamically update category and subcategory values using percentage or direct value inputs. The changes are reflected instantly with variance calculations.

## Features

- Display a structured table with categories and subcategories.
- Update values using either percentage or direct input.
- Automatically adjust child values when parent values change.
- Calculate and display variance percentages.
- Styled using a separate CSS file for better UI.

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
├── src
│   ├── components
│   │   ├── Table.jsx
│   ├── styles.css
│   ├── main.jsx
│   ├── App.jsx
|   ├── App.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage

- Enter a number in the input field beside a category or subcategory.
- Click "Apply %" to update values by percentage.
- Click "Apply Value" to set an absolute value.
- The variance column reflects the percentage change from the initial value.

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS
