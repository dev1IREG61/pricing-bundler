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
// (function() {
//   'use strict';
  
//   function loadWidget(slug) {
//     let container = document.getElementById('widget-' + slug);
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       document.body.appendChild(container);
//     }

//     container.innerHTML = ''; // Clear
//     container.style.cssText = 'width:100%; max-width:1300px; margin:0 auto; padding:0;';

//     const iframe = document.createElement('iframe');
//     iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug;
//     iframe.style.cssText = `
//       width: 100% !important;
//       min-height: 900px !important;
//       height: 2000px !important;
//       border: none !important;
//       display: block !important;
//       overflow: hidden !important;
//     `;
//     iframe.scrolling = "no";
//     iframe.frameBorder = "0";

//     container.appendChild(iframe);
//   }

//   // Get slug from script tag
//   const script = document.currentScript || document.querySelector('script[src*="widget-loader"]');
//   if (script) {
//     const url = new URL(script.src);
//     const slug = url.searchParams.get('slug');
//     if (slug) {
//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', () => loadWidget(slug));
//       } else {
//         loadWidget(slug);
//       }
//     }
//   }
// })();

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

// (function() {
//   'use strict';
  
//   function loadWidget(slug) {
//     // First, try to find an existing container with the ID
//     let container = document.getElementById('widget-' + slug);
    
//     // If not found, create one and append to body (fallback - bottom)
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       document.body.appendChild(container);
//     }

//     container.innerHTML = ''; // Clear previous content
//     container.style.cssText = 'width:100%; max-width:1300px; margin:0 auto; padding:0;';

//     const iframe = document.createElement('iframe');
//     iframe.src = 'https://pricing-bundler-green.vercel.app/?slug=' + slug;
//     iframe.style.cssText = `
//       width: 100% !important;
//       min-height: 900px !important;
//       height: 2000px !important;
//       border: none !important;
//       display: block !important;
//       overflow: hidden !important;
//     `;
//     iframe.scrolling = "no";
//     iframe.frameBorder = "0";

//     container.appendChild(iframe);
//   }

//   // Get slug from script tag
//   const script = document.currentScript || document.querySelector('script[src*="widget-loader"]');
//   if (script) {
//     const url = new URL(script.src);
//     const slug = url.searchParams.get('slug');
//     if (slug) {
//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', () => loadWidget(slug));
//       } else {
//         loadWidget(slug);
//       }
//     }
//   }
// })();

// // widget-loader.js → FINAL PERFECT FINAL VERSION (Centered + No Dots)
// (function () {
//   'use strict';

//   async function start() {
//     const script = document.currentScript || document.querySelector('script[src*="widget-loader"]');
//     if (!script) return;

//     const url = new URL(script.src);
//     const slug = url.searchParams.get('slug');
//     if (!slug) return;

//     let container = document.getElementById('widget-' + slug);
//     if (!container) {
//       container = document.createElement('div');
//       container.id = 'widget-' + slug;
//       document.body.appendChild(container);
//     }

//     container.innerHTML = `<div style="padding:100px;text-align:center;color:#999;font-family:system-ui;">Loading...</div>`;

//     try {
//       const res = await fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/public/${slug}/`);
//       if (!res.ok) throw new Error('NotFound');

//       const json = await res.json();
//       const widget = json.data.data;
//       const appearance = widget.appearance || {};
//       const cards = widget.multiTableMode && widget.tables?.length ? widget.tables[0].cards : widget.cards;

//       const styles = {
//         font: appearance.font || 'Inter',
//         fontSize: appearance.fontSize || 16,
//         primaryColor: appearance.primaryColor || '#7c3aed',
//         buttonRadius: appearance.buttonRadius ?? 50,
//         buttonType: appearance.buttonType || 'outline'
//       };

//       let html = `
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
//         .pw *{box-sizing:border-box}
//         .pw{font-family:'Inter',sans-serif;max-width:1300px;margin:0 auto;padding:40px 20px;color:${styles.primaryColor};line-height:1.6}
//         .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:32px;margin-top:40px}
//         .card{background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.1);transition:.4s}
//         .card:hover{transform:translateY(-12px);box-shadow:0 32px 64px rgba(0,0,0,.15)}
//         .card img{width:100%;height:220px;object-fit:cover}
//         .c{padding:36px;text-align:center}
//         .title{font-size:${styles.fontSize*1.9}px;font-weight:700;margin:0 0 8px}
//         .price{font-size:${styles.fontSize*3.2}px;font-weight:700;margin:24px 0}
//         .period{font-size:${styles.fontSize*1.4}px;opacity:.9;margin-left:6px}
//         .desc{color:#6b7280;margin:16px 0 32px;font-size:${styles.fontSize*1.05}px}
//         .features{margin:32px 0}
//         .features li{
//           margin:14px 0;
//           font-size:${styles.fontSize*1.05}px;
//           display:flex;
//           align-items:;
//           justify-content:;
//           gap:10px;
//         }
//         .features li::before{
//           content:"";
//           color:${styles.primaryColor};
//           font-weight:bold;
//           font-size:1.4em;
//         }
//         .btn{
//           width:100%;
//           padding:18px;
//           font-size:${styles.fontSize*1.2}px;
//           font-weight:600;
//           border-radius:${styles.buttonRadius}px;
//           border:${styles.buttonType==='outline'?'3px solid '+styles.primaryColor:'none'};
//           background:${styles.buttonType==='filled'?styles.primaryColor:'transparent'};
//           color:${styles.buttonType==='outline'?styles.primaryColor:'#fff'};
//           cursor:pointer;
//           transition:.3s;
//         }
//         .btn:hover{opacity:.92;transform:translateY(-2px)}
//       </style>

//       <div class="pw">
//         <div class="grid">`;

//       cards.forEach(card => {
//         const priceColor = card.priceColor || styles.primaryColor;

//         html += `
//           <div class="card">
//             ${card.imageUrl ? `<img src="${card.imageUrl}" alt="${card.title}">` : ''}
//             <div class="c">
//               <h3 class="title">${card.title}</h3>
//               <div class="price" style="color:${priceColor}">
//                 ${card.price}<span class="period">${card.period}</span>
//               </div>
//               <p class="desc">${card.description}</p>
              
//               <ul class="features">
//                 ${card.features.map(f => `<li>${f.text}</li>`).join('')}
//               </ul>
              
//               <button class="btn">${card.buttonText || 'Book now'}</button>
//             </div>
//           </div>`;
//       });

//       html += `</div></div>`;
//       container.innerHTML = html;

//     } catch (e) {
//       container.innerHTML = `<div style="padding:100px;text-align:center;color:#ef4444;font-family:system-ui;">
//         <h3>Widget failed to load</h3><p>${e.message}</p>
//       </div>`;
//     }
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', start);
//   } else {
//     start();
//   }
// })();