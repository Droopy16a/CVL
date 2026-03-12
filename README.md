# OSILYS CVL Website

**Overview**
A single-page React site for the OSILYS CVL project. It features a full-screen hero and an interactive card carousel with flip details for each pole.

**Features**
- Full-screen landing section
- Horizontal card carousel with drag and swipe
- Card flip to reveal details
- Responsive layout tweaks for mobile

**Tech Stack**
- React (Create React App)
- CSS stylesheets

**Getting Started**
Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

**Build**
Create a production build:

```bash
npm run build
```

**Project Structure**
- `src/scripts` React components (Main, Turn, Card)
- `src/css` styling for the layout and cards
- `src/assets` images and fonts
- `public` static HTML shell

**Customize Content**
- Update hero text in `src/scripts/main.js`
- Update card data and images in `src/scripts/Turn.js`
- Tweak colors and typography in `src/css/index.css` and `src/css/Card.css`

**Notes**
- Custom fonts live in `src/assets/font`.
- Images and backgrounds are in `src/assets/img`.
