# Editkaro.in - Agency Portfolio Webpage

A premium, interactive, and responsive portfolio webpage designed for **Editkaro.in**—a social media marketing and video editing agency. Built with modern vanilla web standards (HTML5, CSS3, and JavaScript), it features custom micro-animations, play-on-hover video cards, an interactive color grading comparison slider, and an instant project package quote estimator.

---

## 🚀 Live Preview

To view the page locally, run a local web server (e.g. Python) in the root directory:

```bash
# Using Python 3
python3 -m http.server 8000
```

Once running, navigate to: **[https://edit-karoin.vercel.app](https://edit-karoin.vercel.app)**

---

## ⚡ Core Features

1. **Scroll-Spy & Sticky Glassmorphism Header**:
   - Navigation links automatically highlight as you scroll through page sections.
   - Header blurs and shrinks on scroll to maximize viewport real estate.
   - Animated mobile drawer navigation for optimal responsiveness on smaller screens.
   
2. **Viewport-Triggered Counters**:
   - Agency metrics (views, active creators, completed videos) count up dynamically when scrolled into view.

3. **Interactive Portfolio Filtering**:
   - Filter clips across multiple categories (Short-Form, Long-Form, Gaming, Football Edits, eCommerce Ads, Documentary, Color Grading, Anime Edits, Ads).
   - Smooth scale-and-fade transition animations on category switching.

4. **Play-on-Hover Video Previews**:
   - Moving your mouse over any portfolio card hides the static thumbnail and plays a short looped video preview.
   - Leaving the card immediately pauses and resets the preview to frame one.

5. **HTML5 Dialog Video Lightbox**:
   - Clicking a card launches a native HTML5 `<dialog>` modal showing the video at full resolution with corresponding view counts and labels.

6. **Interactive Before/After Grading Comparison**:
   - A drag-to-slide interface letting users compare raw LOG flat camera sensor data (left) with finished color-graded cinematic video (right).
   - Built with touch-friendly controls (`touchmove`) for perfect mobile and tablet interaction.

7. **Monthly Package Pricing Estimator**:
   - Live sliding controls and checkboxes to calculate a custom project outline.
   - "Lock Deal" action copies details directly to the contact form fields.

8. **Glassmorphism Testimonials Carousel**:
   - Seamless horizontal reviews carousel that pauses automatically when hovered over.

---

## 📂 Project Structure

```text
editkaro-portfolio/
├── index.html     # Page content, semantic tags & SVG icons
├── style.css      # Core design system, glassmorphism, animations & mobile layouts
├── script.js     # Carousel, sliders, calculations, and modal controllers
└── README.md      # Project overview and customization guide
```

---

## 🎨 Customization Guide

### 1. Changing Portfolio Videos & Previews
Open `index.html` and locate the `.portfolio-item` grid cards. Update the following tags:
- **Thumbnail Image**: Change the `src` attribute of the `<img>` with class `.card-thumb`.
- **Preview Loop**: Change the `src` attribute of the `<video>` with class `.card-video`.

```html
<div class="portfolio-item" data-category="short-form">
  <div class="portfolio-card">
    <div class="card-media">
      <!-- Thumbnail -->
      <img src="YOUR_NEW_THUMBNAIL.jpg" class="card-thumb" alt="Thumbnail">
      <!-- Video Loop -->
      <video class="card-video" loop muted playsinline src="YOUR_NEW_VIDEO.mp4"></video>
      ...
    </div>
  </div>
</div>
```

### 2. Updating Color Grading Images
The Before/After grading comparison uses Unsplash asset loops. If you want to use your own assets, open `index.html` inside `<section id="color-grading">` and change the `src` of the images in:
- `.image-before img` (RAW LOG Look)
- `.image-after img` (Cinematic Grade Look)

*Note: For the best visual alignment, ensure both images have identical aspect ratios and resolutions.*

### 3. Adjusting Estimated Package Prices
To adjust base pricing per video category, edit the `data-price` properties inside the select dropdown options of `index.html`:

```html
<select id="calc-category" class="form-select">
  <option value="short-form" data-price="75">Short-form Video ($75/video)</option>
  <option value="long-form" data-price="250">Long-form Vlog ($250/video)</option>
  ...
</select>
```

To modify add-on pricing, change the checkbox values:
```html
<input type="checkbox" id="add-thumbnail" value="25"> <!-- Add $25/video -->
```
The logic inside `script.js` will automatically pick up your HTML value changes and calculate the values in real-time.
