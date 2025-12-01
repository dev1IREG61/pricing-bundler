// import React from 'react';

// interface PricingCardPreviewProps {
//   data: any;
//   appearance: any;
// }

// export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({ data, appearance }) => {
//   const cards = data.multiTableMode && data.tables ? data.tables[0]?.cards || [] : data.cards || [];

//   const buttonStyle = {
//     background:
//       appearance.buttonType === "filled"
//         ? appearance.primaryColor
//         : appearance.buttonType === "gradient"
//         ? `linear-gradient(to right, ${appearance.primaryColor}, ${appearance.secondaryColor})`
//         : "transparent",
//     border: appearance.buttonType === "outline" ? `2px solid ${appearance.primaryColor}` : "none",
//     color: appearance.buttonType === "outline" || appearance.buttonType === "gradient" ? appearance.primaryColor : "#ffffff",
//     borderRadius: `${appearance.buttonRadius}px`,
//     padding: "16px",
//     fontWeight: "bold",
//     fontSize: `${appearance.fontSize * 1.1}px`,
//     cursor: "pointer",
//     transition: "all 0.2s",
//   };

//   return (
//     <div
//       style={{
//         fontFamily: appearance.font === "system-ui" ? "system-ui, sans-serif" : `"${appearance.font}", sans-serif`,
//         fontWeight: appearance.fontWeight,
//         fontSize: `${appearance.fontSize}px`,
//         maxWidth: "1200px",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ display: "grid", gap: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
//         {cards.map((card: any, i: number) => (
//           <div
//             key={i}
//             style={{
//               backgroundColor: appearance.columnStyle === "style2" ? "#ffffff" : appearance.primaryColor,

//               color: appearance.columnStyle === "style2" ? "#1f2937" : "#ffffff",
//               borderRadius: "16px",
//               overflow: "hidden",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//             }}
//           >
//             {card.imageUrl && (
//               <img src={card.imageUrl} alt={card.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
//             )}

//             <div style={{ padding: "32px", textAlign: "center" }}>
//               <h3 style={{ fontSize: "1.8em", margin: "0 0 8px 0" }}>{card.title}</h3>
//               {card.titleCaption && <p style={{ opacity: 0.8, margin: "0 0 16px 0" }}>{card.titleCaption}</p>}

//               <div style={{ margin: "24px 0" }}>
//                 <span style={{ fontSize: "3em", fontWeight: "bold", color: card.priceColor || "inherit" }}>
//                   {card.price}
//                 </span>
//                 <span style={{ fontSize: "1.2em", opacity: 0.8 }}>{card.period}</span>
//               </div>

//               {card.priceCaption && <p style={{ opacity: 0.7, margin: "8px 0" }}>{card.priceCaption}</p>}
//               <p style={{ margin: "16px 0", lineHeight: "1.6" }}>{card.description}</p>

//               <ul style={{ textAlign: "left", margin: "24px 0", paddingLeft: "20px" }}>
//                 {card.features.map((f: any, fi: number) => (
//                   <li key={fi} style={{ margin: "12px 0" }}>
//                     <span style={{ color: "#10b981", marginRight: "8px" }}>✓</span> {f.text}
//                   </li>
//                 ))}
//               </ul>

//               {card.buttonLink ? (
//                 <a
//                   href={card.buttonLink}
//                   target={card.buttonLinkTarget || "_self"}
//                   rel={card.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
//                   style={buttonStyle}
//                 >
//                   {card.buttonText}
//                 </a>
//               ) : (
//                 <button style={buttonStyle}>{card.buttonText}</button>
//               )}

//               {card.buttonCaption && (
//                 <p style={{ margin: "12px 0 0 0", opacity: 0.8, fontSize: "0.9em" }}>
//                   {card.buttonCaption}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


//this is wokring perfeclty but hte text issue only 

// import React from 'react';

// interface PricingCardPreviewProps {
//   data: any;
//   appearance: any;
// }

// export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({ data, appearance }) => {
//   // Choose cards: support both old format (data.cards) and new multi-table mode
//   const cards = data.multiTableMode && data.tables?.length > 0
//     ? data.tables[0]?.cards || []
//     : data.cards || [];

//   // Global styles from appearance
//   const primaryColor =  '#1F2937';
//   const secondaryColor = appearance.secondaryColor || '#F3F4F6';
//   const buttonBgColor = appearance.buttonColor || primaryColor;        // NEW: Independent button color
//   const fontFamily = appearance.font && appearance.font !== 'system-ui'
//     ? `"${appearance.font}", sans-serif`
//     : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

//   // Button style (shared)
//   // const buttonStyle: React.CSSProperties = {
//   //   background:
//   //     appearance.buttonType === 'filled'
//   //       ? primaryColor
//   //       : appearance.buttonType === 'gradient'
//   //         ? `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
//   //         : 'transparent',
//   //   border: appearance.buttonType === 'outline' ? `2px solid ${primaryColor}` : 'none',
//   //   color:
//   //     appearance.buttonType === 'outline' || appearance.buttonType === 'gradient'
//   //       ? primaryColor
//   //       : '#ffffff',
//   //   borderRadius: `${appearance.buttonRadius || 12}px`,
//   //   padding: '16px 32px',
//   //   fontWeight: '600',
//   //   fontSize: `${(appearance.fontSize || 16) * 1.1}px`,
//   //   cursor: 'pointer',
//   //   transition: 'all 0.25s ease',
//   //   display: 'inline-block',
//   //   textDecoration: 'none',
//   //   fontFamily: fontFamily,
//   //   boxShadow: appearance.buttonType === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
//   // };

//       const buttonStyle: React.CSSProperties = {
//     background:
//       appearance.buttonType === 'filled'
//         ? buttonBgColor
//         : appearance.buttonType === 'gradient'
//           ? `linear-gradient(to right, ${buttonBgColor}, ${secondaryColor})`
//           : 'transparent',
//     border: appearance.buttonType === 'outline' ? `3px solid ${buttonBgColor}` : 'none',
//     color:
//       appearance.buttonType === 'outline' || appearance.buttonType === 'gradient'
//         ? buttonBgColor
//         : '#ffffff',
//     borderRadius: `${appearance.buttonRadius || 12}px`,
//     padding: '16px 32px',
//     fontWeight: '600',
//     fontSize: `${(appearance.fontSize || 16) * 1.1}px`,
//     cursor: 'pointer',
//     transition: 'all 0.25s ease',
//     display: 'inline-block',
//     textDecoration: 'none',
//     fontFamily: fontFamily,
//     boxShadow: appearance.buttonType === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
//   };

//   // Hover effect (optional but nice)
//   const buttonHoverStyle = {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
//   };

//   return (
//     <div
//       style={{
//         fontFamily,
//         fontWeight: appearance.fontWeight || '400',
//         fontSize: `${appearance.fontSize || 16}px`,
//         lineHeight: '1.6',
//         color: primaryColor,
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '20px 0',
//       }}
//     >
//       <div
//         style={{
//           display: 'grid',
//           gap: '32px',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           alignItems: 'stretch',
//         }}
//       >
//         {cards.map((card: any, i: number) => (
//           <div
//             key={i}
//             style={{
//               backgroundColor: secondaryColor,           // ← Light card background
//               color: primaryColor,                       // ← Dark text
//               borderRadius: '16px',
//               overflow: 'hidden',
//               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//               border: '1px solid #e5e7eb',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-8px)';
//               e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
//             }}
//           >
//             {/* Image */}
//             {card.imageUrl && (
//               <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
//                 <img
//                   src={card.imageUrl}
//                   alt={card.title}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     transition: 'transform 0.4s ease',
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 />
//               </div>
//             )}

//             {/* Content */}
//             <div style={{ padding: '32px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//               <h3 style={{ fontSize: '1.8em', margin: '0 0 8px 0', fontWeight: '700' }}>
//                 {card.title}
//               </h3>
//               {card.titleCaption && (
//                 <p style={{ opacity: 0.7, margin: '0 0 16px 0', fontSize: '0.95em' }}>
//                   {card.titleCaption}
//                 </p>
//               )}

//               {/* Price */}
//               {/* Price */}
//               <div style={{ margin: '24px 0' }}>
//                 <span
//                   style={{
//                     fontSize: '3.2em',
//                     fontWeight: '800',
//                     color: card.priceColor || primaryColor,
//                   }}
//                 >
//                   {card.price}
//                 </span>
//                 <span
//                   style={{
//                     fontSize: '1.3em',
//                     opacity: 0.7,
//                     marginLeft: '4px',
//                     color: card.priceColor || primaryColor   // ← FIXED: Same color as price
//                   }}
//                 >
//                   {card.period}
//                 </span>
//               </div>

//               {card.priceCaption && (
//                 <p style={{ opacity: 0.7, margin: '8px 0 16px', fontSize: '0.95em' }}>
                
//                   {card.priceCaption}
//                 </p>
//               )}

//               {card.description && (
//                 <p style={{ margin: '16px 0', fontSize: '1.1em', fontWeight: '500', opacity: 0.9 }}>
//                   {card.description}
//                 </p>
//               )}

//               {/* Features */}
//               <ul style={{ textAlign: 'left', margin: '28px 0', paddingLeft: '24px', flexGrow: 1 }}>
//                 {card.features?.map((f: any, fi: number) => (
//                   <li key={fi} style={{ margin: '14px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     {/* This renders the exact same check icon that appears in your builder */}
//                     <span style={{
//                       color: '#F3F4F6',
//                       fontSize: '1.4em',
//                       fontWeight: 'bold',
//                       minWidth: '28px'
//                     }}>

//                     </span>
//                     <span style={{ fontSize: '1.02em', lineHeight: '1.5' }}>
//                       {f.text}
//                       {f.hint && <span style={{ marginLeft: '8px', color: '#6b7280', fontSize: '0.9em' }}> ({f.hint})</span>}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Button */}
//               <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
//                 {card.buttonLink ? (
//                   <a
//                     href={card.buttonLink}
//                     target={card.buttonLinkTarget || '_self'}
//                     rel={card.buttonLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
//                     style={buttonStyle}
//                     onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = '';
//                       e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
//                     }}
//                   >
//                     {card.buttonText || 'Get Started'}
//                   </a>
//                 ) : (
//                   <button
//                     style={buttonStyle}
//                     onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = '';
//                       e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
//                     }}
//                   >
//                     {card.buttonText || 'Get Started'}
//                   </button>
//                 )}

//                 {card.buttonCaption && (
//                   <p style={{ margin: '12px 0 0 0', opacity: 0.7, fontSize: '0.9em' }}>
//                     {card.buttonCaption}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// import React from 'react';

// interface PricingCardPreviewProps {
//   data: any;
//   appearance: any;
// }

// export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({ data, appearance }) => {
//   // Choose cards: support both old format (data.cards) and new multi-table mode
//   const cards = data.multiTableMode && data.tables?.length > 0
//     ? data.tables[0]?.cards || []
//     : data.cards || [];

//   // Global styles from appearance - KEEP original primaryColor
//   const primaryColor = appearance.primaryColor || '#1F2937';
//   const secondaryColor = appearance.secondaryColor || '#F3F4F6';
//   const buttonBgColor = appearance.buttonColor || primaryColor;
//   const fontFamily = appearance.font && appearance.font !== 'system-ui'
//     ? `"${appearance.font}", sans-serif`
//     : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

//   // Button style
//   const buttonStyle: React.CSSProperties = {
//     background:
//       appearance.buttonType === 'filled'
//         ? buttonBgColor
//         : appearance.buttonType === 'gradient'
//           ? `linear-gradient(to right, ${buttonBgColor}, ${secondaryColor})`
//           : 'transparent',
//     border: appearance.buttonType === 'outline' ? `3px solid ${buttonBgColor}` : 'none',
//     color:
//       appearance.buttonType === 'outline' || appearance.buttonType === 'gradient'
//         ? buttonBgColor
//         : '#ffffff',
//     borderRadius: `${appearance.buttonRadius || 12}px`,
//     padding: '16px 32px',
//     fontWeight: '600',
//     fontSize: `${(appearance.fontSize || 16) * 1.1}px`,
//     cursor: 'pointer',
//     transition: 'all 0.25s ease',
//     display: 'inline-block',
//     textDecoration: 'none',
//     fontFamily: fontFamily,
//     boxShadow: appearance.buttonType === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
//   };

//   // Hover effect
//   const buttonHoverStyle = {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
//   };

//   return (
//     <div
//       style={{
//         fontFamily,
//         fontWeight: appearance.fontWeight || '400',
//         fontSize: `${appearance.fontSize || 16}px`,
//         lineHeight: '1.6',
//         color: '#1F2937', // Container text color (default)
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '20px 0',
//       }}
//     >
//       <div
//         style={{
//           display: 'grid',
//           gap: '32px',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           alignItems: 'stretch',
//         }}
//       >
//         {cards.map((card: any, i: number) => (
//           <div
//             key={i}
//             style={{
//               backgroundColor: secondaryColor,
//               borderRadius: '16px',
//               overflow: 'hidden',
//               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//               border: '1px solid #e5e7eb',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-8px)';
//               e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
//             }}
//           >
//             {/* Image */}
//             {card.imageUrl && (
//               <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
//                 <img
//                   src={card.imageUrl}
//                   alt={card.title}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     transition: 'transform 0.4s ease',
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                 />
//               </div>
//             )}

//             {/* Content */}
//             <div style={{ padding: '32px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//               {/* Title - KEEP original color */}
//               <h3 style={{ 
//                 fontSize: '1.8em', 
//                 margin: '0 0 8px 0', 
//                 fontWeight: '700',
//                 color: '#1F2937'  // Original color
//               }}>
//                 {card.title}
//               </h3>
              
//               {card.titleCaption && (
//                 <p style={{ 
//                   opacity: 0.7, 
//                   margin: '0 0 16px 0', 
//                   fontSize: '0.95em',
//                   color: '#1F2937'  // Original color
//                 }}>
//                   {card.titleCaption}
//                 </p>
//               )}

//               {/* Price - KEEP original logic */}
//               <div style={{ margin: '24px 0' }}>
//                 <span
//                   style={{
//                     fontSize: '3.2em',
//                     fontWeight: '800',
//                     color: card.priceColor || '#1F2937',  // Original logic
//                   }}
//                 >
//                   {card.price}
//                 </span>
//                 <span
//                   style={{
//                     fontSize: '1.3em',
//                     opacity: 0.7,
//                     marginLeft: '4px',
//                     color: card.priceColor || '#1F2937'  // Original logic
//                   }}
//                 >
//                   {card.period}
//                 </span>
//               </div>

//               {card.priceCaption && (
//                 <p style={{ 
//                   opacity: 0.7, 
//                   margin: '8px 0 16px', 
//                   fontSize: '0.95em',
//                   color: '#1F2937'  // Original color
//                 }}>
//                   {card.priceCaption}
//                 </p>
//               )}

//               {/* DESCRIPTION - USE PRIMARY COLOR */}
//               {card.description && (
//                 <p style={{ 
//                   margin: '16px 0', 
//                   fontSize: '1.1em', 
//                   fontWeight: '500', 
//                   opacity: 0.9,
//                   color: primaryColor  // ← CHANGED to primaryColor
//                 }}>
//                   {card.description}
//                 </p>
//               )}

//               {/* FEATURES - USE PRIMARY COLOR */}
//               <ul style={{ 
//                 textAlign: 'left', 
//                 margin: '28px 0', 
//                 paddingLeft: '24px', 
//                 flexGrow: 1 
//               }}>
//                 {card.features?.map((f: any, fi: number) => (
//                   <li key={fi} style={{ 
//                     margin: '14px 0', 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: '12px' 
//                   }}>
//                     <span style={{
//                       color: '#10B981',
//                       fontSize: '1.4em',
//                       fontWeight: 'bold',
//                       minWidth: '28px'
//                     }}>
                      
//                     </span>
//                     <span style={{ 
//                       fontSize: '1.02em', 
//                       lineHeight: '1.5',
//                       color: primaryColor  // 
//                     }}>
//                       {f.text}
//                       {f.hint && (
//                         <span style={{ 
//                           marginLeft: '8px', 
//                           color: '#6b7280', 
//                           fontSize: '0.9em' 
//                         }}>
//                           ({f.hint})
//                         </span>
//                       )}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Button */}
//               <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
//                 {card.buttonLink ? (
//                   <a
//                     href={card.buttonLink}
//                     target={card.buttonLinkTarget || '_self'}
//                     rel={card.buttonLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
//                     style={buttonStyle}
//                     onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = '';
//                       e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
//                     }}
//                   >
//                     {card.buttonText || 'Get Started'}
//                   </a>
//                 ) : (
//                   <button
//                     style={buttonStyle}
//                     onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = '';
//                       e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
//                     }}
//                   >
//                     {card.buttonText || 'Get Started'}
//                   </button>
//                 )}

//                 {card.buttonCaption && (
//                   <p style={{ 
//                     margin: '12px 0 0 0', 
//                     opacity: 0.7, 
//                     fontSize: '0.9em',
//                     color: '#1F2937'  // Original color
//                   }}>
//                     {card.buttonCaption}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



import React from 'react';

interface PricingCardPreviewProps {
  data: any;
  appearance: any;
}

export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({ data, appearance }) => {
  // Choose cards: support both old format (data.cards) and new multi-table mode
  const cards = data.multiTableMode && data.tables?.length > 0
    ? data.tables[0]?.cards || []
    : data.cards || [];

  // Global styles from appearance - KEEP original primaryColor
  const primaryColor = appearance.primaryColor || '#1F2937';
  const secondaryColor = appearance.secondaryColor || '#F3F4F6';
  const buttonBgColor = appearance.buttonColor || primaryColor;
  const fontFamily = appearance.font && appearance.font !== 'system-ui'
    ? `"${appearance.font}", sans-serif`
    : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // Button style
  const buttonStyle: React.CSSProperties = {
    background:
      appearance.buttonType === 'filled'
        ? buttonBgColor
        : appearance.buttonType === 'gradient'
          ? `linear-gradient(to right, ${buttonBgColor}, ${secondaryColor})`
          : 'transparent',
    border: appearance.buttonType === 'outline' ? `3px solid ${buttonBgColor}` : 'none',
    color:
      appearance.buttonType === 'outline' || appearance.buttonType === 'gradient'
        ? buttonBgColor
        : '#ffffff',
    borderRadius: `${appearance.buttonRadius || 12}px`,
    padding: '16px 32px',
    fontWeight: '600',
    fontSize: `${(appearance.fontSize || 16) * 1.1}px`,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'inline-block',
    textDecoration: 'none',
    fontFamily: fontFamily,
    boxShadow: appearance.buttonType === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
  };

  // Hover effect
  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  };

  return (
    <div
      style={{
        fontFamily,
        fontWeight: appearance.fontWeight || '400',
        fontSize: `${appearance.fontSize || 16}px`,
        lineHeight: '1.6',
        color: '#1F2937', // Container text color (default)
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '32px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {cards.map((card: any, i: number) => (
          <div
            key={i}
            style={{
              backgroundColor: secondaryColor,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
          >
            {/* Image */}
            {card.imageUrl && (
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '32px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Title - KEEP original color */}
              <h3 style={{ 
                fontSize: '1.8em', 
                margin: '0 0 8px 0', 
                fontWeight: '700',
                color: '#1F2937'  // Original color
              }}>
                {card.title}
              </h3>
              
              {card.titleCaption && (
                <p style={{ 
                  opacity: 0.7, 
                  margin: '0 0 16px 0', 
                  fontSize: '0.95em',
                  color: '#1F2937'  // Original color
                }}>
                  {card.titleCaption}
                </p>
              )}

              {/* Price - KEEP original logic */}
              <div style={{ margin: '24px 0' }}>
                <span
                  style={{
                    fontSize: '3.2em',
                    fontWeight: '800',
                    color: card.priceColor || '#1F2937',  // Original logic
                  }}
                >
                  {card.price}
                </span>
                <span
                  style={{
                    fontSize: '1.3em',
                    opacity: 0.7,
                    marginLeft: '4px',
                    color: card.priceColor || '#1F2937'  // Original logic
                  }}
                >
                  {card.period}
                </span>
              </div>

              {card.priceCaption && (
                <p style={{ 
                  opacity: 0.7, 
                  margin: '8px 0 16px', 
                  fontSize: '0.95em',
                  color: '#1F2937'  // Original color
                }}>
                  {card.priceCaption}
                </p>
              )}

              {/* DESCRIPTION - USE PRIMARY COLOR */}
              {card.description && (
                <p style={{ 
                  margin: '16px 0', 
                  fontSize: '1.1em', 
                  fontWeight: '500', 
                  opacity: 0.9,
                  color: primaryColor  // ← CHANGED to primaryColor
                }}>
                  {card.description}
                </p>
              )}

              {/* FEATURES - WITH HINT TOOLTIPS */}
              <ul style={{ 
                textAlign: 'left', 
                margin: '28px 0', 
                paddingLeft: '24px', 
                flexGrow: 1 
              }}>
                {card.features?.map((f: any, fi: number) => (
                  <li key={fi} style={{ 
                    margin: '14px 0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    position: 'relative'
                  }}>
                    <span style={{
                      color: '#10B981',
                      fontSize: '1.4em',
                      fontWeight: 'bold',
                      minWidth: '28px'
                    }}>
                      
                    </span>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px' 
                    }}>
                      <span style={{ 
                        fontSize: '1.02em', 
                        lineHeight: '1.5',
                        color: primaryColor
                      }}>
                        {f.text}
                      </span>
                      
                      {/* Hint Icon - Only show if hint exists */}
                      {f.hint && f.hint.trim() !== '' && (
                        <div 
                          style={{ position: 'relative', display: 'inline-block' }}
                          onMouseEnter={(e) => {
                            const tooltip = e.currentTarget.querySelector('.hint-tooltip');
                            if (tooltip) {
                              tooltip.style.opacity = '1';
                              tooltip.style.visibility = 'visible';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const tooltip = e.currentTarget.querySelector('.hint-tooltip');
                            if (tooltip) {
                              tooltip.style.opacity = '0';
                              tooltip.style.visibility = 'hidden';
                            }
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '16px',
                              height: '16px',
                              fontSize: '10px',
                              borderRadius: '50%',
                              backgroundColor: '#adadad',
                              color: '#6b7280',
                              cursor: 'help',
                              marginLeft: '4px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#000000';
                              e.currentTarget.style.color = '#f2f2f2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#adadad';
                              e.currentTarget.style.color = '#6b7280';
                            }}
                            title={f.hint} // Fallback title attribute
                          >
                            ?
                          </span>
                          
                          {/* Tooltip */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: '#1f2937',
                              color: 'white',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              whiteSpace: 'nowrap',
                              zIndex: 1000,
                              opacity: 0,
                              visibility: 'hidden',
                              transition: 'opacity 0.2s ease, visibility 0.2s ease',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                              marginBottom: '8px',
                              pointerEvents: 'none'
                            }}
                            className="hint-tooltip"
                          >
                            {f.hint}
                            {/* Tooltip arrow */}
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 0,
                              height: 0,
                              borderLeft: '6px solid transparent',
                              borderRight: '6px solid transparent',
                              borderTop: '6px solid #1f2937'
                            }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                {card.buttonLink ? (
                  <a
                    href={card.buttonLink}
                    target={card.buttonLinkTarget || '_self'}
                    rel={card.buttonLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
                    style={buttonStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
                    }}
                  >
                    {card.buttonText || 'Get Started'}
                  </a>
                ) : (
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = buttonStyle.boxShadow as string;
                    }}
                  >
                    {card.buttonText || 'Get Started'}
                  </button>
                )}

                {card.buttonCaption && (
                  <p style={{ 
                    margin: '12px 0 0 0', 
                    opacity: 0.7, 
                    fontSize: '0.9em',
                    color: '#1F2937'  // Original color
                  }}>
                    {card.buttonCaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};