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
}

interface Category {
  name: string;
  features: { name: string; type: "text" | "boolean" }[];
}

interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  font: string;
  fontWeight: "400" | "700";
  fontSize: number;
  buttonRadius: number;
  buttonType: "filled" | "outline" | "gradient";
}

interface ComparisonTablePreviewProps {
  data: {
    title: string;
    plans: Plan[];
    categories: Category[];
  };
  appearance: AppearanceSettings;
}

export const ComparisonTablePreview: React.FC<ComparisonTablePreviewProps> = ({ data, appearance }) => {
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

  const buttonStyle = {
    background:
      appearance.buttonType === "filled"
        ? appearance.primaryColor
        : appearance.buttonType === "gradient"
          ? `linear-gradient(to right, ${appearance.primaryColor}, ${appearance.secondaryColor})`
          : "transparent",
    border: appearance.buttonType === "outline" ? `2px solid ${appearance.primaryColor}` : "none",
    color: appearance.buttonType === "outline" || appearance.buttonType === "gradient" ? appearance.primaryColor : "#ffffff",
    borderRadius: `${appearance.buttonRadius}px`,
    padding: "12px 24px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  return (
    <div
      style={{
        fontFamily: appearance.font === "system-ui" ? "system-ui, sans-serif" : `"${appearance.font}", sans-serif`,
        fontWeight: appearance.fontWeight,
        fontSize: `${appearance.fontSize}px`,
        color: appearance.primaryColor,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "32px", fontSize: "2em" }}>
        {data.title}
      </h3>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)` }}>
        <div />
        {data.plans.map((plan, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            {plan.imageUrl && (
              <div style={{ marginBottom: "16px", borderRadius: "12px", overflow: "hidden", border: "2px solid #e5e7eb" }}>
                <img src={plan.imageUrl} alt={plan.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              </div>
            )}

            <div
              style={{
                backgroundColor: appearance.primaryColor,
                color: "#ffffff",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              <h4 style={{ fontSize: "1.5em", margin: "0 0 8px 0" }}>{plan.name}</h4>
              <div style={{ fontSize: "2.2em", fontWeight: "bold" }}>{plan.price}</div>
              <div style={{ opacity: 0.8, fontSize: "0.9em" }}>{plan.period}</div>
            </div>

            {plan.buttonLink ? (
              <a
                href={plan.buttonLink}
                target={plan.buttonLinkTarget || "_self"}
                rel={plan.buttonLinkTarget === "_blank" ? "noopener noreferrer" : undefined}
                style={buttonStyle}
                className="widget-button"
              >
                {plan.buttonText}
              </a>
            ) : (
              <button style={buttonStyle}>{plan.buttonText}</button>
            )}

            {plan.buttonCaption && (
              <p style={{ margin: "12px 0 0 0", fontSize: "0.9em", opacity: 0.8 }}>
                {plan.buttonCaption}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", borderTop: "2px solid #e5e7eb" }}>
        {data.categories.map(cat => (
          <div key={cat.name}>
            <button
              onClick={() => toggleCategory(cat.name)}
              style={{
                width: "100%",
                padding: "16px 20px",
                backgroundColor: appearance.secondaryColor,
                border: "none",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "1.2em",
                display: "flex",
                gap: "12px",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
                color: appearance.primaryColor   // ← ADD THIS LINE
              }}
            >
              <span style={{
                transform: expandedCategories.has(cat.name) ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                color: appearance.primaryColor,
                fontSize: "1.4em",
                fontWeight: "bold"
              }}>
                ▸
              </span>
              <span style={{ color: appearance.primaryColor }}>{cat.name}</span>  {/* ← CHANGE THIS LINE */}

            </button>

            {expandedCategories.has(cat.name) && (
              <div>
                {cat.features.map(feat => (
                  <div
                    key={feat.name}
                    style={{
                      display: "grid",
                      gap: "16px",
                      padding: "16px 20px",
                      borderBottom: "1px solid #e5e7eb",
                      gridTemplateColumns: `220px repeat(${data.plans.length}, 1fr)`,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "500" }}>{feat.name}</div>
                    {data.plans.map(plan => (
                      <div key={plan.name} style={{ textAlign: "center" }}>
                        {feat.type === "boolean" ? (
                          plan.features[feat.name] ? (
                            <span style={{ color: "#10b981", fontSize: "1.8em" }}>✓</span>
                          ) : (
                            <span style={{ color: "#ef4444", fontSize: "1.8em" }}>✗</span>
                          )
                        ) : (
                          <span>{(plan.features[feat.name] as string) || "-"}</span>
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
  );
};