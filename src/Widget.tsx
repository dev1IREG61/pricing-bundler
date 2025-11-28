// // import React, { useState, useEffect } from 'react';
// // import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// // import { PricingCardPreview } from './previews/PricingCardPreview';

// // interface WidgetData {
// //   id: string;
// //   type: string;
// //   name: string;
// //   data: any;
// //   appearance: any;
// // }

// // const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
// //   const [widget, setWidget] = useState<WidgetData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(false);

// //   useEffect(() => {
// //     // Only run if widgetId is valid
// //     if (!widgetId || widgetId === "undefined" || widgetId.trim() === "") {
// //       setLoading(false);
// //       setError(true);
// //       return;
// //     }

// //     const fetchWidget = async () => {
// //       try {
// //         console.log("Fetching widget with ID:", widgetId);

// //         // USE THE PROP — NOT HARDCODED!
// //         const res = await fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/fef28c1f-85ee-4954-8927-e09bf094a6ce/`);

// //         if (!res.ok) {
// //           const err = await res.json().catch(() => ({}));
// //           console.error("API Error:", err);
// //           throw new Error(err.detail || err.message || "Widget not found");
// //         }

// //         const result = await res.json();
// //         console.log("Success:", result);

// //         // Your API returns: { success: true, data: { ... } }
// //         setWidget(result.data);
// //       } catch (err: any) {
// //         console.error("Fetch failed:", err);
// //         setError(true);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchWidget();
// //   }, [widgetId]); // ← Only runs when widgetId changes

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div style={{ padding: '60px', textAlign: 'center', fontSize: '18px', color: '#666' }}>
// //         Loading your widget...
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error || !widget) {
// //     return (
// //       <div style={{ padding: '60px', textAlign: 'center', color: '#ef4444', fontSize: '18px' }}>
// //         Widget not found
// //         <br />
// //         <small style={{ color: '#999' }}>ID: {widgetId || "missing"}</small>
// //       </div>
// //     );
// //   }

// //   // Success — render widget
// //   return (
// //     <div
// //       style={{
// //         fontFamily: widget.appearance?.font || 'Inter, sans-serif',
// //         fontWeight: widget.appearance?.fontWeight || '400',
// //         fontSize: `${widget.appearance?.fontSize || 16}px`,
// //         lineHeight: '1.6',
// //       }}
// //     >
// //       {widget.type === "comparison_table" ? (
// //         <ComparisonTablePreview data={widget.data} appearance={widget.appearance} />
// //       ) : widget.type === "pricing_columns" ? (
// //         <PricingCardPreview data={widget.data} appearance={widget.appearance} />
// //       ) : (
// //         <div style={{ padding: '60px', textAlign: 'center', color: '#ef4444' }}>
// //           Unsupported widget type: {widget.type}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Widget;


// // import React, { useState, useEffect } from 'react';
// // import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// // import { PricingCardPreview } from './previews/PricingCardPreview';

// // interface WidgetData {
// //   id: string;
// //   type: string;
// //   name: string;
// //   data: any;
// //   appearance: any;
// // }

// // const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
// //   const [widget, setWidget] = useState<WidgetData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(false);

// //   // YOUR MANUALLY ADDED BEARER TOKEN
// //   const BEARER_TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MTY5MjM1LCJpYXQiOjE3NjQxNjU2MzUsImp0aSI6IjkxYmVkNGE0YWIwMjQyMDc4YWEzYjg1Y2VjMzJjNDc3IiwidXNlcl9pZCI6NX0.D9fCbKd_1FnPQH2l4aH28oRlG0wZf0i9QiCROD1ElVSWO4Ctr07tfcZavnHEN34UW8B0DX8C7qVfnU88gwUemg";

// //   useEffect(() => {
// //     if (!widgetId || widgetId === "undefined" || widgetId.trim() === "") {
// //       setLoading(false);
// //       setError(true);
// //       return;
// //     }

// //     const fetchWidget = async () => {
// //       try {
// //         console.log("Fetching widget:", widgetId);

// //         const res = await fetch(
// //           `https://esign-admin.signmary.com/api/widgets/widget-data/b8dc46d7-01fe-469d-8568-3b025c796cdd/`,
// //           {
// //             method: "GET",
// //             headers: {
// //               "Content-Type": "application/json",
// //               "Authorization": `Bearer ${BEARER_TOKEN}`,   // ← HARD-CODED TOKEN
// //             },
// //           }
// //         );

// //         if (!res.ok) {
// //           const err = await res.json().catch(() => ({}));
// //           console.error("API Error:", err);
// //           throw new Error(err.detail || "Widget not found or token expired");
// //         }

// //         const result = await res.json();
// //         console.log("Widget loaded:", result);

// //         setWidget(result.data);  // { success: true, data: { ... } }
// //       } catch (err: any) {
// //         console.error("Failed to load widget:", err);
// //         setError(true);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchWidget();
// //   }, [widgetId]); // Only runs when widgetId changes

// //   if (loading) {
// //     return (
// //       <div style={{ padding: "60px", textAlign: "center", color: "#666" }}>
// //         Loading your pricing widget...
// //       </div>
// //     );
// //   }

// //   if (error || !widget) {
// //     return (
// //       <div style={{ padding: "60px", textAlign: "center", color: "#ef4444" }}>
// //         <strong>Widget not found</strong>
// //         <br />
// //         <small>ID: {widgetId}</small>
// //       </div>
// //     );
// //   }

// // return (
// //  <div
// //     style={{
// //       fontFamily: widget.appearance?.font || 'Inter, sans-serif',
// //       fontWeight: widget.appearance?.fontWeight || '400',
// //       fontSize: `${widget.appearance?.fontSize || 16}px`,
// //       lineHeight: '1.6',
// //     }}
// //   >
// //     {/* widget.data is the actual content (cards, appearance, etc.) */}
// //     {widget.type === "comparison_table" ? (
// //       <ComparisonTablePreview data={widget.data} appearance={widget.appearance} />
// //     ) : widget.type === "pricing_columns" ? (
// //       <PricingCardPreview data={widget.data} appearance={widget.appearance} />
// //     ) : (
// //       <div style={{ padding: "60px", textAlign: "center", color: "#ef4444" }}>
// //         Unknown widget type: {widget.type}
// //       </div>
// //     )}
// //   </div>
// //   );
// // };

// // export default Widget;


// import React, { useState, useEffect } from 'react';
// import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// import { PricingCardPreview } from './previews/PricingCardPreview';

// interface WidgetData {
//   id: string;
//   type: string;
//   name: string;
//   data: any;
//   appearance: any;
// }

// const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
//   const [widget, setWidget] = useState<WidgetData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   // YOUR TOKEN
//   const TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MTY5MjM1LCJpYXQiOjE3NjQxNjU2MzUsImp0aSI6IjkxYmVkNGE0YWIwMjQyMDc4YWEzYjg1Y2VjMzJjNDc3IiwidXNlcl9pZCI6NX0.D9fCbKd_1FnPQH2l4aH28oRlG0wZf0i9QiCROD1ElVSWO4Ctr07tfcZavnHEN34UW8B0DX8C7qVfnU88gwUemg";

//   useEffect(() => {
//     if (!widgetId || widgetId === "undefined") {
//       setLoading(false);
//       setError(true);
//       return;
//     }

//     const fetchWidget = async () => {
//       try {
//         console.log("Fetching widget ID:", widgetId);
//         const res = await fetch(
//           `https://esign-admin.signmary.com/api/widgets/widget-data/b8dc46d7-01fe-469d-8568-3b025c796cdd/`,
//           {
//             headers: {
//               Authorization: `Bearer ${TOKEN}`,
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed");

//         const result = await res.json();
//         console.log("API Response:", result);

//         // THIS WAS THE BUG — YOU USED result.data BEFORE
//         setWidget(result.data); // result.data is { id, type, data: { ... } }
//         // widget.data → the real content (cards, appearance)
//         // widget.appearance → comes from root level
//       } catch (err) {
//         console.error(err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWidget();
//   }, [widgetId]);

//   if (loading) return <div style={{ padding: "60px", textAlign: "center" }}>Loading...</div>;
//   if (error || !widget) return <div style={{ padding: "60px", textAlign: "center", color: "red" }}>Widget not found</div>;

//   return (
//     <div
//       style={{
//         fontFamily: widget.appearance?.font || "Inter, sans-serif",
//         fontWeight: widget.appearance?.fontWeight || "400",
//         fontSize: `${widget.appearance?.fontSize || 16}px`,
//       }}
//     >
//       {widget.type === "comparison_table" ? (
//         <ComparisonTablePreview data={widget.data} appearance={widget.appearance} />
//       ) : widget.type === "pricing_columns" ? (
//         <PricingCardPreview data={widget.data} appearance={widget.appearance} />
//       ) : (
//         <div>Unsupported type: {widget.type}</div>
//       )}
//     </div>
//   );
// };

// export default Widget;


// import React, { useState, useEffect } from 'react';
// import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// import { PricingCardPreview } from './previews/PricingCardPreview';

// const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
//   const [widget, setWidget] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // YOUR TOKEN (working right now)
//   const TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MjI0OTEwLCJpYXQiOjE3NjQyMjEzMTAsImp0aSI6IjhmMmRlZDkxZDY5OTQ0N2U4NDJmZWM4YmZkYTdiYjI0IiwidXNlcl9pZCI6NX0.lZHwsmgPxSvofpa7Oo7fGKaqGbH9wygqRe7Tf0PEkgJZtXGpJTUX99OQ4ID44Is50KHzDu7W9TYinKqcLHJfJw";

//   useEffect(() => {
//     if (!widgetId || widgetId === "undefined") {
//       setLoading(false);
//       return;
//     }

//     fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/b8dc46d7-01fe-469d-8568-3b025c796cdd/`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Failed");
//         return res.json();
//       })
//       .then(result => {
//         console.log("Widget loaded:", result);
//         setWidget(result.data); // This is correct — your API returns { data: { ... } }
//       })
//       .catch(err => {
//         console.error("Error:", err);
//         setWidget(null);
//       })
//       .finally(() => setLoading(false));
//   }, [widgetId]);

//   if (loading) {
//     return <div style={{ padding: "60px", textAlign: "center", color: "#666" }}>Loading your widget...</div>;
//   }

//   if (!widget) {
//     return <div style={{ padding: "60px", textAlign: "center", color: "red" }}>Widget not found or invalid ID</div>;
//   }

//   return (
//     <div
//       style={{
//         fontFamily: widget.appearance?.font || "Inter, sans-serif",
//         fontWeight: widget.appearance?.fontWeight || "400",
//         fontSize: `${widget.appearance?.fontSize || 16}px`,
//       }}
//     >
//       {widget.type === "pricing_columns" ? (
//         <PricingCardPreview data={widget.data} appearance={widget.appearance} />
//       ) : widget.type === "comparison_table" ? (
//         <ComparisonTablePreview data={widget.data} appearance={widget.appearance} />
//       ) : (
//         <div>Unknown type: {widget.type}</div>
//       )}
//     </div>
//   );
// };

// export default Widget;


// import React, { useState, useEffect } from 'react';
// import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// import { PricingCardPreview } from './previews/PricingCardPreview';

// const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
//   const [widget, setWidget] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MjI0OTEwLCJpYXQiOjE3NjQyMjEzMTAsImp0aSI6IjhmMmRlZDkxZDY5OTQ0N2U4NDJmZWM4YmZkYTdiYjI0IiwidXNlcl9pZCI6NX0.lZHwsmgPxSvofpa7Oo7fGKaqGbH9wygqRe7Tf0PEkgJZtXGpJTUX99OQ4ID44Is50KHzDu7W9TYinKqcLHJfJw";

//   useEffect(() => {
//     if (!widgetId || widgetId === "undefined") {
//       setLoading(false);
//       return;
//     }

//     // FIXED: Use the actual widgetId from props!
//     fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/${widgetId}/`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Failed");
//         return res.json();
//       })
//       .then(result => {
//         console.log("Loaded:", result);
//         setWidget(result.data); // { id, type, data: { cards, appearance } }
//       })
//       .catch(err => {
//         console.error("Error:", err);
//         setWidget(null);
//       })
//       .finally(() => setLoading(false));
//   }, [widgetId]);

//   if (loading) return <div style={{ padding: "60px", textAlign: "center" }}>Loading...</div>;
//   if (!widget) return <div style={{ padding: "60px", textAlign: "center", color: "red" }}>Widget not found</div>;

//   // FIXED: appearance is inside widget.data.appearance
//   const appearance = widget.data?.appearance || {};
//   const contentData = widget.data || {};

//   return (
//     <div>
//       {widget.type === "pricing_columns" ? (
//         <PricingCardPreview data={contentData} appearance={appearance} />
//       ) : widget.type === "comparison_table" ? (
//         <ComparisonTablePreview data={contentData} appearance={appearance} />
//       ) : (
//         <div>Unknown type: {widget.type}</div>
//       )}
//     </div>
//   );
// };

// export default Widget;

// import React, { useState, useEffect } from 'react';
// import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// import { PricingCardPreview } from './previews/PricingCardPreview';

// const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
//   const [widgetContent, setWidgetContent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MjI0OTEwLCJpYXQiOjE3NjQyMjEzMTAsImp0aSI6IjhmMmRlZDkxZDY5OTQ0N2U4NDJmZWM4YmZkYTdiYjI0IiwidXNlcl9pZCI6NX0.lZHwsmgPxSvofpa7Oo7fGKaqGbH9wygqRe7Tf0PEkgJZtXGpJTUX99OQ4ID44Is50KHzDu7W9TYinKqcLHJfJw";

//   useEffect(() => {
//     if (!widgetId || widgetId === "undefined") {
//       setLoading(false);
//       return;
//     }

//     fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/${widgetId}/`, {
//       headers: { Authorization: `Bearer ${TOKEN}` },
//     })
//       .then(res => res.ok ? res.json() : Promise.reject())
//       .then(result => {
//         console.log("Full API Response:", result);

//         // THIS IS THE KEY — your API returns:
//         // result.data.data → the actual widget content (cards, appearance, etc.)
//         const innerData = result.data.data;

//         setWidgetContent({
//           type: result.data.type,
//           data: innerData,                    // cards, tables, etc.
//           appearance: innerData.appearance    // appearance is inside data.data
//         });
//       })
//       .catch(err => {
//         console.error("Failed to load widget:", err);
//         setWidgetContent(null);
//       })
//       .finally(() => setLoading(false));
//   }, [widgetId]);

//   if (loading) {
//     return <div style={{ padding: "60px", textAlign: "center", color: "#666" }}>Loading your widget...</div>;
//   }

//   if (!widgetContent) {
//     return <div style={{ padding: "60px", textAlign: "center", color: "red" }}>Widget not found</div>;
//   }

//   return (
//     <div>
//       {widgetContent.type === "pricing_columns" ? (
//         <PricingCardPreview data={widgetContent.data} appearance={widgetContent.appearance} />
//       ) : widgetContent.type === "comparison_table" ? (
//         <ComparisonTablePreview data={widgetContent.data} appearance={widgetContent.appearance} />
//       ) : (
//         <div>Unsupported type: {widgetContent.type}</div>
//       )}
//     </div>
//   );
// };

// export default Widget;


// import React, { useState, useEffect } from 'react';
// import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
// import { PricingCardPreview } from './previews/PricingCardPreview';

// const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
//   const [content, setContent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!widgetId || widgetId === "undefined" || widgetId.trim() === "") {
//       setLoading(false);
//       return;
//     }
 
//     // NO TOKEN — PUBLIC ACCESS
//     fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/public/${widgetId}/`)
//       .then(res => {
//         if (!res.ok) throw new Error("Widget not found");
//         return res.json();
//       })
//       .then(result => {
//         console.log("Widget loaded:", result);

//         const innerData = result.data.data;
//         const appearance = innerData.appearance;

//         setContent({
//           type: result.data.type,
//           data: innerData,
//           appearance: appearance
//         });
//       })
//       .catch(err => {
//         console.error("Failed to load widget:", err);
//         setContent(null);
//       })
//       .finally(() => setLoading(false));
//   }, [widgetId]);

//   if (loading) {
//     return (
//       <div style={{ padding: "60px", textAlign: "center", color: "#666", fontSize: "18px" }}>
//         Loading your pricing widget...
//       </div>
//     );
//   }

//   if (!content) {
//     return (
//       <div style={{ padding: "60px", textAlign: "center", color: "#ef4444", fontSize: "18px" }}>
//         Widget not found or invalid ID
//       </div>
//     );
//   }

//   return (
//     <div>
//       {content.type === "pricing_columns" ? (
//         <PricingCardPreview data={content.data} appearance={content.appearance} />
//       ) : content.type === "comparison_table" ? (
//         <ComparisonTablePreview data={content.data} appearance={content.appearance} />
//       ) : (
//         <div style={{ padding: "60px", textAlign: "center", color: "#ef4444" }}>
//           Unsupported widget type: {content.type}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Widget;

// src/Widget.tsx
import React, { useState, useEffect } from 'react';
import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
import { PricingCardPreview } from './previews/PricingCardPreview';

const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check if we're in embed mode
  const isEmbedMode = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('embed') === 'true' || window.location.pathname.startsWith('/embed/');
  };

  useEffect(() => {
    if (!widgetId || widgetId === "undefined" || widgetId.trim() === "") {
      setLoading(false);
      return;
    }

    fetch(`https://esign-admin.signmary.com/api/widgets/widget-data/public/${widgetId}/`)
      .then(res => {
        if (!res.ok) throw new Error("Widget not found");
        return res.json();
      })
      .then(result => {
        const innerData = result.data.data;
        const appearance = innerData.appearance;

        setContent({
          type: result.data.type,
          data: innerData,
          appearance: appearance
        });
      })
      .catch(err => {
        console.error("Failed to load widget:", err);
        setContent(null);
      })
      .finally(() => setLoading(false));
  }, [widgetId]);

  if (loading) {
    return (
      <div style={{ 
        padding: isEmbedMode() ? "20px" : "60px", 
        textAlign: "center", 
        color: "#666", 
        fontSize: "16px",
        background: isEmbedMode() ? 'transparent' : 'white'
      }}>
        Loading your pricing widget...
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ 
        padding: isEmbedMode() ? "20px" : "60px", 
        textAlign: "center", 
        color: "#ef4444", 
        fontSize: "16px",
        background: isEmbedMode() ? 'transparent' : 'white'
      }}>
        Widget not found or invalid ID
      </div>
    );
  }

  return (
    <div style={{ background: isEmbedMode() ? 'transparent' : 'white' }}>
      {content.type === "pricing_columns" ? (
        <PricingCardPreview data={content.data} appearance={content.appearance} />
      ) : content.type === "comparison_table" ? (
        <ComparisonTablePreview data={content.data} appearance={content.appearance} />
      ) : (
        <div style={{ 
          padding: isEmbedMode() ? "20px" : "60px", 
          textAlign: "center", 
          color: "#ef4444",
          background: isEmbedMode() ? 'transparent' : 'white'
        }}>
          Unsupported widget type: {content.type}
        </div>
      )}
    </div>
  );
};

export default Widget;