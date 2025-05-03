# NeuralNotes

## 1) Root
- .gitignore (Git ignore rules)
- README.md (Project documentation)

## 2) Tailwind CSS + PostCSS Configuration
- tailwind.config.js (Tailwind setup for purging content)
- postcss.config.js (PostCSS with TailwindCSS & Autoprefixer)

## 3) Global CSS Entry
- src/index.css (Imports Tailwind's base, components, and utilities)

## 4) Source Code Folders
- src/assets/ (Static assets)
- src/components/ (Reusable UI components)
- src/context/ (React context providers)
- src/hooks/ (Custom React hooks)
- src/pages/ (Page-level components for routing)
- src/styles/ (Additional CSS modules)

## 5) React Entry Points
- src/main.jsx: React app entry that mounts `<App />` into `<div id="root">`, wraps with `BrowserRouter`, and imports global CSS.
- src/App.jsx: Main component defining routes with React Router and wrapping content in `Layout`.
- src/components/Layout.jsx: Layout wrapper providing consistent page structure (header, main content, footer).

## File Descriptions
- `.gitignore`: Specifies files/folders to ignore in Git.
- `package.json`: Project metadata, dependencies (`react`, `react-dom`, `vite`, `tailwindcss`, `postcss`, `autoprefixer`), and NPM scripts (`dev`, `build`, `preview`).
- `index.html`: HTML entry point with `<div id="root">` and script to `main.jsx`.
- `vite.config.js`: Vite configuration (placeholder for now).
- `tailwind.config.js`: Tailwind CSS configuration file.
- `postcss.config.js`: PostCSS setup file.
- `src/index.css`: Global stylesheet with Tailwind directives.
- `src/main.jsx`: ReactDOM render logic and router setup.
- `src/App.jsx`: Application component with routing and layout.
- `src/components/Layout.jsx`: Layout component skeleton.
- `public/`: Static public files served by Vite.
- `node_modules/`: Installed dependencies.
- `dist/`: Production build output.
