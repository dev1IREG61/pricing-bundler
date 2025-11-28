// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Widget from './Widget';

// let isMounted = false;

// const mountWidgets = () => {
//   if (isMounted) return; // ← PREVENT INFINITE LOOP
//   isMounted = true;

//   document.querySelectorAll('[data-widget-id]').forEach(container => {
//     const widgetId = container.getAttribute('data-widget-id');
//     if (!widgetId || widgetId === "undefined") return;

//     const root = ReactDOM.createRoot(container);
//     root.render(<Widget widgetId={widgetId} />);
//   });
// };

// // Run once
// mountWidgets();

// // Optional: re-run if DOM changes (rarely needed)
// new MutationObserver(() => {
//   // Only re-mount if new containers appear
//   if (!isMounted) mountWidgets();
// }).observe(document.body, { childList: true, subtree: true });



// // src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Widget from './Widget';

// // Get slug from URL: ?slug=untitled-pricing-table-39
// function getSlug(): string | null {
//   const params = new URLSearchParams(window.location.search);
//   return params.get('slug');

  
// }



// const slug = getSlug();
//   console.log(slug);

// if (!slug || slug.trim() === '') {
//   document.body.innerHTML = `
//     <div style="font-family: system-ui, sans-serif; text-align: center; padding: 100px; color: #666; background: #f9fafb; min-height: 100vh;">
//       <h2>No widget slug found</h2>
//       <p style="font-size: 18px; margin-top: 16px;">
//         Use: <code style="background:#eee; padding:4px 8px; border-radius:6px;">?slug=your-widget-name</code>
//       </p>
//       <p style="margin-top: 20px; color: #888;">
//         Example: <br/>
//         <strong>https://pricing-bundler-green.vercel.app/?slug=untitled-pricing-table-39</strong>
//       </p>
//     </div>
//   `;
// } else {
//   // Create the container div with correct ID
//   let container = document.getElementById(`widget-${slug}`);

//   if (!container) {
//     container = document.createElement('div');
//     container.id = `widget-${slug}`;
//     container.style.cssText = `
//       max-width: 1300px;
//       margin: 40px auto;
//       padding: 20px;
//       background: white;
//       border-radius: 16px;
//       box-shadow: 0 20px 40px rgba(0,0,0,0.08);
//     `;
//     document.body.appendChild(container);
//   }

//   // Render the widget
//   const root = ReactDOM.createRoot(container);
//   root.render(<Widget widgetId={slug} />);
// }



// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Widget from './Widget';
import './index.css'; // Make sure you have this

// Check if we're in embed mode
function isEmbedMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('embed') === 'true' || window.location.pathname.startsWith('/embed/');
}

function getSlug(): string | null {
  const params = new URLSearchParams(window.location.search);
  let slug = params.get('slug');
  
  // Also check path for /embed/slug format
  if (!slug && window.location.pathname.startsWith('/embed/')) {
    slug = window.location.pathname.split('/embed/')[1];
  }
  
  return slug;
}

const slug = getSlug();
const embedMode = isEmbedMode();

if (embedMode) {
  // Embed mode - minimal styling
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.background = 'transparent';
}

if (!slug || slug.trim() === '') {
  document.body.innerHTML = `
    <div style="font-family: system-ui, sans-serif; text-align: center; padding: ${embedMode ? '20px' : '100px'}; color: #666; background: ${embedMode ? 'transparent' : '#f9fafb'}; min-height: ${embedMode ? 'auto' : '100vh'};">
      <h2>No widget slug found</h2>
      <p style="font-size: 18px; margin-top: 16px;">
        Use: <code style="background:#eee; padding:4px 8px; border-radius:6px;">?slug=your-widget-name</code>
      </p>
    </div>
  `;
} else {
  let container = document.getElementById(`widget-${slug}`);
  
  if (!container) {
    container = document.createElement('div');
    container.id = `widget-${slug}`;
    
    if (embedMode) {
      // Minimal styling for embed mode
      container.style.cssText = `
        margin: 0;
        padding: 0;
        background: transparent;
        width: 100%;
      `;
    } else {
      // Full page styling
      container.style.cssText = `
        max-width: 1300px;
        margin: 40px auto;
        padding: 20px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      `;
    }
    
    document.body.appendChild(container);
  }

  const root = ReactDOM.createRoot(container);
  root.render(<Widget widgetId={slug} />);
}