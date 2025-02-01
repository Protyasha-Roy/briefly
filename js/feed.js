document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    // Set initial active tab based on URL hash or default to blog
    const setInitialTab = () => {
        const hash = window.location.hash || '#blog';
        const activeTab = document.querySelector(`.nav-link[href="${hash}"]`);
        if (activeTab) {
            switchTab(activeTab);
        }
    };

    const switchTab = (tabElement) => {
        // Remove active class from all tabs and contents
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tabElement.classList.add('active');
        const contentId = tabElement.getAttribute('href').substring(1);
        document.getElementById(contentId).classList.add('active');
    };

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab);
            // Update URL hash without scrolling
            history.pushState(null, '', tab.getAttribute('href'));
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', setInitialTab);

    // Set initial active tab
    setInitialTab();

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const article = button.closest('.blog-article, .news-item');
            let content = '';
            let filename = '';

            if (article.classList.contains('blog-article')) {
                const title = article.querySelector('h2').textContent;
                const date = article.querySelector('.date').textContent;
                const readTime = article.querySelector('.read-time').textContent;
                const text = article.querySelector('p').textContent;
                const category = article.querySelector('.category').textContent;

                content = `${title}\n\nDate: ${date}\nRead Time: ${readTime}\nCategory: ${category}\n\n${text}`;
                filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
            } else {
                const title = article.querySelector('h3').textContent;
                const points = Array.from(article.querySelectorAll('.news-points li'))
                    .map(li => `- ${li.textContent}`)
                    .join('\n');
                const timestamp = article.querySelector('.timestamp').textContent;

                content = `${title}\n\nKey Points:\n${points}\n\nPublished: ${timestamp}`;
                filename = `news-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
            }

            // Create and trigger download
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    });

    // Subscribe button functionality
    const subscribeBtn = document.querySelector('.subscribe-btn');
    subscribeBtn.addEventListener('click', () => {
        window.location.href = '/subscribe.html';
    });

    // Update interests button functionality
    const updateInterestsBtn = document.querySelector('.update-interests');
    if (updateInterestsBtn) {
        updateInterestsBtn.addEventListener('click', () => {
            window.location.href = '/interests.html';
        });
    }
});