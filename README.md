# Shoe Store Web Project

## Overview
A lightweight, modern, responsive shoe‑selling website built with **plain HTML, CSS, and vanilla JavaScript**. It contains:

- A fixed navigation bar with brand logo and links.
- A hero section that showcases a hero image and tagline.
- A shop section that displays a few example shoes.
- A measurement tool that estimates a user’s US shoe size from their foot length in centimeters.
- Basic About and Contact sections.
- Mobile‑friendly design with responsive layout.

No backend, database, or dependencies are required – just open `index.html` in a browser.

## Project Structure
```
shoe-store/
├─ index.html          # Main page
├─ css/
│   └─ style.css       # Styles for the whole site
├─ js/
│   └─ main.js         #  Foot‑measurement helper
└─ README.md           # This file
```

## Quick Start
Open the project in a file explorer or terminal.

### 1. **Directly**
Just open `index.html` in your browser.

### 2. **Local server** (recommended for hot‑reload or testing hyperlinks)
Run one of the following simple commands from the root folder:

```bash
# Python 3.x (built‑in HTTP server)
pip install --quiet --upgrade python
python -m http.server 8000
```

or

```bash
# Node (requires npm)
npm install -g serve
serve . -l 8000
```

Navigate to `http://localhost:8000`.

## How It Works
- **Shoes** are represented by placeholders in this first iteration. Replace the placeholder image URLs with real product images as you grow.
- The *measurement tool* uses a simple formula to give a rough US size estimate. The conversion is intentionally marked as "preliminary"—you can extend the logic later.
- CSS media queries make the layout adapt to tablet and phone sizes. The navigation switches to a vertical layout on narrow screens.

## Extending
When you need to add more features (e.g., cart page, product detail, or integration to a CMS), you can:

1. **Add a new folder** (`src/`, `components/`, etc.) and move files into an SPA structure.
2. **Replace placeholders** with real data—e.g., fetch from a headless‑CMS or local JSON file.
3. **Introduce a build system** (Vite/Parcel) if you want module bundling, TypeScript, or SCSS.

## Contribution
Feel free to fork this repo and submit pull requests. Ensure your changes follow the style in `style.css` and keep the HTML semantic.

## License
MIT – for a quick and easy project, anything goes.
