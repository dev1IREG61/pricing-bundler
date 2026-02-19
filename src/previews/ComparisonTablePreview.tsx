import React, { useState } from 'react';
import { PaymentFlow } from '../PaymentFlow';

interface Plan {
  name: string;
  price: string;
  period: string;
  imageUrl?: string | null;
  media?: {
    type: "image" | "video" | "youtube";
    url: string;
    poster?: string;
    duration?: number;
    youtubeId?: string;
  };
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
  widgetId?: string;
}

const styles = `
  .ct-wrap {
    container-type: inline-size;
    container-name: ctable;
  }
  .ct-desktop { display: block; }
  .ct-mobile { display: none; }

  @container ctable (max-width: 599px) {
    .ct-desktop { display: none !important; }
    .ct-mobile { display: flex !important; }
  }
`;

export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance, widgetId }) => {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(data.categories.map(c => c.name))
  );

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

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const buttonRadius = `${app.buttonRadius}px`;

  if (showPaymentFlow && selectedPlan) {
    return (
      <PaymentFlow
        widgetId={widgetId || ''}
        planId={selectedPlan.planId}
        interval={data.interval}
        paymentType={data.paymentType || 'one_time'}
        onBack={() => {
          setShowPaymentFlow(false);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="ct-wrap"
        style={{
          fontFamily: app.font === "system-ui" ? "system-ui, sans-serif" : `"${app.font}", sans-serif`,
          fontWeight: app.fontWeight,
          fontSize: `${app.fontSize}px`,
          color: app.primaryColor,
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h3 style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "2.2em",
          padding: '0 16px'
        }}>
          {data.title}
        </h3>

        {/* Desktop View */}
        <div className="ct-desktop">
          <div style={{
            maxWidth: data.plans.length === 1 ? '540px' : data.plans.length === 2 ? '860px' : '100%',
            margin: '0 auto',
          }}>
          <div style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
            alignItems: "stretch",
          }}>
            <div />
            {data.plans.map((plan, i) => (
              <div key={i} style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
                {(() => {
                  const media = plan.media || (plan.imageUrl ? { type: "image" as const, url: plan.imageUrl } : null);
                  if (!media) return null;
                  return (
                    <div style={{ marginBottom: "20px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", aspectRatio: "16/9", backgroundColor: "#000", flexShrink: 0 }}>
                      {media.type === "youtube" ? (
                        <iframe
                          src={`${media.url}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${media.youtubeId}`}
                          style={{ width: "100%", height: "100%", border: 0, pointerEvents: 'none' }}
                          allow="autoplay; encrypted-media"
                        />
                      ) : media.type === "video" ? (
                        <video src={media.url} poster={media.poster} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <img src={media.url} alt={plan.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                  );
                })()}

                <div style={{
                  backgroundColor: plan.headerColor || app.primaryColor || '#3b82f6',
                  color: plan.headerTextColor || '#ffffff',
                  padding: "24px 16px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  flexShrink: 0,
                }}>
                  <h4 style={{ fontSize: "1.6em", margin: "0 0 8px 0" }}>{plan.name}</h4>
                  <div style={{ fontSize: "2.8em", lineHeight: "1" }}>
                    {data.currency === 'usd' ? `$${plan.price?.replace(/[^0-9.]/g, '') || ''}` : plan.price}
                  </div>
                  <div style={{ opacity: 0.9, fontSize: "1em", marginTop: "4px" }}>{plan.period}</div>
                </div>

                <div style={{ marginTop: "auto" }}>
                  {data.payment_gateway === "stripe" ? (
                    <button
                      onClick={() => { setSelectedPlan(plan); setShowPaymentFlow(true); }}
                      style={{
                        background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : app.buttonType === "gradient" ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})` : "transparent",
                        border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}` : "none",
                        color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : "#ffffff",
                        borderRadius: buttonRadius, padding: "16px 32px", fontWeight: "600",
                        fontSize: `${app.fontSize * 1.1}px`, textDecoration: "none",
                        display: "block", textAlign: "center", transition: "all 0.3s ease", width: "100%", cursor: "pointer"
                      }}
                    >{plan.buttonText}</button>
                  ) : plan.buttonLink ? (
                    <a
                      href={plan.buttonLink}
                      target={plan.buttonLinkTarget || "_self"}
                      rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                      style={{
                        background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : app.buttonType === "gradient" ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor || app.primaryColor}, ${app.secondaryColor})` : "transparent",
                        border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}` : "none",
                        color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : "#ffffff",
                        borderRadius: buttonRadius, padding: "16px 32px", fontWeight: "600",
                        fontSize: `${app.fontSize * 1.1}px`, textDecoration: "none",
                        display: "block", textAlign: "center", transition: "all 0.3s ease", width: "100%",
                      }}
                    >{plan.buttonText}</a>
                  ) : (
                    <button style={{
                      background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : "transparent",
                      border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor || app.primaryColor}` : "none",
                      color: app.buttonType === "outline" ? (plan.buttonColor || app.buttonColor || app.primaryColor) : "#ffffff",
                      borderRadius: buttonRadius, padding: "16px 32px", fontWeight: "600",
                      textAlign: "center", width: "100%", cursor: "pointer",
                    }}>{plan.buttonText}</button>
                  )}
                  {plan.buttonCaption && (
                    <p style={{ margin: "16px 0 0", opacity: 0.8, fontSize: "0.95em" }}>{plan.buttonCaption}</p>
                  )}
                </div>
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
                    width: "100%", padding: "18px 24px",
                    backgroundColor: app.secondaryColor || '#f3f4f6',
                    border: "none", textAlign: "left", fontWeight: "600",
                    fontSize: "1.3em", display: "flex", gap: "12px",
                    alignItems: "center", cursor: "pointer",
                    color: app.categoryTextColor || "#3b82f6",
                    borderBottom: "2px solid #e5e7eb", textTransform: "uppercase",
                  }}
                >
                  <span style={{
                    transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    color: app.primaryColor || "gray"
                  }}>▸</span>
                  {cat.name}
                </button>
                {expandedCategories.has(cat.name) && (
                  <div>
                    {cat.features.map((feat, featIndex) => (
                      <div
                        key={feat.name}
                        style={{
                          display: "grid", gap: "16px", padding: "16px 24px",
                          fontWeight: "500", borderBottom: "1px solid #e5e7eb",
                          gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
                          alignItems: "center",
                          backgroundColor: featIndex % 2 === 0 ? "transparent" : "#f9fafb",
                        }}
                      >
                        <div style={{ color: app.primaryColor }}>{feat.name}</div>
                        {data.plans.map(plan => (
                          <div key={plan.name} style={{ textAlign: "center" }}>
                            {feat.type === "boolean" ? (
                              plan.features[feat.name]
                                ? <span style={{ color: "#10b981", fontSize: "1.8em" }}>✓</span>
                                : <span style={{ color: "#ef4444", fontSize: "1.8em" }}>✗</span>
                            ) : (
                              <span style={{ fontWeight: "500" }}>{(plan.features[feat.name] as string) || "-"}</span>
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
        </div>

        {/* Mobile View */}
        <div className="ct-mobile" style={{ flexDirection: 'column', gap: '24px' }}>
          {data.plans.map((plan, planIdx) => (
            <div key={planIdx} style={{
              border: '2px solid #e5e7eb', borderRadius: '16px',
              overflow: 'hidden', backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {(() => {
                const media = plan.media || (plan.imageUrl ? { type: "image" as const, url: plan.imageUrl } : null);
                if (!media) return null;
                return (
                  <div style={{ width: '100%', aspectRatio: "16/9", backgroundColor: "#000" }}>
                    {media.type === "youtube" ? (
                      <iframe
                        src={`${media.url}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${media.youtubeId}`}
                        style={{ width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
                        allow="autoplay; encrypted-media"
                      />
                    ) : media.type === "video" ? (
                      <video src={media.url} poster={media.poster} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={media.url} alt={plan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                );
              })()}

              <div style={{
                padding: '20px',
                backgroundColor: plan.headerColor || '#3b82f6',
                color: plan.headerTextColor || '#ffffff',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '0 0 8px 0' }}>{plan.name}</h4>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', margin: '8px 0' }}>
                  {data.currency === 'usd' ? `$${plan.price?.replace(/[^0-9.]/g, '') || ''}` : plan.price}
                </div>
                <div style={{ fontSize: '1em', opacity: 0.9 }}>{plan.period}</div>
              </div>

              <div style={{ padding: '20px' }}>
                {data.payment_gateway === "stripe" ? (
                  <button
                    onClick={() => { setSelectedPlan(plan); setShowPaymentFlow(true); }}
                    style={{
                      background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor) : app.buttonType === "gradient" ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor}, ${app.secondaryColor})` : "transparent",
                      border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
                      color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor) : "#fff",
                      borderRadius: buttonRadius, padding: '14px 24px', fontWeight: '600',
                      fontSize: '1em', textDecoration: 'none', display: 'block',
                      textAlign: 'center', width: '100%', cursor: 'pointer'
                    }}
                  >{plan.buttonText}</button>
                ) : plan.buttonLink ? (
                  <a
                    href={plan.buttonLink}
                    target={plan.buttonLinkTarget || "_self"}
                    rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                    style={{
                      background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor) : app.buttonType === "gradient" ? `linear-gradient(to right, ${plan.buttonColor || app.buttonColor}, ${app.secondaryColor})` : "transparent",
                      border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
                      color: app.buttonType === "outline" || app.buttonType === "gradient" ? (plan.buttonColor || app.buttonColor) : "#fff",
                      borderRadius: buttonRadius, padding: '14px 24px', fontWeight: '600',
                      fontSize: '1em', textDecoration: 'none', display: 'block',
                      textAlign: 'center', width: '100%'
                    }}
                  >{plan.buttonText}</a>
                ) : (
                  <button style={{
                    background: app.buttonType === "filled" ? (plan.buttonColor || app.buttonColor) : "transparent",
                    border: app.buttonType === "outline" ? `3px solid ${plan.buttonColor || app.buttonColor}` : "none",
                    color: app.buttonType === "outline" ? (plan.buttonColor || app.buttonColor) : "#fff",
                    borderRadius: buttonRadius, padding: '14px 24px', fontWeight: '600',
                    textAlign: 'center', width: '100%', cursor: 'pointer'
                  }}>{plan.buttonText}</button>
                )}
                {plan.buttonCaption && (
                  <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.9em', opacity: 0.8 }}>{plan.buttonCaption}</p>
                )}
              </div>

              <div style={{ borderTop: '2px solid #e5e7eb' }}>
                {data.categories.map((cat) => (
                  <div key={cat.name}>
                    <div style={{
                      backgroundColor: '#f3f4f6', padding: '12px 20px',
                      fontWeight: 'bold', color: app.categoryTextColor || '#3b82f6',
                      fontSize: '1em', borderBottom: '1px solid #e5e7eb', textTransform: 'uppercase'
                    }}>
                      {cat.name}
                    </div>
                    {cat.features.map((feat) => (
                      <div key={feat.name} style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', padding: '12px 20px',
                        borderBottom: '1px solid #f3f4f6'
                      }}>
                        <span style={{ fontWeight: '500', fontSize: '0.95em', color: app.primaryColor }}>{feat.name}</span>
                        <div>
                          {feat.type === "boolean" ? (
                            plan.features[feat.name]
                              ? <span style={{ color: '#10b981', fontSize: '1.5em' }}>✓</span>
                              : <span style={{ color: '#ef4444', fontSize: '1.5em' }}>✗</span>
                          ) : (
                            <span style={{ fontWeight: '500', fontSize: '0.95em' }}>{(plan.features[feat.name] as string) || "-"}</span>
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