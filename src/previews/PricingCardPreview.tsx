import React, { useState } from 'react';
import { PaymentFlow } from '../PaymentFlow';

interface PricingCardPreviewProps {
  data: any;
  appearance: any;
  widgetId?: string;
}

const pricingStyles = `
  .pc-wrap {
    container-type: inline-size;
    container-name: pcgrid;
  }
  .pc-grid {
    display: grid;
    gap: 32px;
    width: 100%;
  }
  .pc-grid[data-count="1"] { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
  .pc-grid[data-count="2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 860px; margin: 0 auto; }
  .pc-grid[data-count="3"],
  .pc-grid[data-count="4"],
  .pc-grid[data-count="5"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .pricing-card:hover .pricing-card-media {
    transform: scale(1.05);
  }

  @container pcgrid (max-width: 640px) {
    .pc-grid[data-count="2"] { grid-template-columns: 1fr !important; max-width: 420px; }
  }
  @container pcgrid (max-width: 860px) {
    .pc-grid[data-count="3"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pc-grid[data-count="4"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pc-grid[data-count="5"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @container pcgrid (max-width: 560px) {
    .pc-grid[data-count="3"] { grid-template-columns: 1fr !important; max-width: 420px; }
    .pc-grid[data-count="4"] { grid-template-columns: 1fr !important; max-width: 420px; }
    .pc-grid[data-count="5"] { grid-template-columns: 1fr !important; max-width: 420px; }
  }
`;

export const PricingCardPreview: React.FC<PricingCardPreviewProps> = ({ data, appearance, widgetId }) => {
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeTableId, setActiveTableId] = useState<string>(
    data.multiTableMode && data.tables?.length > 0 ? data.tables[0].id : ''
  );

  const isMultiTable = data.multiTableMode && data.tables && data.tables.length > 0;
  const tables = isMultiTable ? data.tables : [{ cards: data.cards || [], name: '', caption: '', showWidgetTitle: false }];

  const primaryColor = appearance.primaryColor || '#1F2937';
  const secondaryColor = appearance.secondaryColor || '#F3F4F6';
  const buttonBgColor = appearance.buttonColor || primaryColor;
  const fontFamily = appearance.font && appearance.font !== 'system-ui'
    ? `"${appearance.font}", sans-serif`
    : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

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
    fontFamily,
    boxShadow: appearance.buttonType === 'filled' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
  };

  const activeCards = isMultiTable
    ? tables.find(t => t.id === activeTableId)?.cards || []
    : tables[0]?.cards || [];

  const activeTable = tables.find(t => t.id === activeTableId) || tables[0];

  if (showPaymentFlow && selectedPlan) {
    return (
      <PaymentFlow
        widgetId={widgetId || ''}
        planId={selectedPlan.planId}
        interval={data.interval}
        paymentType={data.paymentType || 'one_time'}
        collectTaxDocuments={appearance.collectTaxDocuments}
        widgetBackgroundColor={appearance.widgetBackgroundColor}
        onBack={() => {
          setShowPaymentFlow(false);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <>
      <style>{pricingStyles}</style>
      <div
        translate={appearance.enableBrowserTranslator ? 'yes' : 'no'}
        style={{
          fontFamily,
          fontWeight: appearance.fontWeight || '400',
          fontSize: `${appearance.fontSize || 16}px`,
          lineHeight: '1.6',
          color: '#1F2937',
          width: '100%',
          margin: '0 auto',
          padding: '20px',
          boxSizing: 'border-box',
          direction: appearance.isRTL ? 'rtl' : 'ltr',
          position: 'relative',
          backgroundColor: appearance.widgetBackgroundColor || 'transparent',
        }}
      >
        {/* Translate Button */}
        {appearance.enableBrowserTranslator && (
          <div
            id="google_translate_element"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 1000,
            }}
          >
            <button
              onClick={() => {
                const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (translateElement) {
                  translateElement.dispatchEvent(new Event('click'));
                } else {
                  if (!(window as any).googleTranslateElementInit) {
                    (window as any).googleTranslateElementInit = function() {
                      new (window as any).google.translate.TranslateElement(
                        {pageLanguage: 'en'},
                        'google_translate_element'
                      );
                    };
                    const script = document.createElement('script');
                    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                    document.head.appendChild(script);
                  }
                }
              }}
              title="Translate this page"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4285f4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                border: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </button>
          </div>
        )}
        <style>{`
          @media (max-width: 640px) {
            #google_translate_element {
              top: 10px !important;
              right: 10px !important;
            }
            #google_translate_element button {
              width: 40px !important;
              height: 40px !important;
            }
            #google_translate_element .skiptranslate {
              max-width: calc(100vw - 80px) !important;
            }
          }
        `}</style>
        {/* Global Widget Title */}
        {(data.showWidgetTitle && !isMultiTable) && (
          <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 16px' }}>
            <h2 style={{
              fontSize: 'clamp(1.8em, 5vw, 2.8em)',
              fontWeight: '800',
              margin: '0 0 12px 0',
              color: data.widgetTitleColor || primaryColor
            }}>
              {data.widgetTitle || 'Choose Your Plan'}
            </h2>
            {data.widgetTitleCaption && (
              <p style={{
                fontSize: 'clamp(1em, 3vw, 1.3em)',
                opacity: 0.8,
                color: data.widgetCaptionColor || '#6B7280'
              }}>
                {data.widgetTitleCaption}
              </p>
            )}
          </div>
        )}

        {/* Tabs for Multi-Table Mode */}
        {isMultiTable && tables.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px',
            padding: '0 16px'
          }}>
            {tables.map((table: any) => (
              <button
                key={table.id}
                onClick={() => setActiveTableId(table.id)}
                style={{
                  padding: '10px 20px',
                  fontSize: 'clamp(0.85em, 2.5vw, 1em)',
                  fontWeight: activeTableId === table.id ? '700' : '500',
                  backgroundColor: activeTableId === table.id ? "#1275f8" : 'transparent',
                  color: activeTableId === table.id ? '#ffffff' : primaryColor,
                  border: `2px solid #d6d6d6`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '80px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (activeTableId !== table.id) {
                    e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTableId !== table.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {table.name}
                {table.caption && (
                  <span style={{
                    display: 'block',
                    fontSize: '0.8em',
                    opacity: 0.9,
                    marginTop: '4px',
                    fontWeight: 'normal'
                  }}>
                    {table.caption}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Table Title & Caption (per table) */}
        {isMultiTable && activeTable?.showWidgetTitle && (
          <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 16px' }}>
            <h2 style={{
              fontSize: 'clamp(1.5em, 4vw, 1.8em)',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: activeTable.widgetTitleColor || primaryColor
            }}>
              {activeTable.widgetTitle || activeTable.name}
            </h2>
            {activeTable.widgetTitleCaption && (
              <p style={{
                fontSize: 'clamp(1em, 2.5vw, 1.2em)',
                opacity: 0.85,
                color: activeTable.widgetCaptionColor || '#6B7280'
              }}>
                {activeTable.widgetTitleCaption}
              </p>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className="pc-wrap" style={{ boxSizing: 'border-box' }}>
          <div
            className="pc-grid"
            data-count={String(Math.min(activeCards.length, 5))}
          >
            {activeCards.map((card: any, i: number) => (
              <div
                key={i}
                className="pricing-card"
                style={{
                  backgroundColor: secondaryColor,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  // border: '1px solid #e5e7eb',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* RIBBON/BADGE */}
                {card.ribbonEnabled && card.ribbonText && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '150px', height: '150px', overflow: 'hidden', zIndex: 10
                  }}>
                    <div style={{
                      position: 'absolute',
                      transform: 'rotate(45deg)',
                      backgroundColor: appearance.ribbonColor || '#EF4444',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      width: '200px',
                      padding: '8px 0',
                      top: `${20 + Math.floor(card.ribbonText.length / 3)}px`,
                      right: '-60px',
                      fontSize: 'clamp(0.7em, 1.8vw, 0.85em)',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                      {card.ribbonText}
                    </div>
                  </div>
                )}

                {/* Media */}
                {(() => {
                  const media = card.media || (card.imageUrl ? { type: "image", url: card.imageUrl } : null);
                  
                  if (!media || !media.url) {
                    return null;
                  }

                  return (
                    <div className="pricing-card-media" style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#000', transition: 'transform 0.4s ease' }}>
                      {media.type === "youtube" ? (
                        <iframe
                          src={`${media.url}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${media.youtubeId}`}
                          style={{ width: '100%', height: '100%', border: 0, pointerEvents: 'none', transition: 'transform 0.4s ease' }}
                          allow="autoplay; encrypted-media"
                        />
                      ) : media.type === "video" ? (
                        <video src={media.url} poster={media.poster} autoPlay loop muted playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                      ) : (
                        <img src={media.url} alt={card.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        />
                      )}
                    </div>
                  );
                })()}

                {/* Content */}
                <div style={{
                  padding: 'clamp(20px, 4vw, 32px)',
                  textAlign: 'center',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(1.4em, 3.5vw, 1.8em)',
                    margin: '0 0 8px 0',
                    fontWeight: '700',
                    color: '#1F2937'
                  }}>
                    {card.title}
                  </h3>

                  {card.titleCaption && (
                    <p style={{
                      opacity: 0.7, margin: '0 0 16px 0',
                      fontSize: 'clamp(0.85em, 2vw, 0.95em)', color: '#1F2937'
                    }}>
                      {card.titleCaption}
                    </p>
                  )}

                  {card.oldPriceEnabled && (card.oldPrice || card.discountLabel) && (
                    <div style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      marginBottom: '12px', minHeight: '28px', position: 'relative',
                      width: '100%', flexWrap: 'wrap', gap: '8px',
                    }}>
                      {card.oldPrice && (
                        <div style={{
                          color: primaryColor || '#94a3b8',
                          fontSize: 'clamp(1.2em, 3vw, 1.5em)',
                          textDecoration: 'line-through', opacity: 0.8,
                        }}>
                          {(() => {
                            const currencySymbols: Record<string, string> = {
                              usd: '$', eur: '€', gbp: '£', jpy: '¥', cad: '$', aud: '$', chf: 'Fr', cny: '¥',
                              inr: '₹', krw: '₩', brl: 'R$', rub: '₽', mxn: '$', zar: 'R', sgd: '$', hkd: '$',
                              nok: 'kr', sek: 'kr', dkk: 'kr', pln: 'zł', thb: '฿', idr: 'Rp', myr: 'RM',
                              php: '₱', try: '₺', aed: 'د.إ', sar: '﷼', ils: '₪', nzd: '$', twd: 'NT$'
                            };
                            const currency = data.globalCurrency || card.currency || 'usd';
                            const symbol = currencySymbols[currency.toLowerCase()] || '$';
                            const priceNum = card.oldPrice?.replace(/[^0-9.]/g, '') || '';
                            return `${symbol}${priceNum}`;
                          })()}
                        </div>
                      )}
                      {card.discountLabel && (
                        <div style={{
                          backgroundColor: card.discountLabelColor || '#EF4444',
                          color: card.discountLabelTextColor || '#FFFFFF',
                          padding: '6px 12px', borderRadius: '50px',
                          fontSize: 'clamp(0.8em, 2vw, 0.9em)', fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
                          position: 'absolute', right: '8px',
                        }}>
                          {card.discountLabel}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ margin: '10px 0' }}>
                    <span style={{
                      fontSize: 'clamp(2.2em, 6vw, 3.2em)', fontWeight: '800', color: card.priceColor,
                    }}>
                      {(() => {
                        const currencySymbols: Record<string, string> = {
                          usd: '$', eur: '€', gbp: '£', jpy: '¥', cad: '$', aud: '$', chf: 'Fr', cny: '¥',
                          inr: '₹', krw: '₩', brl: 'R$', rub: '₽', mxn: '$', zar: 'R', sgd: '$', hkd: '$',
                          nok: 'kr', sek: 'kr', dkk: 'kr', pln: 'zł', thb: '฿', idr: 'Rp', myr: 'RM',
                          php: '₱', try: '₺', aed: 'د.إ', sar: '﷼', ils: '₪', nzd: '$', twd: 'NT$'
                        };
                        const currency = data.globalCurrency || card.currency || 'usd';
                        const symbol = currencySymbols[currency.toLowerCase()] || '$';
                        const priceNum = card.price?.replace(/[^0-9.]/g, '') || '';
                        return `${symbol}${priceNum}`;
                      })()}
                    </span>
                    <span style={{
                      fontSize: 'clamp(1em, 2.5vw, 1.3em)', opacity: 0.7, marginLeft: '4px', color: card.priceColor,
                    }}>
                      {card.period}
                    </span>
                  </div>

                  {card.priceCaption && (
                    <p style={{
                      opacity: 0.7, margin: '3px 0 16px',
                      fontSize: 'clamp(0.85em, 2vw, 0.95em)', color: primaryColor || '#1F2937'
                    }}>
                      {card.priceCaption}
                    </p>
                  )}

                  {card.description && (
                    <p style={{
                      margin: '2px 0', fontSize: 'clamp(1em, 2.2vw, 1.1em)',
                      fontWeight: '500', opacity: 0.9, color: primaryColor
                    }}>
                      {card.description}
                    </p>
                  )}

                  <ul style={{
                    textAlign: 'left', margin: '10px 0',
                    paddingLeft: 'clamp(16px, 3vw, 24px)',
                    flexGrow: 1
                  }}>
                    {card.features?.map((f: any, fi: number) => (
                      <li key={fi} style={{
                        margin: '14px 0', display: 'flex', alignItems: 'center',
                        gap: '12px', minHeight: '40px'
                      }}>
                        <span style={{
                          color: primaryColor,
                          fontSize: 'clamp(1.2em, 2.5vw, 1.4em)',
                          flexShrink: 0
                        }}>{f.icon || '✓'}</span>
                        <span style={{
                          fontSize: 'clamp(0.95em, 2vw, 1.02em)',
                          lineHeight: '1.5', color: primaryColor
                        }}>
                          {f.text}
                        </span>
                        {f.hint && (
                          <span title={f.hint} style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '16px', height: '16px', borderRadius: '50%',
                            border: '1.5px solid #6B7280', color: '#6B7280',
                            fontSize: '12px', fontWeight: 'bold', cursor: 'help',
                            marginLeft: '6px', flexShrink: 0
                          }}>?</span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    {data.payment_gateway === "stripe" ? (
                      <button
                        onClick={() => { setSelectedPlan(card); setShowPaymentFlow(true); }}
                        style={{
                          ...buttonStyle, width: '100%',
                          padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)',
                          fontSize: 'clamp(0.95em, 2.2vw, 1.1em)'
                        }}
                      >
                        {card.buttonText || 'Book now'}
                      </button>
                    ) : card.buttonLink ? (
                      <a
                        href={card.buttonLink}
                        target={card.buttonLinkTarget || '_self'}
                        rel={card.buttonLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
                        style={{
                          ...buttonStyle, width: '100%',
                          padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)',
                          fontSize: 'clamp(0.95em, 2.2vw, 1.1em)'
                        }}
                      >
                        {card.buttonText || 'Book now'}
                      </a>
                    ) : (
                      <button style={{
                        ...buttonStyle, width: '100%',
                        padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 32px)',
                        fontSize: 'clamp(0.95em, 2.2vw, 1.1em)'
                      }}>
                        {card.buttonText || 'Book now'}
                      </button>
                    )}

                    {card.buttonCaption && (
                      <p style={{
                        margin: '12px 0 0 0', opacity: 0.7,
                        fontSize: 'clamp(0.8em, 1.8vw, 0.9em)', color: '#1F2937'
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
      </div>
    </>
  );
};