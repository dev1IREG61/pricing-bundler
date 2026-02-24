import React, { useState } from "react";
import { PaymentFlow } from "../PaymentFlow";

interface PricingCardPreviewProps {
  data: any;
  appearance: any;
  widgetId?: string;
}

export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({
  data,
  appearance,
  widgetId,
}) => {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeTableId, setActiveTableId] = useState<string>(
    data.multiTableMode && data.tables?.length > 0 ? data.tables[0].id : "",
  );
  const [activeSlider, setActiveSlider] = useState<{
    cardIndex: number;
    featureIndex: number;
  } | null>(null);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [prices, setPrices] = useState<Record<number, string>>({});

  const isMultiTable =
    data.multiTableMode && data.tables && data.tables.length > 0;
  const tables = isMultiTable
    ? data.tables
    : [
        {
          cards: data.cards || [],
          name: "",
          caption: "",
          showWidgetTitle: false,
        },
      ];

  const primaryColor = appearance.primaryColor || "#1F2937";
  const secondaryColor = appearance.secondaryColor || "#F3F4F6";
  const buttonBgColor = appearance.buttonColor || primaryColor;
  const fontFamily =
    appearance.font && appearance.font !== "system-ui"
      ? `"${appearance.font}", sans-serif`
      : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const buttonStyle: React.CSSProperties = {
    background:
      appearance.buttonType === "filled"
        ? buttonBgColor
        : appearance.buttonType === "gradient"
          ? `linear-gradient(to right, ${buttonBgColor}, ${secondaryColor})`
          : "transparent",
    border:
      appearance.buttonType === "outline"
        ? `3px solid ${buttonBgColor}`
        : "none",
    color:
      appearance.buttonType === "outline" ||
      appearance.buttonType === "gradient"
        ? buttonBgColor
        : "#ffffff",
    borderRadius: `${appearance.buttonRadius || 12}px`,
    padding: "16px 32px",
    fontWeight: "600",
    fontSize: `${(appearance.fontSize || 16) * 1.1}px`,
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "inline-block",
    textDecoration: "none",
    fontFamily,
    boxShadow:
      appearance.buttonType === "filled"
        ? "0 4px 12px rgba(0,0,0,0.15)"
        : "none",
  };

  const activeCards = isMultiTable
    ? tables.find((t) => t.id === activeTableId)?.cards || []
    : tables[0]?.cards || [];

  const activeTable = tables.find((t) => t.id === activeTableId) || tables[0];

  // Initialize prices and slider values
  React.useEffect(() => {
    const initialPrices: Record<number, string> = {};
    const initialSliders: Record<string, number> = {};
    activeCards.forEach((card: any, index: number) => {
      initialPrices[index] = card.price;
      card.features?.forEach((feature: any, fIndex: number) => {
        if (feature.dynamicPricing && feature.defaultValue) {
          initialSliders[`${index}-${fIndex}`] = feature.defaultValue;
        }
      });
    });
    setPrices(initialPrices);
    setSliderValues(initialSliders);
  }, [activeCards]);

  const handleSliderChange = (
    cardIndex: number,
    featureIndex: number,
    value: number,
  ) => {
    const feature = activeCards[cardIndex].features[featureIndex];
    if (!feature.dynamicPricing) return;

    const key = `${cardIndex}-${featureIndex}`;
    setSliderValues((prev) => ({ ...prev, [key]: value }));

    const basePrice =
      parseFloat(activeCards[cardIndex].price.replace(/[^0-9.]/g, "")) || 0;
    const defaultVal = feature.defaultValue || 1;
    const pricePerUnit = feature.pricePerUnit || 0;
    const unitDiff = value - defaultVal;

    let newPrice;
    if (feature.pricingType === "fixed") {
      newPrice = basePrice + unitDiff * pricePerUnit;
    } else {
      const priceMultiplier = 1 + (unitDiff * pricePerUnit) / 100;
      newPrice = basePrice * priceMultiplier;
    }

    newPrice = Math.max(0, newPrice).toFixed(2);
    setPrices((prev) => ({ ...prev, [cardIndex]: newPrice }));
  };

  if (showPaymentFlow && selectedPlan) {
    return (
      <PaymentFlow
        widgetId={widgetId || ""}
        planId={selectedPlan.planId}
        interval={data.interval}
        paymentType={data.paymentType || "one_time"}
        onBack={() => {
          setShowPaymentFlow(false);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <div
      style={{
        fontFamily,
        fontWeight: appearance.fontWeight || "400",
        fontSize: `${appearance.fontSize || 16}px`,
        lineHeight: "1.6",
        color: "#1F2937",
        width: "100%",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Global Widget Title (if not multi-table or showWidgetTitle is true) */}
      {data.showWidgetTitle && !isMultiTable && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
            padding: "0 16px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8em, 5vw, 2.8em)",
              fontWeight: "800",
              margin: "0 0 12px 0",
              color: data.widgetTitleColor || primaryColor,
            }}
          >
            {data.widgetTitle || "Choose Your Plan"}
          </h2>
          {data.widgetTitleCaption && (
            <p
              style={{
                fontSize: "clamp(1em, 3vw, 1.3em)",
                opacity: 0.8,
                color: data.widgetCaptionColor || "#6B7280",
              }}
            >
              {data.widgetTitleCaption}
            </p>
          )}
        </div>
      )}

      {/* Tabs for Multi-Table Mode */}
      {isMultiTable && tables.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "32px",
            padding: "0 16px",
          }}
        >
          {tables.map((table: any) => (
            <button
              key={table.id}
              onClick={() => setActiveTableId(table.id)}
              style={{
                padding: "10px 20px",
                fontSize: "clamp(0.85em, 2.5vw, 1em)",
                fontWeight: activeTableId === table.id ? "700" : "500",
                backgroundColor:
                  activeTableId === table.id ? "#1275f8" : "transparent",
                color: activeTableId === table.id ? "#ffffff" : primaryColor,
                border: `2px solid #d6d6d6`,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                minWidth: "80px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (activeTableId !== table.id) {
                  e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTableId !== table.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {table.name}
              {table.caption && (
                <span
                  style={{
                    display: "block",
                    fontSize: "0.8em",
                    opacity: 0.9,
                    marginTop: "4px",
                    fontWeight: "normal",
                  }}
                >
                  {table.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Table Title & Caption (per table) */}
      {isMultiTable && activeTable?.showWidgetTitle && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "0 16px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5em, 4vw, 1.8em)",
              fontWeight: "600",
              margin: "0 0 12px 0",
              color: activeTable.widgetTitleColor || primaryColor,
            }}
          >
            {activeTable.widgetTitle || activeTable.name}
          </h2>
          {activeTable.widgetTitleCaption && (
            <p
              style={{
                fontSize: "clamp(1em, 2.5vw, 1.2em)",
                opacity: 0.85,
                color: activeTable.widgetCaptionColor || "#6B7280",
              }}
            >
              {activeTable.widgetTitleCaption}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid - Responsive */}
      <div
        style={{
          display: "grid",
          gap: "clamp(20px, 3vw, 32px)",
          gridTemplateColumns:
            activeCards.length === 1
              ? "1fr"
              : activeCards.length === 2
                ? "repeat(auto-fit, minmax(min(100%, 280px), 1fr))"
                : "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {activeCards.map((card: any, i: number) => (
          <div
            key={i}
            style={{
              backgroundColor: secondaryColor,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            }}
          >
            {/* Image */}
            {card.imageUrl && (
              <div
                style={{
                  position: "relative",
                  height: "clamp(160px, 30vw, 200px)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            )}

            {/* Content */}
            <div
              style={{
                padding: "clamp(20px, 4vw, 32px)",
                textAlign: "center",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(1.4em, 3.5vw, 1.8em)",
                  margin: "0 0 8px 0",
                  fontWeight: "700",
                  color: "#1F2937",
                }}
              >
                {card.title}
              </h3>

              {card.titleCaption && (
                <p
                  style={{
                    opacity: 0.7,
                    margin: "0 0 16px 0",
                    fontSize: "clamp(0.85em, 2vw, 0.95em)",
                    color: "#1F2937",
                  }}
                >
                  {card.titleCaption}
                </p>
              )}
              {card.oldPriceEnabled &&
                (card.oldPrice || card.discountLabel) && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "12px",
                      minHeight: "28px",
                      position: "relative",
                      width: "100%",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {card.oldPrice && (
                      <div
                        style={{
                          color: primaryColor || "#94a3b8",
                          fontSize: "clamp(1.2em, 3vw, 1.5em)",
                          textDecoration: "line-through",
                          opacity: 0.8,
                        }}
                      >
                        {card.oldPrice}
                      </div>
                    )}

                    {card.discountLabel && (
                      <div
                        style={{
                          backgroundColor: card.discountLabelColor || "#EF4444",
                          color: card.discountLabelTextColor || "#FFFFFF",
                          padding: "6px 12px",
                          borderRadius: "50px",
                          fontSize: "clamp(0.8em, 2vw, 0.9em)",
                          fontWeight: "bold",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          whiteSpace: "nowrap",
                          position: "absolute",
                          right: "8px",
                        }}
                      >
                        {card.discountLabel}
                      </div>
                    )}
                  </div>
                )}

              <div style={{ margin: "10px 0" }}>
                <span
                  style={{
                    fontSize: "clamp(2.2em, 6vw, 3.2em)",
                    fontWeight: "800",
                    color: card.priceColor,
                  }}
                >
                  {data.currency === "usd"
                    ? `${prices[i] || card.price?.replace(/[^0-9.]/g, "") || ""}`
                    : prices[i] || card.price}
                </span>
                <span
                  style={{
                    fontSize: "clamp(1em, 2.5vw, 1.3em)",
                    opacity: 0.7,
                    marginLeft: "4px",
                    color: card.priceColor,
                  }}
                >
                  {card.period}
                </span>
              </div>

              {card.priceCaption && (
                <p
                  style={{
                    opacity: 0.7,
                    margin: "3px 0 16px",
                    fontSize: "clamp(0.85em, 2vw, 0.95em)",
                    color: primaryColor || "#1F2937",
                  }}
                >
                  {card.priceCaption}
                </p>
              )}

              {card.description && (
                <p
                  style={{
                    margin: "2px 0",
                    fontSize: "clamp(1em, 2.2vw, 1.1em)",
                    fontWeight: "500",
                    opacity: 0.9,
                    color: primaryColor,
                  }}
                >
                  {card.description}
                </p>
              )}

              <ul
                style={{
                  textAlign: "left",
                  margin: "28px 0",
                  paddingLeft: "0",
                  listStyle: "none",
                  flexGrow: 1,
                  minHeight: "clamp(200px, 35vw, 280px)",
                }}
              >
                {card.features?.map((f: any, fi: number) => (
                  <li
                    key={fi}
                    style={{
                      margin: "14px 0",
                    }}
                  >
                    {f.dynamicPricing ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveSlider(
                              activeSlider?.cardIndex === i &&
                                activeSlider?.featureIndex === fi
                                ? null
                                : { cardIndex: i, featureIndex: fi },
                            )
                          }
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background:
                              activeSlider?.cardIndex === i &&
                              activeSlider?.featureIndex === fi
                                ? "#DBEAFE"
                                : "transparent",
                            border:
                              activeSlider?.cardIndex === i &&
                              activeSlider?.featureIndex === fi
                                ? "2px solid #3B82F6"
                                : "2px solid transparent",
                            borderRadius: "6px",
                            padding: "7px 0",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            fontSize: "clamp(0.95em, 2vw, 1.02em)",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            minHeight: "40px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            style={{
                              color: secondaryColor || "#10B981",
                              fontSize: "clamp(1.2em, 2.5vw, 1.4em)",
                              fontWeight: "bold",
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              fontSize: "clamp(0.95em, 2vw, 1.02em)",
                              lineHeight: "1.5",
                              color: primaryColor,
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {f.text}
                          </span>
                          {sliderValues[`${i}-${fi}`] && (
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "#2563EB",
                                fontSize: "11px",
                                flexShrink: 0,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {sliderValues[`${i}-${fi}`]}
                              {f.unitLabel && ` ${f.unitLabel}`}
                            </span>
                          )}
                        </button>

                        {activeSlider?.cardIndex === i &&
                          activeSlider?.featureIndex === fi && (
                            <div
                              style={{
                                marginTop: "8px",
                                marginLeft: "8px",
                                marginRight: "8px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "14px",
                                  backgroundColor: "#F3F4F6",
                                  borderRadius: "8px",
                                }}
                              >
                                <label
                                  style={{
                                    display: "block",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#374151",
                                    marginBottom: "8px",
                                  }}
                                >
                                  {f.text}
                                  {f.unitLabel && (
                                    <span
                                      style={{
                                        color: "#6B7280",
                                        fontWeight: 400,
                                      }}
                                    >
                                      {" "}
                                      ({f.unitLabel})
                                    </span>
                                  )}
                                </label>
                                <input
                                  type="range"
                                  min={f.minValue || 1}
                                  max={f.maxValue || 10}
                                  step={f.stepValue || 1}
                                  value={
                                    sliderValues[`${i}-${fi}`] ||
                                    f.defaultValue ||
                                    1
                                  }
                                  onChange={(e) =>
                                    handleSliderChange(
                                      i,
                                      fi,
                                      parseFloat(e.target.value),
                                    )
                                  }
                                  style={{
                                    width: "100%",
                                    height: "6px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    accentColor: "#3B82F6",
                                  }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "11px",
                                    color: "#6B7280",
                                    marginTop: "4px",
                                  }}
                                >
                                  <span>{f.minValue || 1}</span>
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#3B82F6",
                                    }}
                                  >
                                    {sliderValues[`${i}-${fi}`] ||
                                      f.defaultValue ||
                                      1}
                                    {f.unitLabel && ` ${f.unitLabel}`}
                                  </span>
                                  <span>{f.maxValue || 10}</span>
                                </div>
                                {f.pricingType === "fixed" ? (
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      color: "#6B7280",
                                      marginTop: "6px",
                                      marginBottom: 0,
                                    }}
                                  >
                                    ${f.pricePerUnit || 0} per{" "}
                                    {f.unitLabel || "unit"}
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      fontSize: "10px",
                                      color: "#6B7280",
                                      marginTop: "6px",
                                      marginBottom: 0,
                                    }}
                                  >
                                    {f.pricePerUnit || 0}% per{" "}
                                    {f.unitLabel || "unit"}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          minHeight: "40px",
                        }}
                      >
                        <span
                          style={{
                            color: secondaryColor || "#10B981",
                            fontSize: "clamp(1.2em, 2.5vw, 1.4em)",
                            fontWeight: "bold",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontSize: "clamp(0.95em, 2vw, 1.02em)",
                            lineHeight: "1.5",
                            color: primaryColor,
                          }}
                        >
                          {f.text}
                        </span>
                        {f.hint && (
                          <span
                            title={f.hint}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "1.5px solid #6B7280",
                              color: "#6B7280",
                              fontSize: "12px",
                              fontWeight: "bold",
                              cursor: "help",
                              marginLeft: "6px",
                              flexShrink: 0,
                            }}
                          >
                            ?
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                {data.payment_gateway === "stripe" ? (
                  <button
                    onClick={() => {
                      setSelectedPlan(card);
                      setShowPaymentFlow(true);
                    }}
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      padding:
                        "clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(0.95em, 2.2vw, 1.1em)",
                    }}
                  >
                    {card.buttonText || "Book now"}
                  </button>
                ) : card.buttonLink ? (
                  <a
                    href={card.buttonLink}
                    target={card.buttonLinkTarget || "_self"}
                    rel={
                      card.buttonLinkTarget === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      padding:
                        "clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(0.95em, 2.2vw, 1.1em)",
                    }}
                  >
                    {card.buttonText || "Book now"}
                  </a>
                ) : (
                  <button
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      padding:
                        "clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(0.95em, 2.2vw, 1.1em)",
                    }}
                  >
                    {card.buttonText || "Book now"}
                  </button>
                )}

                {card.buttonCaption && (
                  <p
                    style={{
                      margin: "12px 0 0 0",
                      opacity: 0.7,
                      fontSize: "clamp(0.8em, 1.8vw, 0.9em)",
                      color: "#1F2937",
                    }}
                  >
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
