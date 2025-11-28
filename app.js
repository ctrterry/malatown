/**
 * Main Application
 * Coordinates all modules and handles the app logic
 */

let appData = null;
let categoriesManager = null;

/**
 * Initialize the application
 */
async function init() {
    try {
        // Load video data (works on GitHub Pages)
        // Use relative path - works whether at root or in subdirectory
        const response = await fetch('./data/videos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        appData = await response.json();

        // Initialize categories manager
        categoriesManager = new Categories(appData);

        // Render navigation
        renderNavigation();

        // Render initial videos (all videos)
        renderVideos('all');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load video data. Please refresh the page.');
    }
}

/**
 * Render category navigation
 */
function renderNavigation() {
    const categories = categoriesManager.getCategories();
    const currentCategory = categoriesManager.getCurrentCategory();

    Navigation.render(categories, currentCategory, (categoryId) => {
        categoriesManager.setCurrentCategory(categoryId);
        Navigation.updateActive(categoryId);
        renderVideos(categoryId);
    });
}

/**
 * Render videos based on selected category
 */
function renderVideos(categoryId) {
    const videos = categoriesManager.getVideosByCategory(categoryId);
    const container = document.getElementById('videosContainer');

    if (container) {
        VideoCard.renderMultiple(videos, container);
    }
}

/**
 * Show error message
 */
function showError(message) {
    const container = document.getElementById('videosContainer');
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Error</h2>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

