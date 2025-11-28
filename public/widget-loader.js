// public/widget-loader.js - FOR LOCAL TESTING
(function() {
  'use strict';
  
  function loadWidget(slug) {
    console.log('Loading widget:', slug);
    
    // Create or find container
    let container = document.getElementById('widget-' + slug);
    if (!container) {
      container = document.createElement('div');
      container.id = 'widget-' + slug;
      container.className = 'pricing-widget-container';
      document.body.appendChild(container);
    }

    // Create iframe - USE LOCALHOST FOR TESTING
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:5173/?slug=' + slug + '&embed=true';
    iframe.style.cssText = `
      width: 100%;
      height: 600px;
      border: none;
      display: block;
    `;
    
    iframe.onload = function() {
      console.log('Widget iframe loaded');
    };

    iframe.onerror = function() {
      console.error('Failed to load widget iframe');
      container.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Failed to load widget</div>';
    };

    container.style.cssText = `
      max-width: 1300px;
      margin: 20px auto;
      background: transparent;
    `;
    
    container.innerHTML = '';
    container.appendChild(iframe);
  }

  // Get slug from script URL parameters
  const currentScript = document.currentScript;
  if (currentScript) {
    const urlParams = new URLSearchParams(currentScript.src.split('?')[1]);
    const slug = urlParams.get('slug');
    console.log('Found slug:', slug);
    
    if (slug) {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          loadWidget(slug);
        });
      } else {
        loadWidget(slug);
      }
    } else {
      console.error('No slug parameter found');
    }
  }
})();