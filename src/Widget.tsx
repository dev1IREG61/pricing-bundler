import React, { useState, useEffect } from 'react';
import { ComparisonTablePreview } from './previews/ComparisonTablePreview';
import { PricingCardPreview } from './previews/PricingCardPreview';

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

    // Try mypowerly.com first, then fallback to esign-admin.signmary.com
    const apiUrls = [
      `https://mypowerly.com/v1/api/widgets/widget-data/public/${widgetId}/`,
      `https://esign-admin.signmary.com/api/widgets/widget-data/public/${widgetId}/`
    ];

    let fetchAttempt = 0;

    const tryFetch = () => {
      const apiUrl = apiUrls[fetchAttempt];
      console.log('Fetching widget from:', apiUrl);

      fetch(apiUrl)
        .then(res => {
          if (!res.ok) throw new Error("Widget not found");
          return res.json();
        })
        .then(result => {
          console.log('API Response:', result);
          
          const innerData = result.data.data;
          const appearance = innerData.appearance;
          
          setActualWidgetId(result.data.id);

          setContent({
            type: result.data.type,
            data: innerData,
            appearance: appearance
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(`Failed to load from ${apiUrl}:`, err);
          fetchAttempt++;
          if (fetchAttempt < apiUrls.length) {
            tryFetch();
          } else {
            setContent(null);
            setLoading(false);
          }
        });
    };

    tryFetch();
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
  );
};

export default Widget;