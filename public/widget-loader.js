(function () {
  'use strict';

  function loadWidget(slug) {
    if (!slug) return;

    // Look for existing container with correct ID
    let container = document.getElementById(slug);

    // If not found, create fallback at bottom (safety)
    if (!container) {
      container = document.createElement('div');
      container.id = slug;
      document.body.appendChild(container);
    }

    // Clear loading message
    container.innerHTML = '';

    // Style container
    container.style.cssText = 'width:100%; max-width:1300px; margin:0 auto; padding:0;';

    const iframe = document.createElement('iframe');
    iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug;
    iframe.style.cssText = `
      width: 100% !important;
      min-height: 800px !important;
      border: none !important;
      display: block !important;
    `;
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';

    container.appendChild(iframe);

    let lastSetHeight = 0;
    
    iframe.onload = function() {
      try {
        const height = iframe.contentWindow.document.documentElement.scrollHeight;
        iframe.style.height = height + 'px';
        lastSetHeight = height;
      } catch (e) {
        // Cross-origin, use postMessage
      }
    };
    
    window.addEventListener('message', (e) => {
      if (e.data.type === 'resize' && e.data.height) {
        const newHeight = e.data.height;
        // Only update if height changed significantly
        if (Math.abs(newHeight - lastSetHeight) > 10) {
          iframe.style.height = newHeight + 'px';
          lastSetHeight = newHeight;
        }
      }
    });
  }

  const script = document.currentScript;
  if (script) {
    try {
      const url = new URL(script.src);
      const slug = url.searchParams.get('slug');
      if (slug) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => loadWidget(slug));
        } else {
          loadWidget(slug);
        }
      }
    } catch (e) {
      console.warn('Failed to load widget slug');
    }
  }
})();