/**
 * Categories Module
 * Handles category-related functionality
 */

class Categories {
    constructor(data) {
        this.categories = data.categories || [];
        this.videos = data.videos || [];
        this.currentCategory = 'all';
    }

    /**
     * Get all categories
     */
    getCategories() {
        return this.categories;
    }

    /**
     * Get videos by category
     */
    getVideosByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.videos;
        }
        return this.videos.filter(video => video.category === categoryId);
    }

    /**
     * Set current category
     */
    setCurrentCategory(categoryId) {
        this.currentCategory = categoryId;
    }

    /**
     * Get current category
     */
    getCurrentCategory() {
        return this.currentCategory;
    }
}

