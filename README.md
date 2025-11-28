# Mala Town - Video Collection Website

A clean and modern website for organizing and displaying multiple YouTube video links with category-based navigation.

## Features

- 🎬 **Video Collection**: Display multiple YouTube videos in a clean grid layout
- 📂 **Category Organization**: Organize videos by categories with easy navigation
- 🔗 **YouTube Integration**: Click videos to redirect to YouTube, or click channel links to visit YouTube channels
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, minimalist design with smooth animations
- 🧩 **Modular Code**: Well-organized, maintainable code structure

## Project Structure

```
malatown_Website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # Main application logic
├── data/
│   └── videos.json     # Video data (categories and videos)
├── modules/
│   ├── categories.js   # Category management module
│   ├── videoCard.js    # Video card rendering module
│   └── navigation.js   # Navigation module
└── README.md           # This file
```

## Setup Instructions

### 1. Add Your Videos

Edit `data/videos.json` to add your videos. Each video should have:

```json
{
  "id": 1,
  "title": "Your Video Title",
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
  "channelUrl": "https://www.youtube.com/channel/CHANNEL_ID",
  "thumbnail": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "category": "music"
}
```

### 2. Update Categories

In `data/videos.json`, update the categories array:

```json
{
  "categories": [
    {
      "id": "all",
      "name": "All Videos"
    },
    {
      "id": "your-category",
      "name": "Your Category Name"
    }
  ]
}
```

### 3. Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select your branch (usually `main` or `master`)
4. Your site will be available at `https://yourusername.github.io/repository-name/`

## How to Use

1. **View All Videos**: Click "All Videos" in the navigation
2. **Filter by Category**: Click any category tab to filter videos
3. **Watch Video**: Click on any video card to open it on YouTube
4. **Visit Channel**: Click the "Channel" button on any video card to visit the YouTube channel

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other colors */
}
```

### Layout

- Adjust grid columns in `styles.css` (`.videos-container`)
- Modify card sizes and spacing
- Customize header and footer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

---

Made with ❤️ for Mala Town

