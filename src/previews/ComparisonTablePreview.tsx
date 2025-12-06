// import React, { useState } from 'react';

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   imageUrl?: string | null;
//   buttonText: string;
//   buttonCaption?: string;
//   buttonLink?: string;
//   buttonLinkTarget?: "_self" | "_blank";
//   features: Record<string, string | boolean>;
// }

// interface Category {
//   name: string;
//   features: { name: string; type: "text" | "boolean" }[];
// }

// interface AppearanceSettings {
//   primaryColor: string;
//   secondaryColor: string;
//   font: string;
//   fontWeight: "400" | "700";
//   fontSize: number;
//   buttonRadius: number;
//   buttonType: "filled" | "outline" | "gradient";
// }

// interface ComparisonTablePreviewProps {
//   data: {
//     title: string;
//     plans: Plan[];
//     categories: Category[];
//   };
//   appearance: AppearanceSettings;
// }

// export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(data.categories.map(c => c.name))
//   );

//   const toggleCategory = (name: string) => {
//     setExpandedCategories(prev => {
//       const next = new Set(prev);
//       next.has(name) ? next.delete(name) : next.add(name);
//       return next;
//     });
//   };

//   const buttonStyle = {
//     background:
//       appearance.buttonType === "filled"
//         ? appearance.primaryColor
//         : appearance.buttonType === "gradient"
//           ? `linear-gradient(to right, ${appearance.primaryColor}, ${appearance.secondaryColor})`
//           : "transparent",
//     border: appearance.buttonType === "outline" ? `2px solid ${appearance.primaryColor}` : "none",
//     color: appearance.buttonType === "outline" || appearance.buttonType === "gradient" ? appearance.primaryColor : "#ffffff",
//     borderRadius: `${appearance.buttonRadius}px`,
//     padding: "12px 24px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s",
//   };

//   return (
//     <div
//       style={{
//         fontFamily: appearance.font === "system-ui" ? "system-ui, sans-serif" : `"${appearance.font}", sans-serif`,
//         fontWeight: appearance.fontWeight,
//         fontSize: `${appearance.fontSize}px`,
//         color: appearance.primaryColor,
//         maxWidth: "1200px",
//         margin: "0 auto",
//       }}
//     >
//       <h3 style={{ textAlign: "center", marginBottom: "32px", fontSize: "2em" }}>
//         {data.title}
//       </h3>

//       <div style={{ display: "grid", gap: "24px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
//         <div />
//         {data.plans.map((plan, i) => (
//           <div key={i} style={{ textAlign: "center" }}>
//             {plan.imageUrl && (
//               <div style={{ marginBottom: "16px", borderRadius: "12px", overflow: "hidden", border: "2px solid #e5e7eb" }}>
//                 <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//               </div>
//             )}

//             <div
//               style={{
//                 backgroundColor: appearance.primaryColor,
//                 color: "#ffffff",
//                 padding: "20px",
//                 borderRadius: "12px",
//                 marginBottom: "16px",
//               }}
//             >
//               <h4 style={{ fontSize: "1.5em", margin: "0 0 8px 0" }}>{plan.name}</h4>
//               <div style={{ fontSize: "2.2em", fontWeight: "bold" }}>{plan.price}</div>
//               <div style={{ opacity: 0.8, fontSize: "0.9em" }}>{plan.period}</div>
//             </div>

//             {plan.buttonLink ? (
//               <a
//                 href={plan.buttonLink}
//                 target={plan.buttonLinkTarget || "_self"}
//                 rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                 style={buttonStyle}
//                 className="widget-button"
//               >
//                 {plan.buttonText}
//               </a>
//             ) : (
//               <button style={buttonStyle}>{plan.buttonText}</button>
//             )}

//             {plan.buttonCaption && (
//               <p style={{ margin: "12px 0 0 0", fontSize: "0.9em", opacity: 0.8 }}>
//                 {plan.buttonCaption}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: "40px", borderTop: "2px solid #e5e7eb" }}>
//         {data.categories.map(cat => (
//           <div key={cat.name}>
//             <button
//               onClick={() => toggleCategory(cat.name)}
//               style={{
//                 width: "100%",
//                 padding: "16px 20px",
//                 backgroundColor: appearance.secondaryColor,
//                 border: "none",
//                 textAlign: "left",
//                 fontWeight: "bold",
//                 fontSize: "1.2em",
//                 display: "flex",
//                 gap: "12px",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: appearance.primaryColor   // ← ADD THIS LINE
//               }}
//             >
//               <span style={{
//                 transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s ease",
//                 color: appearance.primaryColor,
//                 fontSize: "1.4em",
//                 fontWeight: "bold"
//               }}>
//                 ▸
//               </span>
//               <span style={{ color: appearance.primaryColor }}>{cat.name}</span>  {/* ← CHANGE THIS LINE */}

//             </button>

//             {expandedCategories.has(cat.name) && (
//               <div>
//                 {cat.features.map(feat => (
//                   <div
//                     key={feat.name}
//                     style={{
//                       display: "grid",
//                       gap: "16px",
//                       padding: "16px 20px",
//                       borderBottom: "1px solid #e5e7eb",
//                       gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
//                       alignItems: "center",
//                     }}
//                   >
//                     <div style={{ fontWeight: "500" }}>{feat.name}</div>
//                     {data.plans.map(plan => (
//                       <div key={plan.name} style={{ textAlign: "center" }}>
//                         {feat.type === "boolean" ? (
//                           plan.features[feat.name] ? (
//                             <span style={{ color: "#10b981", fontSize: "1.8em" }}>✓</span>
//                           ) : (
//                             <span style={{ color: "#ef4444", fontSize: "1.8em" }}>✗</span>
//                           )
//                         ) : (
//                           <span>{(plan.features[feat.name] as string) || "-"}</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };




// import React, { useState } from 'react';

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   imageUrl?: string | null;
//   buttonText: string;
//   buttonCaption?: string;
//   buttonLink?: string;
//   buttonLinkTarget?: "_self" | "_blank";
//   features: Record<string, string | boolean>;
//   headerColor?: string;
//   buttonColor?: string;
//   headerTextColor?: string;
// }

// interface Category {
//   name: string;
//   features: { name: string; type: "text" | "boolean" }[];
// }

// interface AppearanceSettings {
//   primaryColor: string;
//   secondaryColor: string;
//   buttonColor?: string;
//   font: string;
//   fontWeight: "400" | "700";
//   fontSize: number;
//   buttonRadius: number;
//   buttonType: "filled" | "outline" | "gradient";
//   categoryTextColor?: string;
// }

// interface ComparisonTablePreviewProps {
//   data: {
//     title: string;
//     plans: Plan[];
//     categories: Category[];
//   };
//   appearance: AppearanceSettings;
// }

// export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
//   const app = appearance || {
//     primaryColor: "#1F2937",
//     secondaryColor: "#F3F4F6",
//     buttonColor: "#7c3aed",
//     font: "Inter",
//     fontWeight: "400",
//     fontSize: 16,
//     buttonRadius: 12,
//     buttonType: "filled",
//     categoryTextColor: "#3b82f6"
//   };

//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(data.categories.map(c => c.name))
//   );

//   const toggleCategory = (name: string) => {
//     setExpandedCategories(prev => {
//       const next = new Set(prev);
//       next.has(name) ? next.delete(name) : next.add(name);
//       return next;
//     });
//   };

//   return (
//     <div style={{
//       fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
//       fontWeight: app.fontWeight,
//       fontSize: `${app.fontSize}px`,
//       color: app.primaryColor,
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "20px",
//     }}>
//       <h3 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.2em", fontWeight: "bold" }}>
//         {data.title}
//       </h3>

//       <div style={{ display: "grid", gap: "32px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
//         <div />
//         {data.plans.map((plan, i) => (
//           <div key={i} style={{ textAlign: "center" }}>
//             {plan.imageUrl && (
//               <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
//                 <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//               </div>
//             )}

//             {/* HEADER — uses per-plan colors */}
//             <div style={{
//               backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
//               color: plan.headerTextColor || '#ffffff',
//               padding: "24px 16px",
//               borderRadius: "16px",
//               marginBottom: "20px",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//             }}>
//               <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0", fontWeight: "bold" }}>
//                 {plan.name}
//               </h4>
//               <div style={{ fontSize: "2.8em", fontWeight: "900", lineHeight: "1" }}>
//                 {plan.price}
//               </div>
//               <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>
//                 {plan.period}
//               </div>
//             </div>

//             {/* BUTTON — clean, no double border */}
//             {plan.buttonLink ? (
//               <a
//                 href={plan.buttonLink}
//                 target={plan.buttonLinkTarget || "_self"}
//                 rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                 style={{
//                   background: app.buttonType === "filled"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : app.buttonType === "gradient"
//                       ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})`
//                       : "transparent",
//                   border: app.buttonType === "outline"
//                     ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                     : "none",
//                   color: app.buttonType === "outline" || app.buttonType === "gradient"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : "#ffffff",
//                   borderRadius: `${app.buttonRadius}px`,
//                   padding: "16px 32px",
//                   fontWeight: "600",
//                   fontSize: `${app.fontSize * 1.1}px`,
//                   textDecoration: "none",
//                   display: "block",
//                   textAlign: "center",
//                   transition: "all 0.3s ease",
//                   width: "100%",
//                 }}
//                 className="hover:opacity-90 hover:scale-105"
//               >
//                 {plan.buttonText}
//               </a>
//             ) : (
//               <div style={{
//                 background: app.buttonType === "filled"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "transparent",
//                 border: app.buttonType === "outline"
//                   ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                   : "none",
//                 color: app.buttonType === "outline"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "#ffffff",
//                 borderRadius: `${app.buttonRadius}px`,
//                 padding: "16px 32px",
//                 fontWeight: "600",
//                 textAlign: "center",
//                 width: "100%",
//                 cursor: "default",
//               }}>
//                 {plan.buttonText}
//               </div>
//             )}

//             {plan.buttonCaption && (
//               <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>
//                 {plan.buttonCaption}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* FEATURES */}
//       <div style={{ marginTop: "48px" }}>
//         {data.categories.map((cat, catIndex) => (
//           <div key={cat.name}>
//             <button
//               onClick={() => toggleCategory(cat.name)}
//               style={{
//                 width: "100%",
//                 padding: "18px 24px",
//                 backgroundColor: app.secondaryColor || '#f3f4f6',
//                 border: "none",
//                 textAlign: "left",
//                 fontWeight: "bold",
//                 fontSize: "1.3em",
//                 display: "flex",
//                 gap: "12px",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: app.categoryTextColor || app.primaryColor,
//                 borderBottom: "2px solid #e5e7eb",
//               }}
//             >
//               <span style={{
//                 transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s ease",
//                 fontSize: "1.4em",
//               }}>
//                 ▸
//               </span>
//               {cat.name}
//             </button>

//             {expandedCategories.has(cat.name) && (
//               <div>
//                 {cat.features.map((feat, featIndex) => (
//                   <div
//                     key={feat.name}
//                     style={{
//                       display: "grid",
//                       gap: "16px",
//                       padding: "16px 24px",
//                       borderBottom: "1px solid #e5e7eb",
//                       gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
//                       alignItems: "center",
//                       backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
//                     }}
//                   >
//                     <div style={{ fontWeight: "600", color: app.primaryColor }}>
//                       {feat.name}
//                     </div>
//                     {data.plans.map(plan => (
//                       <div key={plan.name} style={{ textAlign: "center" }}>
//                         {feat.type === "boolean" ? (
//                           plan.features[feat.name] ? (
//                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M20 6L9 17l-5-5"/>
//                             </svg>
//                           ) : (
//                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M18 6L6 18M6 6l12 12"/>
//                             </svg>
//                           )
//                         ) : (
//                           <span style={{ fontWeight: "500" }}>
//                             {(plan.features[feat.name] as string) || "-"}
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// import React, { useState } from 'react';

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   imageUrl?: string | null;
//   buttonText: string;
//   buttonCaption?: string;
//   buttonLink?: string;
//   buttonLinkTarget?: "_self" | "_blank";
//   features: Record<string, string | boolean>;
//   headerColor?: string;
//   buttonColor?: string;
//   headerTextColor?: string;
// }

// interface Category {
//   name: string;
//   features: { name: string; type: "text" | "boolean" }[];
// }

// interface AppearanceSettings {
//   primaryColor: string;
//   secondaryColor: string;
//   buttonColor?: string;
//   font: string;
//   fontWeight: "400" | "700";
//   fontSize: number;
//   buttonRadius: number;
//   buttonType: "filled" | "outline" | "gradient";
//   categoryTextColor?: string;
// }

// interface ComparisonTablePreviewProps {
//   data: {
//     title: string;
//     plans: Plan[];
//     categories: Category[];
//   };
//   appearance: AppearanceSettings;
// }

// export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
//   const app = appearance || {
//     primaryColor: "#1F2937",
//     secondaryColor: "#F3F4F6",
//     buttonColor: "#7c3aed",
//     font: "Inter",
//     fontWeight: "400",
//     fontSize: 16,
//     buttonRadius: 12,
//     buttonType: "filled",
//     categoryTextColor: "#3b82f6"
//   };

//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(data.categories.map(c => c.name))
//   );

//   const toggleCategory = (name: string) => {
//     setExpandedCategories(prev => {
//       const next = new Set(prev);
//       next.has(name) ? next.delete(name) : next.add(name);
//       return next;
//     });
//   };

//   return (
//     <div style={{
//       fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
//       fontWeight: app.fontWeight,
//       fontSize: `${app.fontSize}px`,
//       color: app.primaryColor,
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "20px",
//     }}>
//       <h3 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.2em", fontWeight: "bold" }}>
//         {data.title}
//       </h3>

//       <div style={{ display: "grid", gap: "32px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
//         <div />
//         {data.plans.map((plan, i) => (
//           <div key={i} style={{ textAlign: "center" }}>
//             {plan.imageUrl && (
//               <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
//                 <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//               </div>
//             )}

//             {/* HEADER — uses per-plan colors */}
//             <div style={{
//               backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
//               color: plan.headerTextColor || '#ffffff',
//               padding: "24px 16px",
//               borderRadius: "16px",
//               marginBottom: "20px",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//             }}>
//               <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0", fontWeight: "bold" }}>
//                 {plan.name}
//               </h4>
//               <div style={{ fontSize: "2.8em", fontWeight: "900", lineHeight: "1" }}>
//                 {plan.price}
//               </div>
//               <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>
//                 {plan.period}
//               </div>
//             </div>

//             {/* BUTTON — clean, no double border */}
//             {plan.buttonLink ? (
//               <a
//                 href={plan.buttonLink}
//                 target={plan.buttonLinkTarget || "_self"}
//                 rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                 style={{
//                   background: app.buttonType === "filled"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : app.buttonType === "gradient"
//                       ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})`
//                       : "transparent",
//                   border: app.buttonType === "outline"
//                     ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                     : "none",
//                   color: app.buttonType === "outline" || app.buttonType === "gradient"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : "#ffffff",
//                   borderRadius: `${app.buttonRadius}px`,
//                   padding: "16px 32px",
//                   fontWeight: "600",
//                   fontSize: `${app.fontSize * 1.1}px`,
//                   textDecoration: "none",
//                   display: "block",
//                   textAlign: "center",
//                   transition: "all 0.3s ease",
//                   width: "100%",
//                 }}
//                 className="hover:opacity-90 hover:scale-105"
//               >
//                 {plan.buttonText}
//               </a>
//             ) : (
//               <div style={{
//                 background: app.buttonType === "filled"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "transparent",
//                 border: app.buttonType === "outline"
//                   ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                   : "none",
//                 color: app.buttonType === "outline"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "#ffffff",
//                 borderRadius: `${app.buttonRadius}px`,
//                 padding: "16px 32px",
//                 fontWeight: "600",
//                 textAlign: "center",
//                 width: "100%",
//                 cursor: "default",
//               }}>
//                 {plan.buttonText}
//               </div>
//             )}

//             {plan.buttonCaption && (
//               <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>
//                 {plan.buttonCaption}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* FEATURES */}
//       <div style={{ marginTop: "48px" }}>
//         {data.categories.map((cat, catIndex) => (
//           <div key={cat.name}>
//             <button
//               onClick={() => toggleCategory(cat.name)}
//               style={{
//                 width: "100%",
//                 padding: "18px 24px",
//                 backgroundColor: app.secondaryColor || '#f3f4f6',
//                 border: "none",
//                 textAlign: "left",
//                 fontWeight: "bold",
//                 fontSize: "1.3em",
//                 display: "flex",
//                 gap: "12px",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: app.categoryTextColor || "#3b82f6",
//                 borderBottom: "2px solid #e5e7eb",
//               }}
//             >
//               <span style={{
//                 transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s ease",
//                 fontSize: "1.4em",
//               }}>
//                 ▸
//               </span>
//               {cat.name}
//             </button>

//             {expandedCategories.has(cat.name) && (
//               <div>
//                 {cat.features.map((feat, featIndex) => (
//                   <div
//                     key={feat.name}
//                     style={{
//                       display: "grid",
//                       gap: "16px",
//                       padding: "16px 24px",
//                       borderBottom: "1px solid #e5e7eb",
//                       gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
//                       alignItems: "center",
//                       backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
//                     }}
//                   >
//                     <div style={{ fontWeight: "600", color: app.primaryColor }}>
//                       {feat.name}
//                     </div>
//                     {data.plans.map(plan => (
//                       <div key={plan.name} style={{ textAlign: "center" }}>
//                         {feat.type === "boolean" ? (
//                           plan.features[feat.name] ? (
//                             <span style={{ color: "#10b981", fontSize: "1.8em", fontWeight: "bold" }}>✓</span>
//                           ) : (
//                             <span style={{ color: "#ef4444", fontSize: "1.8em", fontWeight: "bold" }}>✗</span>
//                           )
//                         ) : (
//                           <span style={{ fontWeight: "500" }}>
//                             {(plan.features[feat.name] as string) || "-"}
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// import React, { useState } from 'react';

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   imageUrl?: string | null;
//   buttonText: string;
//   buttonCaption?: string;
//   buttonLink?: string;
//   buttonLinkTarget?: "_self" | "_blank";
//   features: Record<string, string | boolean>;
//   headerColor?: string;
//   buttonColor?: string;
//   headerTextColor?: string;
// }

// interface Category {
//   name: string;
//   features: { name: string; type: "text" | "boolean" }[];
// }

// interface AppearanceSettings {
//   primaryColor: string;
//   secondaryColor: string;
//   buttonColor?: string;
//   font: string;
//   fontWeight: "400" | "700";
//   fontSize: number;
//   buttonRadius: number;
//   buttonType: "filled" | "outline" | "gradient";
//   categoryTextColor?: string;
// }

// interface ComparisonTablePreviewProps {
//   data: {
//     title: string;
//     plans: Plan[];
//     categories: Category[];
//   };
//   appearance: AppearanceSettings;
// }

// export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
//   const app = appearance || {
//     primaryColor: "#1F2937",
//     secondaryColor: "#F3F4F6",
//     buttonColor: "#7c3aed",
//     font: "Inter",
//     fontWeight: "400",
//     fontSize: 16,
//     buttonRadius: 12,
//     buttonType: "filled",
//     categoryTextColor: "#3b82f6"
//   };

//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(data.categories.map(c => c.name))
//   );

//   const toggleCategory = (name: string) => {
//     setExpandedCategories(prev => {
//       const next = new Set(prev);
//       next.has(name) ? next.delete(name) : next.add(name);
//       return next;
//     });
//   };

//   return (
//     <div style={{
//       fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
//       fontWeight: app.fontWeight,
//       fontSize: `${app.fontSize}px`,
//       color: app.primaryColor,
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "20px",
//     }}>
//       <h3 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.2em", }}>
//         {data.title}
//       </h3>

//       <div style={{ display: "grid", gap: "32px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
//         <div />
//         {data.plans.map((plan, i) => (
//           <div key={i} style={{ textAlign: "center" }}>
//             {plan.imageUrl && (
//               <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
//                 <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//               </div>
//             )}

//             {/* HEADER — uses per-plan colors */}
//             <div style={{
//               backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
//               color: plan.headerTextColor || '#ffffff',
//               padding: "24px 16px",
//               borderRadius: "16px",
//               marginBottom: "20px",
//               boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//             }}>
//               <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0", }}>
//                 {plan.name}
//               </h4>
//               <div style={{ fontSize: "2.8em", lineHeight: "1" }}>
//                 {plan.price}
//               </div>
//               <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>
//                 {plan.period}
//               </div>
//             </div>

//             {/* BUTTON — clean, no double border */}
//             {plan.buttonLink ? (
//               <a
//                 href={plan.buttonLink}
//                 target={plan.buttonLinkTarget || "_self"}
//                 rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                 style={{
//                   background: app.buttonType === "filled"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : app.buttonType === "gradient"
//                       ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})`
//                       : "transparent",
//                   border: app.buttonType === "outline"
//                     ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                     : "none",
//                   color: app.buttonType === "outline" || app.buttonType === "gradient"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : "#ffffff",
//                   borderRadius: `${app.buttonRadius}px`,
//                   padding: "16px 32px",
//                   fontWeight: "600",
//                   fontSize: `${app.fontSize * 1.1}px`,
//                   textDecoration: "none",
//                   display: "block",
//                   textAlign: "center",
//                   transition: "all 0.3s ease",
//                   width: "100%",
//                 }}
//                 className="hover:opacity-90 hover:scale-105"
//               >
//                 {plan.buttonText}
//               </a>
//             ) : (
//               <div style={{
//                 background: app.buttonType === "filled"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "transparent",
//                 border: app.buttonType === "outline"
//                   ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                   : "none",
//                 color: app.buttonType === "outline"
//                   ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                   : "#ffffff",
//                 borderRadius: `${app.buttonRadius}px`,
//                 padding: "16px 32px",
//                 fontWeight: "600",
//                 textAlign: "center",
//                 width: "100%",
//                 cursor: "default",
//               }}>
//                 {plan.buttonText}
//               </div>
//             )}

//             {plan.buttonCaption && (
//               <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>
//                 {plan.buttonCaption}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* FEATURES */}
//       <div style={{ marginTop: "48px" }}>
//         {data.categories.map((cat, catIndex) => (
//           <div key={cat.name}>
//             <button
//               onClick={() => toggleCategory(cat.name)}
//               style={{
//                 width: "100%",
//                 padding: "18px 24px",
//                 backgroundColor: app.secondaryColor || '#f3f4f6',
//                 border: "none",
//                 textAlign: "left",
//                 fontWeight: "600",
//                 fontSize: "1.3em",
//                 display: "flex",
//                 gap: "12px",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: app.categoryTextColor || "#3b82f6",
//                 borderBottom: "2px solid #e5e7eb",
//                 textTransform: "uppercase",          // ← This line does the magic
//                 // letterSpacing: "0.05em",             // optional – makes it look even nicer
//               }}
//             >
//               <span style={{
//                 transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
//                 transition: "transform 0.3s ease", color: "gray"

//               }}>
//                 ▸
//               </span>
//               {cat.name}
//             </button>

//             {expandedCategories.has(cat.name) && (
//               <div>
//                 {cat.features.map((feat, featIndex) => (
//                   <div
//                     key={feat.name}
//                     style={{
//                       display: "grid",
//                       gap: "16px",
//                       padding: "16px 24px",
//                       fontWeight: "500",
//                       borderBottom: "1px solid #e5e7eb",
//                       gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
//                       alignItems: "center",
//                       backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
//                     }}
//                   >
//                     <div style={{ color: app.primaryColor }}>
//                       {feat.name}
//                     </div>
//                     {data.plans.map(plan => (
//                       <div key={plan.name} style={{ textAlign: "center" }}>
//                         {feat.type === "boolean" ? (
//                           plan.features[feat.name] ? (
//                             <span style={{ color: "#10b981", }}>✓</span>
//                           ) : (
//                             <span style={{ color: "#ef4444", }}>✗</span>
//                           )
//                         ) : (
//                           <span style={{ fontWeight: "500" }}>
//                             {(plan.features[feat.name] as string) || "-"}
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// import React, { useState } from 'react';

// interface Plan {
//   name: string;
//   price: string;
//   period: string;
//   imageUrl?: string | null;
//   buttonText: string;
//   buttonCaption?: string;
//   buttonLink?: string;
//   buttonLinkTarget?: "_self" | "_blank";
//   features: Record<string, string | boolean>;
//   headerColor?: string;
//   buttonColor?: string;
//   headerTextColor?: string;
// }

// interface Category {
//   name: string;
//   features: { name: string; type: "text" | "boolean" }[];
// }

// interface AppearanceSettings {
//   primaryColor: string;
//   secondaryColor: string;
//   buttonColor?: string;
//   font: string;
//   fontWeight: "400" | "700";
//   fontSize: number;
//   buttonRadius: number;
//   buttonType: "filled" | "outline" | "gradient";
//   categoryTextColor?: string;
// }

// interface ComparisonTablePreviewProps {
//   data: {
//     title: string;
//     plans: Plan[];
//     categories: Category[];
//   };
//   appearance: AppearanceSettings;
// }

// export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
//   const app = appearance || {
//     primaryColor: "#1F2937",
//     secondaryColor: "#F3F4F6",
//     buttonColor: "#7c3aed",
//     font: "Inter",
//     fontWeight: "400",
//     fontSize: 16,
//     buttonRadius: 12,
//     buttonType: "filled",
//     categoryTextColor: "#3b82f6"
//   };

//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(data.categories.map(c => c.name))
//   );

//   const toggleCategory = (name: string) => {
//     setExpandedCategories(prev => {
//       const next = new Set(prev);
//       next.has(name) ? next.delete(name) : next.add(name);
//       return next;
//     });
//   };

//   const buttonRadius = `${app.buttonRadius}px`;

//   return (
//     <div style={{
//       fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
//       fontWeight: app.fontWeight,
//       fontSize: `${app.fontSize}px`,
//       color: app.primaryColor,
//       width: '100%',
//       padding: '20px',
//     }}>
//       <h3 style={{ 
//         textAlign: "center", 
//         marginBottom: "40px", 
//         fontSize: "2.2em",
//         padding: '0 16px'
//       }}>
//         {data.title}
//       </h3>

//       {/* Desktop View - Hidden on mobile */}
//       <div className="hidden lg:block">
//         <div style={{ display: "grid", gap: "32px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
//           <div />
//           {data.plans.map((plan, i) => (
//             <div key={i} style={{ textAlign: "center" }}>
//               {plan.imageUrl && (
//                 <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
//                   <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
//                 </div>
//               )}

//               <div style={{
//                 backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
//                 color: plan.headerTextColor || '#ffffff',
//                 padding: "24px 16px",
//                 borderRadius: "16px",
//                 marginBottom: "20px",
//                 boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//               }}>
//                 <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0" }}>
//                   {plan.name}
//                 </h4>
//                 <div style={{ fontSize: "2.8em", lineHeight: "1" }}>
//                   {plan.price}
//                 </div>
//                 <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>
//                   {plan.period}
//                 </div>
//               </div>

//               {plan.buttonLink ? (
//                 <a
//                   href={plan.buttonLink}
//                   target={plan.buttonLinkTarget || "_self"}
//                   rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                   style={{
//                     background: app.buttonType === "filled"
//                       ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                       : app.buttonType === "gradient"
//                         ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})`
//                         : "transparent",
//                     border: app.buttonType === "outline"
//                       ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                       : "none",
//                     color: app.buttonType === "outline" || app.buttonType === "gradient"
//                       ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                       : "#ffffff",
//                     borderRadius: buttonRadius,
//                     padding: "16px 32px",
//                     fontWeight: "600",
//                     fontSize: `${app.fontSize * 1.1}px`,
//                     textDecoration: "none",
//                     display: "block",
//                     textAlign: "center",
//                     transition: "all 0.3s ease",
//                     width: "100%",
//                   }}
//                 >
//                   {plan.buttonText}
//                 </a>
//               ) : (
//                 <div style={{
//                   background: app.buttonType === "filled"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : "transparent",
//                   border: app.buttonType === "outline"
//                     ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
//                     : "none",
//                   color: app.buttonType === "outline"
//                     ? (plan.buttonColor || app.buttonColor || app.primaryColor)
//                     : "#ffffff",
//                   borderRadius: buttonRadius,
//                   padding: "16px 32px",
//                   fontWeight: "600",
//                   textAlign: "center",
//                   width: "100%",
//                   cursor: "default",
//                 }}>
//                   {plan.buttonText}
//                 </div>
//               )}

//               {plan.buttonCaption && (
//                 <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>
//                   {plan.buttonCaption}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Desktop Features Table */}
//         <div style={{ marginTop: "48px" }}>
//           {data.categories.map((cat) => (
//             <div key={cat.name}>
//               <button
//                 onClick={() => toggleCategory(cat.name)}
//                 style={{
//                   width: "100%",
//                   padding: "18px 24px",
//                   backgroundColor: app.secondaryColor || '#f3f4f6',
//                   border: "none",
//                   textAlign: "left",
//                   fontWeight: "600",
//                   fontSize: "1.3em",
//                   display: "flex",
//                   gap: "12px",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   color: app.categoryTextColor || "#3b82f6",
//                   borderBottom: "2px solid #e5e7eb",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 <span style={{
//                   transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
//                   transition: "transform 0.3s ease",
//                   color: "gray"
//                 }}>
//                   ▸
//                 </span>
//                 {cat.name}
//               </button>

//               {expandedCategories.has(cat.name) && (
//                 <div>
//                   {cat.features.map((feat, featIndex) => (
//                     <div
//                       key={feat.name}
//                       style={{
//                         display: "grid",
//                         gap: "16px",
//                         padding: "16px 24px",
//                         fontWeight: "500",
//                         borderBottom: "1px solid #e5e7eb",
//                         gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
//                         alignItems: "center",
//                         backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
//                       }}
//                     >
//                       <div style={{ color: app.primaryColor }}>
//                         {feat.name}
//                       </div>
//                       {data.plans.map(plan => (
//                         <div key={plan.name} style={{ textAlign: "center" }}>
//                           {feat.type === "boolean" ? (
//                             plan.features[feat.name] ? (
//                               <span style={{ color: "#10b981", fontSize: "1.8em" }}>✓</span>
//                             ) : (
//                               <span style={{ color: "#ef4444", fontSize: "1.8em" }}>✗</span>
//                             )
//                           ) : (
//                             <span style={{ fontWeight: "500" }}>
//                               {(plan.features[feat.name] as string) || "-"}
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mobile View - Card Layout */}
//       <div className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
//         {data.plans.map((plan, planIdx) => (
//           <div key={planIdx} style={{
//             border: '2px solid #e5e7eb',
//             borderRadius: '16px',
//             overflow: 'hidden',
//             backgroundColor: '#ffffff',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//           }}>
//             {/* Plan Header */}
//             {plan.imageUrl && (
//               <div style={{ width: '100%' }}>
//                 <img src={plan.imageUrl} alt={plan.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
//               </div>
//             )}

//             <div style={{
//               padding: '20px',
//               backgroundColor: plan.headerColor || '#3b82f6',
//               color: plan.headerTextColor || '#ffffff',
//               textAlign: 'center'
//             }}>
//               <h4 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '0 0 8px 0' }}>
//                 {plan.name}
//               </h4>
//               <div style={{ fontSize: '2.5em', fontWeight: 'bold', margin: '8px 0' }}>
//                 {plan.price}
//               </div>
//               <div style={{ fontSize: '1em', opacity: 0.9 }}>
//                 {plan.period}
//               </div>
//             </div>

//             {/* CTA Button */}
//             <div style={{ padding: '20px' }}>
//               {plan.buttonLink ? (
//                 <a
//                   href={plan.buttonLink}
//                   target={plan.buttonLinkTarget || "_self"}
//                   rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                   style={{
//                     background: app.buttonType === "filled"
//                       ? (plan.buttonColor || app.buttonColor)
//                       : app.buttonType === "gradient"
//                         ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor}, ${app.secondaryColor})`
//                         : "transparent",
//                     border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
//                     color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor) : "#fff",
//                     borderRadius: buttonRadius,
//                     padding: '14px 24px',
//                     fontWeight: '600',
//                     fontSize: '1em',
//                     textDecoration: 'none',
//                     display: 'block',
//                     textAlign: 'center',
//                     width: '100%'
//                   }}
//                 >
//                   {plan.buttonText}
//                 </a>
//               ) : (
//                 <div style={{
//                   background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor) : "transparent",
//                   border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
//                   color: app.buttonType === "outline" ? (plan.buttonColor || app.buttonColor) : "#fff",
//                   borderRadius: buttonRadius,
//                   padding: '14px 24px',
//                   fontWeight: '600',
//                   textAlign: 'center',
//                   width: '100%'
//                 }}>
//                   {plan.buttonText}
//                 </div>
//               )}

//               {plan.buttonCaption && (
//                 <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.9em', opacity: 0.8 }}>
//                   {plan.buttonCaption}
//                 </p>
//               )}
//             </div>

//             {/* Features List */}
//             <div style={{ borderTop: '2px solid #e5e7eb' }}>
//               {data.categories.map((cat) => (
//                 <div key={cat.name}>
//                   <div style={{
//                     backgroundColor: '#f3f4f6',
//                     padding: '12px 20px',
//                     fontWeight: 'bold',
//                     color: app.categoryTextColor || '#3b82f6',
//                     fontSize: '1em',
//                     borderBottom: '1px solid #e5e7eb',
//                     textTransform: 'uppercase'
//                   }}>
//                     {cat.name}
//                   </div>
//                   {cat.features.map((feat) => (
//                     <div
//                       key={feat.name}
//                       style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         padding: '12px 20px',
//                         borderBottom: '1px solid #f3f4f6'
//                       }}
//                     >
//                       <span style={{ fontWeight: '500', fontSize: '0.95em', color: app.primaryColor }}>
//                         {feat.name}
//                       </span>
//                       <div>
//                         {feat.type === "boolean" ? (
//                           plan.features[feat.name] ? (
//                             <span style={{ color: '#10b981', fontSize: '1.5em' }}>✓</span>
//                           ) : (
//                             <span style={{ color: '#ef4444', fontSize: '1.5em' }}>✗</span>
//                           )
//                         ) : (
//                           <span style={{ fontWeight: '500', fontSize: '0.95em' }}>
//                             {(plan.features[feat.name] as string) || "-"}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';

interface Plan {
  name: string;
  price: string;
  period: string;
  imageUrl?: string | null;
  buttonText: string;
  buttonCaption?: string;
  buttonLink?: string;
  buttonLinkTarget?: "_self" | "_blank";
  features: Record<string, string | boolean>;
  headerColor?: string;
  buttonColor?: string;
  headerTextColor?: string;
}

interface Category {
  name: string;
  features: { name: string; type: "text" | "boolean" }[];
}

interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  buttonColor?: string;
  font: string;
  fontWeight: "400" | "700";
  fontSize: number;
  buttonRadius: number;
  buttonType: "filled" | "outline" | "gradient";
  categoryTextColor?: string;
}

interface ComparisonTablePreviewProps {
  data: {
    title: string;
    plans: Plan[];
    categories: Category[];
  };
  appearance: AppearanceSettings;
}

const styles = `
  .desktop-view { display: block; }
  .mobile-view { display: none; }
  
  @media (max-width: 1023px) {
    .desktop-view { display: none !important; }
    .mobile-view { display: flex !important; }
  }
`;

export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
  const app = appearance || {
    primaryColor: "#1F2937",
    secondaryColor: "#F3F4F6",
    buttonColor: "#7c3aed",
    font: "Inter",
    fontWeight: "400",
    fontSize: 16,
    buttonRadius: 12,
    buttonType: "filled",
    categoryTextColor: "#3b82f6"
  };

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(data.categories.map(c => c.name))
  );

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const buttonRadius = `${app.buttonRadius}px`;

  return (
    <>
      <style>{styles}</style>
      <div style={{
        fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
        fontWeight: app.fontWeight,
        fontSize: `${app.fontSize}px`,
        color: app.primaryColor,
        width: '100%',
        padding: '20px',
      }}>
        <h3 style={{ 
          textAlign: "center", 
          marginBottom: "40px", 
          fontSize: "2.2em",
          padding: '0 16px'
        }}>
          {data.title}
        </h3>

        {/* Desktop View - Hidden on mobile */}
        <div className="desktop-view">
          <div style={{ display: "grid", gap: "32px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
            <div />
            {data.plans.map((plan, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {plan.imageUrl && (
                  <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
                    <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  </div>
                )}

                <div style={{
                  backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
                  color: plan.headerTextColor || '#ffffff',
                  padding: "24px 16px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}>
                  <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0" }}>
                    {plan.name}
                  </h4>
                  <div style={{ fontSize: "2.8em", lineHeight: "1" }}>
                    {plan.price}
                  </div>
                  <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>
                    {plan.period}
                  </div>
                </div>

                {plan.buttonLink ? (
                  <a
                    href={plan.buttonLink}
                    target={plan.buttonLinkTarget || "_self"}
                    rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                    style={{
                      background: app.buttonType === "filled"
                        ? (plan.buttonColor || app.buttonColor || app.primaryColor)
                        : app.buttonType === "gradient"
                          ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})`
                          : "transparent",
                      border: app.buttonType === "outline"
                        ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
                        : "none",
                      color: app.buttonType === "outline" || app.buttonType === "gradient"
                        ? (plan.buttonColor || app.buttonColor || app.primaryColor)
                        : "#ffffff",
                      borderRadius: buttonRadius,
                      padding: "16px 32px",
                      fontWeight: "600",
                      fontSize: `${app.fontSize * 1.1}px`,
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}
                  >
                    {plan.buttonText}
                  </a>
                ) : (
                  <div style={{
                    background: app.buttonType === "filled"
                      ? (plan.buttonColor || app.buttonColor || app.primaryColor)
                      : "transparent",
                    border: app.buttonType === "outline"
                      ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}`
                      : "none",
                    color: app.buttonType === "outline"
                      ? (plan.buttonColor || app.buttonColor || app.primaryColor)
                      : "#ffffff",
                    borderRadius: buttonRadius,
                    padding: "16px 32px",
                    fontWeight: "600",
                    textAlign: "center",
                    width: "100%",
                    cursor: "default",
                  }}>
                    {plan.buttonText}
                  </div>
                )}

                {plan.buttonCaption && (
                  <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>
                    {plan.buttonCaption}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Features Table */}
          <div style={{ marginTop: "48px" }}>
            {data.categories.map((cat) => (
              <div key={cat.name}>
                <button
                  onClick={() => toggleCategory(cat.name)}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    backgroundColor: app.secondaryColor || '#f3f4f6',
                    border: "none",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "1.3em",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    cursor: "pointer",
                    color: app.categoryTextColor || "#3b82f6",
                    borderBottom: "2px solid #e5e7eb",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{
                    transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    color:  app.primaryColor || "gray"
                  }}>
                    ▸
                  </span>
                  {cat.name}
                </button>

                {expandedCategories.has(cat.name) && (
                  <div>
                    {cat.features.map((feat, featIndex) => (
                      <div
                        key={feat.name}
                        style={{
                          display: "grid",
                          gap: "16px",
                          padding: "16px 24px",
                          fontWeight: "500",
                          borderBottom: "1px solid #e5e7eb",
                          gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
                          alignItems: "center",
                          backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
                        }}
                      >
                        <div style={{ color: app.primaryColor }}>
                          {feat.name}
                        </div>
                        {data.plans.map(plan => (
                          <div key={plan.name} style={{ textAlign: "center" }}>
                            {feat.type === "boolean" ? (
                              plan.features[feat.name] ? (
                                <span style={{ color: "#10b981", fontSize: "1.8em" }}>✓</span>
                              ) : (
                                <span style={{ color: "#ef4444", fontSize: "1.8em" }}>✗</span>
                              )
                            ) : (
                              <span style={{ fontWeight: "500" }}>
                                {(plan.features[feat.name] as string) || "-"}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="mobile-view" style={{ flexDirection: 'column', gap: '24px' }}>
          {data.plans.map((plan, planIdx) => (
            <div key={planIdx} style={{
              border: '2px solid #e5e7eb',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {/* Plan Header */}
              {plan.imageUrl && (
                <div style={{ width: '100%' }}>
                  <img src={plan.imageUrl} alt={plan.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{
                padding: '20px',
                backgroundColor: plan.headerColor || '#3b82f6',
                color: plan.headerTextColor || '#ffffff',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                  {plan.name}
                </h4>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', margin: '8px 0' }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: '1em', opacity: 0.9 }}>
                  {plan.period}
                </div>
              </div>

              {/* CTA Button */}
              <div style={{ padding: '20px' }}>
                {plan.buttonLink ? (
                  <a
                    href={plan.buttonLink}
                    target={plan.buttonLinkTarget || "_self"}
                    rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                    style={{
                      background: app.buttonType === "filled"
                        ? (plan.buttonColor || app.buttonColor)
                        : app.buttonType === "gradient"
                          ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor}, ${app.secondaryColor})`
                          : "transparent",
                      border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
                      color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor) : "#fff",
                      borderRadius: buttonRadius,
                      padding: '14px 24px',
                      fontWeight: '600',
                      fontSize: '1em',
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {plan.buttonText}
                  </a>
                ) : (
                  <div style={{
                    background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor) : "transparent",
                    border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
                    color: app.buttonType === "outline" ? (plan.buttonColor || app.buttonColor) : "#fff",
                    borderRadius: buttonRadius,
                    padding: '14px 24px',
                    fontWeight: '600',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    {plan.buttonText}
                  </div>
                )}

                {plan.buttonCaption && (
                  <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.9em', opacity: 0.8 }}>
                    {plan.buttonCaption}
                  </p>
                )}
              </div>

              {/* Features List */}
              <div style={{ borderTop: '2px solid #e5e7eb' }}>
                {data.categories.map((cat) => (
                  <div key={cat.name}>
                    <div style={{
                      backgroundColor: '#f3f4f6',
                      padding: '12px 20px',
                      fontWeight: 'bold',
                      color: app.categoryTextColor || '#3b82f6',
                      fontSize: '1em',
                      borderBottom: '1px solid #e5e7eb',
                      textTransform: 'uppercase'
                    }}>
                      {cat.name}
                    </div>
                    {cat.features.map((feat) => (
                      <div
                        key={feat.name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 20px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span style={{ fontWeight: '500', fontSize: '0.95em', color: app.primaryColor }}>
                          {feat.name}
                        </span>
                        <div>
                          {feat.type === "boolean" ? (
                            plan.features[feat.name] ? (
                              <span style={{ color: '#10b981', fontSize: '1.5em' }}>✓</span>
                            ) : (
                              <span style={{ color: '#ef4444', fontSize: '1.5em' }}>✗</span>
                            )
                          ) : (
                            <span style={{ fontWeight: '500', fontSize: '0.95em' }}>
                              {(plan.features[feat.name] as string) || "-"}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};