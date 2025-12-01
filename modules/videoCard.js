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

        // Check if this is a PDF document
        const isPDF = video.pdfUrl !== undefined;

        // Thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.className = 'video-thumbnail';
        if (isPDF) {
            thumbnail.src = video.thumbnail || 'https://via.placeholder.com/300x200?text=PDF+Document';
        } else {
            thumbnail.src = video.thumbnail || this.getDefaultThumbnail(video.youtubeUrl);
        }
        thumbnail.alt = video.title;
        thumbnail.loading = 'lazy';

        // Video Info Container
        const info = document.createElement('div');
        info.className = 'video-info';

        // Title
        const title = document.createElement('h3');
        title.className = 'video-title';
        title.textContent = video.title;

        // Footer with channel link (only for videos, not PDFs)
        const footer = document.createElement('div');
        footer.className = 'video-footer';

        if (!isPDF && video.channelUrl) {
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
        } else if (isPDF) {
            // PDF icon for PDF documents
            const pdfLink = document.createElement('div');
            pdfLink.className = 'channel-link';
            pdfLink.style.cursor = 'default';

            const pdfIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            pdfIcon.setAttribute('class', 'channel-icon');
            pdfIcon.setAttribute('viewBox', '0 0 24 24');
            pdfIcon.setAttribute('fill', 'currentColor');
            const pdfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pdfPath.setAttribute('d', 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z');
            pdfIcon.appendChild(pdfPath);

            pdfLink.appendChild(pdfIcon);
            pdfLink.appendChild(document.createTextNode('PDF Document'));

            footer.appendChild(pdfLink);
        }

        info.appendChild(title);
        info.appendChild(footer);

        card.appendChild(thumbnail);
        card.appendChild(info);

        // Add click event - show embedded player for videos, open new tab for PDFs
        card.addEventListener('click', () => {
            if (isPDF) {
                // For documents, keep behavior as open in a new tab
                window.open(video.pdfUrl, '_blank', 'noopener,noreferrer');
            } else {
                // For videos, open an embedded player modal
                this.openVideoModal(video);
            }
        });

        return card;
    }

    /**
     * Ensure the video modal elements exist in the DOM
     */
    static ensureVideoModal() {
        let overlay = document.querySelector('.video-modal-overlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'video-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'video-modal';

        const header = document.createElement('div');
        header.className = 'video-modal-header';

        const title = document.createElement('h2');
        title.className = 'video-modal-title';

        const closeButton = document.createElement('button');
        closeButton.className = 'video-modal-close';
        closeButton.type = 'button';
        closeButton.innerHTML = '&times;';

        const body = document.createElement('div');
        body.className = 'video-modal-body';

        const iframeWrapper = document.createElement('div');
        iframeWrapper.className = 'video-modal-iframe-wrapper';

        const iframe = document.createElement('iframe');
        iframe.className = 'video-modal-iframe';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');

        iframeWrapper.appendChild(iframe);
        body.appendChild(iframeWrapper);
        header.appendChild(title);
        header.appendChild(closeButton);
        modal.appendChild(header);
        modal.appendChild(body);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close interactions
        closeButton.addEventListener('click', () => this.closeVideoModal());
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                this.closeVideoModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeVideoModal();
            }
        });

        return overlay;
    }

    /**
     * Open the video modal with the given video
     */
    static openVideoModal(video) {
        const overlay = this.ensureVideoModal();
        const iframe = overlay.querySelector('.video-modal-iframe');
        const titleEl = overlay.querySelector('.video-modal-title');

        // Extract YouTube video ID and construct embed URL
        const videoId = this.extractVideoId(video.youtubeUrl);
        if (!videoId) {
            // Fallback: if we can't get an ID, open in a new tab
            window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.src = embedUrl;
        titleEl.textContent = video.title || 'Video';

        overlay.classList.add('is-visible');
        document.body.classList.add('video-modal-open');
    }

    /**
     * Close the video modal and stop playback
     */
    static closeVideoModal() {
        const overlay = document.querySelector('.video-modal-overlay');
        if (!overlay) return;

        const iframe = overlay.querySelector('.video-modal-iframe');
        if (iframe) {
            // Reset src to stop the video
            iframe.src = '';
        }

        overlay.classList.remove('is-visible');
        document.body.classList.remove('video-modal-open');
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

