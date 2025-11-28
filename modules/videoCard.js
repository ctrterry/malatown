/**
 * Video Card Module
 * Handles video card creation and rendering
 */

class VideoCard {
    /**
     * Create a video card element
     */
    static create(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.setAttribute('data-video-id', video.id);

        // Thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.className = 'video-thumbnail';
        thumbnail.src = video.thumbnail || this.getDefaultThumbnail(video.youtubeUrl);
        thumbnail.alt = video.title;
        thumbnail.loading = 'lazy';

        // Video Info Container
        const info = document.createElement('div');
        info.className = 'video-info';

        // Title
        const title = document.createElement('h3');
        title.className = 'video-title';
        title.textContent = video.title;

        // Footer with channel link
        const footer = document.createElement('div');
        footer.className = 'video-footer';

        const channelLink = document.createElement('a');
        channelLink.href = video.channelUrl;
        channelLink.className = 'channel-link';
        channelLink.target = '_blank';
        channelLink.rel = 'noopener noreferrer';
        channelLink.onclick = (e) => e.stopPropagation(); // Prevent card click when clicking channel link

        // Channel icon (SVG)
        const channelIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        channelIcon.setAttribute('class', 'channel-icon');
        channelIcon.setAttribute('viewBox', '0 0 24 24');
        channelIcon.setAttribute('fill', 'currentColor');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z');
        channelIcon.appendChild(path);

        channelLink.appendChild(channelIcon);
        channelLink.appendChild(document.createTextNode('Channel'));

        footer.appendChild(channelLink);
        info.appendChild(title);
        info.appendChild(footer);

        card.appendChild(thumbnail);
        card.appendChild(info);

        // Add click event to redirect to YouTube
        card.addEventListener('click', () => {
            window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
        });

        return card;
    }

    /**
     * Get default thumbnail from YouTube URL
     */
    static getDefaultThumbnail(youtubeUrl) {
        const videoId = this.extractVideoId(youtubeUrl);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
        return 'https://via.placeholder.com/300x200?text=Video';
    }

    /**
     * Extract video ID from YouTube URL
     */
    static extractVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    /**
     * Render multiple video cards
     */
    static renderMultiple(videos, container) {
        container.innerHTML = '';
        
        if (videos.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <h2>No videos found</h2>
                <p>There are no videos in this category yet.</p>
            `;
            container.appendChild(emptyState);
            return;
        }

        videos.forEach(video => {
            const card = this.create(video);
            container.appendChild(card);
        });
    }
}

