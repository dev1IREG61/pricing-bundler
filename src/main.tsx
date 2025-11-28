import React from 'react';
import ReactDOM from 'react-dom/client';
import Widget from './Widget';

let isMounted = false;

const mountWidgets = () => {
  if (isMounted) return; // ← PREVENT INFINITE LOOP
  isMounted = true;

  document.querySelectorAll('[data-widget-id]').forEach(container => {
    const widgetId = container.getAttribute('data-widget-id');
    if (!widgetId || widgetId === "undefined") return;

    const root = ReactDOM.createRoot(container);
    root.render(<Widget widgetId={widgetId} />);
  });
};

// Run once
mountWidgets();

// Optional: re-run if DOM changes (rarely needed)
new MutationObserver(() => {
  // Only re-mount if new containers appear
  if (!isMounted) mountWidgets();
}).observe(document.body, { childList: true, subtree: true });