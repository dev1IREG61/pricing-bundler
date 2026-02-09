import React, { useState, useEffect } from 'react';
import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
import { PricingCardPreview } from './previews/PricingCardPreview';
import { StripeProvider } from './StripeProvider';

const Widget: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actualWidgetId, setActualWidgetId] = useState<string>('');

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
        
        // Store the actual widget ID from the response
        setActualWidgetId(result.data.id);

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
    <StripeProvider>
      <div style={{ background: isEmbedMode() ? 'transparent' : 'white' }}>
        {content.type === "pricing_columns" ? (
          <PricingCardPreview data={content.data} appearance={content.appearance} widgetId={actualWidgetId} />
        ) : content.type === "comparison_table" ? (
          <ComparisonTablePreview data={content.data} appearance={content.appearance} widgetId={actualWidgetId} />
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
    </StripeProvider>
  );
};

export default Widget;