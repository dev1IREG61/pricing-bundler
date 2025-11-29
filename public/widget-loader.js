// (function() {
//   'use strict';
  
//   function loadWidget(slug) {
//     console.log('Loading widget:', slug);
    
//     // Create or find container
//     let container = document.getElementById('widget-' + slug);
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       container.className = 'pricing-widget-container';
//       document.body.appendChild(container);
//     }

//     // Create iframe
//     const iframe = document.createElement('iframe');
//     iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug + '&embed=true';
//     iframe.style.cssText = `
//       width: 100%;
//       height: 600px;
//       border: none;
//       display: block;
//     `;
    
//     iframe.onload = function() {
//       // Adjust height based on content
//       try {
//         const height = iframe.contentWindow.document.documentElement.scrollHeight;
//         iframe.style.height = height + 'px';
//       } catch (e) {
//         // Cross-origin frame, use fixed height
//         iframe.style.height = '600px';
//       }
//     };

//     container.style.cssText = `
//       max-width: 1300px;
//       margin: 20px auto;
//       background: transparent;
//     `;
    
//     container.innerHTML = '';
//     container.appendChild(iframe);
//   }

//   // Get slug from script URL parameters
//   const currentScript = document.currentScript;
//   if (currentScript) {
//     const urlParams = new URLSearchParams(currentScript.src.split('?')[1]);
//     const slug = urlParams.get('slug');
//     if (slug) {
//       // Wait for DOM to be ready
//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', function() {
//           loadWidget(slug);
//         });
//       } else {
//         loadWidget(slug);
//       }
//     }
//   }
// })();



// // public/widget-loader.js - FOR LOCAL TESTING
// (function() {
//   'use strict';
  
//   function loadWidget(slug) {
//     console.log('Loading widget:', slug);
    
//     // Create or find container
//     let container = document.getElementById('widget-' + slug);
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       container.className = 'pricing-widget-container';
//       document.body.appendChild(container);
//     }

//     // Create iframe - USE LOCALHOST FOR TESTING
//     const iframe = document.createElement('iframe');
//     iframe.src = 'http://localhost:5173/?slug=' + slug + '&embed=true';
//     iframe.style.cssText = `
//       width: 100%;
//       height: 600px;
//       border: none;
//       display: block;
//     `;
    
//     iframe.onload = function() {
//       console.log('Widget iframe loaded');
//     };

//     iframe.onerror = function() {
//       console.error('Failed to load widget iframe');
//       container.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Failed to load widget</div>';
//     };

//     container.style.cssText = `
//       max-width: 1300px;
//       margin: 20px auto;
//       background: transparent;
//     `;
    
//     container.innerHTML = '';
//     container.appendChild(iframe);
//   }

//   // Get slug from script URL parameters
//   const currentScript = document.currentScript;
//   if (currentScript) {
//     const urlParams = new URLSearchParams(currentScript.src.split('?')[1]);
//     const slug = urlParams.get('slug');
//     console.log('Found slug:', slug);
    
//     if (slug) {
//       // Wait for DOM to be ready
//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', function() {
//           loadWidget(slug);
//         });
//       } else {
//         loadWidget(slug);
//       }
//     } else {
//       console.error('No slug parameter found');
//     }
//   }
// })();



// // FINAL VERSION — COPY-PASTE THIS (best one)

// (function() {
//   'use strict';
  
//   function loadWidget(slug) {
//     let container = document.getElementById('widget-' + slug);
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       document.body.appendChild(container);
//     }

//     // CLEANEST POSSIBLE STYLING
//     container.style.cssText = `
//       all: initial;
//       display: block;
//       font-family: system-ui, -apple-system, sans-serif;
//       width: 100%;
//       max-width: 1300px;
//       margin: 40px auto;
//       padding: 0;
//       box-sizing: border-box;
//     `;

//     const iframe = document.createElement('iframe');
//     iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug;
//     iframe.style.cssText = `
//       width: 100%;
//       border: none;
//       display: block;
//       min-height: 700px;
//       background: transparent;
//     `;
//     iframe.scrolling = "no";
//     iframe.allowTransparency = "true";

//     // Auto resize
//     iframe.onload = function() {
//       try {
//         const height = iframe.contentWindow.document.body.scrollHeight;
//         iframe.style.height = (height + 60) + 'px';
//       } catch (e) {
//         iframe.style.height = '900px';
//       }
//     };

//     container.innerHTML = '';
//     container.appendChild(iframe);
//   }

//   const script = document.currentScript;
//   if (script) {
//     const url = new URL(script.src);
//     const slug = url.searchParams.get('slug');
//     if (slug) {
//       document.readyState === 'loading' 
//         ? document.addEventListener('DOMContentLoaded', () => loadWidget(slug))
//         : loadWidget(slug);
//     }
//   }
// })();


// EMERGENCY DEMO FIX — WORKS 100% EVEN WITH CORS
(function() {
  'use strict';
  
  function loadWidget(slug) {
    let container = document.getElementById('widget-' + slug);
    if (!container) {
      container = document.createElement('div');
      container.id = 'widget-' + slug;
      document.body.appendChild(container);
    }

    container.innerHTML = ''; // Clear
    container.style.cssText = 'width:100%; max-width:1300px; margin:0 auto; padding:0;';

    const iframe = document.createElement('iframe');
    iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug;
    iframe.style.cssText = `
      width: 100% !important;
      min-height: 900px !important;
      height: 2000px !important;
      border: none !important;
      display: block !important;
      overflow: hidden !important;
    `;
    iframe.scrolling = "no";
    iframe.frameBorder = "0";

    container.appendChild(iframe);
  }

  // Get slug from script tag
  const script = document.currentScript || document.querySelector('script[src*="widget-loader"]');
  if (script) {
    const url = new URL(script.src);
    const slug = url.searchParams.get('slug');
    if (slug) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => loadWidget(slug));
      } else {
        loadWidget(slug);
      }
    }
  }
})();