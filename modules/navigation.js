/**
 * Navigation Module
 * Handles category navigation
 */

class Navigation {
    /**
     * Render category navigation
     */
    static render(categories, currentCategory, onCategoryChange) {
        const navContainer = document.getElementById('navigation');
        if (!navContainer) return;

        const container = document.createElement('div');
        container.className = 'nav-container';

        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'nav-button';
            button.textContent = category.name;
            button.setAttribute('data-category', category.id);

            if (category.id === currentCategory) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                onCategoryChange(category.id);
            });

            container.appendChild(button);
        });

        navContainer.innerHTML = '';
        navContainer.appendChild(container);
    }

    /**
     * Update active category button
     */
    static updateActive(categoryId) {
        const buttons = document.querySelectorAll('.nav-button');
        buttons.forEach(button => {
            if (button.getAttribute('data-category') === categoryId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

