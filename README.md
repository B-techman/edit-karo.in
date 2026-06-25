# Editkaro.in - Agency Portfolio Webpage

A premium, interactive, and responsive portfolio website designed for **Editkaro.in**—a social media marketing and video editing agency. Built with modern vanilla web standards (HTML5, CSS3, and JavaScript), it features custom micro-animations, a multi-page architecture, an interactive color grading comparison slider, and an instant project package quote estimator.

---

## 🚀 Live Preview

To view the pages locally, run a local web server (e.g. Python) in the root directory:

```bash
# Using Python 3
python3 -m http.server 8000
```

Once running, navigate to: **[http://localhost:8000](http://localhost:8000)**

---

## ⚡ Core Features

1. **Multi-Page Architecture**:
   - Clean separation of concerns with dedicated pages for Home, Showcase, About Us, and Contact.
   
2. **Serverless Form Integration (Google Sheets)**:
   - Both the Email Collector and Contact forms are wired to send data directly to a Google Sheet via a Google Apps Script backend API, without needing a traditional database.

3. **Viewport-Triggered Counters**:
   - Agency metrics (views, active creators, completed videos) count up dynamically when scrolled into view.

4. **Interactive Portfolio Filtering (Showcase Page)**:
   - Filter clips across multiple categories (Short-Form, Long-Form, Gaming, Football Edits, eCommerce Ads, Documentary, Color Grading, Anime Edits, Ads).

5. **Play-on-Hover Video Previews & Lightbox**:
   - Hovering over a portfolio card hides the static thumbnail and plays a short looped video preview.
   - Clicking a card launches a native HTML5 `<dialog>` modal showing the video at full resolution.

6. **Interactive Before/After Grading Comparison**:
   - A drag-to-slide interface letting users compare raw LOG flat camera sensor data (left) with finished color-graded cinematic video (right).

7. **Monthly Package Pricing Estimator (Contact Page)**:
   - Live sliding controls and checkboxes to calculate a custom project outline.
   - Values automatically populate the contact form's quote field.

---

## 📂 Project Structure

```text
editkaro-portfolio/
├── index.html              # Home page with Hero, Stats, and Email Collector
├── portfolio.html          # Showcase page with video grid and grading slider
├── about.html              # About Us page with Mission, Vision, and Team
├── contact.html            # Contact page with Estimator and Form
├── style.css               # Core design system and responsive layouts
├── script.js               # Cross-page conditional logic and AJAX form submissions
├── google-apps-script.js   # Standalone backend script for Google Sheets integration
└── README.md               # Project overview and development report
```

---

## 📊 Development Report

### Changes Made
- **Architectural Refactoring:** Upgraded the initial single-page application into a scalable multi-page website consisting of Home, Showcase, About Us, and Contact pages.
- **Email Collector Integration:** Added a sleek newsletter subscription form to the Home page to capture leads.
- **Team Profiles:** Designed and implemented an "Our Team" section with placeholder profiles and imagery on the About Us page.
- **Backend Setup:** Wrote a `google-apps-script.js` file and integrated frontend `fetch` API logic to connect the website's forms directly to Google Sheets for permanent data storage.

### Challenges Faced
1. **Data Persistence Without a Backend:** The most significant challenge was finding a way to securely and persistently store form submissions (emails and contact requests) without setting up a dedicated backend server, a database like PostgreSQL, or requiring the user to pay for hosting infrastructure.
2. **Cross-Page JavaScript Errors:** After splitting the single HTML file into multiple pages, the global `script.js` file began throwing `TypeError: null is not an object` errors because it was trying to attach event listeners to DOM elements (like the pricing slider or the portfolio grid) that did not exist on every page.

### How They Were Overcome
1. **Google Apps Script API Endpoint:** To solve the data persistence issue, we leveraged Google Apps Script as a serverless backend. We created a `.gs` script that acts as an API endpoint. When deployed as a Web App, it securely receives JSON/FormData payloads from our frontend `fetch` requests and appends them directly to a Google Sheet, completely free of charge.
2. **Conditional DOM Logic:** To resolve the JavaScript errors, we refactored `script.js` to be context-aware. We wrapped all event listener attachments and UI logic in conditional checks (e.g., `if (sliderContainer) { ... }`). We also utilized a `data-page` attribute on the `<body>` tag to allow the script to execute specific functions only when the relevant page is loaded, ensuring a robust, error-free experience across the entire site.
