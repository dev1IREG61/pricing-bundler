import React, { useState } from 'react';
import { StripeIntegration } from './StripeIntegration';

interface PaymentFlowProps {
  widgetId: string;
  planId: string;
  interval?: string;
  paymentType: string;
  onBack: () => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  widgetId,
  planId,
  interval,
  paymentType,
  onBack
}) => {
  const [step, setStep] = useState<'methods' | 'stripe' | 'success'>('methods');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [backendPaymentType, setBackendPaymentType] = useState<'subscription' | 'payment' | 'one_time'>('subscription');

  const handlePaymentMethodSelect = async (method: string) => {
    if (method !== 'credit_card' || !email) return;
    
    setLoading(true);
    try {
      const payload: any = {
        widget_id: widgetId,
        plan_id: planId,
        customer_email: email
      };
      
      if (paymentType === 'subscription' && interval) {
        payload.interval = interval;
      }

      const response = await fetch('https://esign-admin.signmary.com/api/widgets/stripe/create-payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        setClientSecret(data.client_secret);
        setPaymentIntentId(data.payment_intent_id || data.subscription_id);
        setBackendPaymentType(data.payment_type);
        setStep('stripe');
      } else {
        alert(data.message || 'Payment creation failed');
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripeSuccess = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#10b981' }}>
          Payment Successful!
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  if (step === 'stripe') {
    return (
      <StripeIntegration 
        clientSecret={clientSecret}
        paymentType={backendPaymentType}
        onSuccess={handleStripeSuccess}
        onBack={() => setStep('methods')}
      />
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          background: 'none',
          border: 'none',
          color: '#6b7280',
          cursor: 'pointer'
        }}
      >
        ← Back to Plans
      </button>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Complete Your Purchase
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Email Address *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500' }}>
          Payment Method
        </label>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => handlePaymentMethodSelect('credit_card')}
            disabled={!email || loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              background: email ? '#fff' : '#f9fafb',
              cursor: email ? 'pointer' : 'not-allowed',
              opacity: email ? 1 : 0.6,
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '24px' }}>💳</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: '500' }}>Credit Card</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Visa, Mastercard, American Express</div>
            </div>
            {loading && <div>Loading...</div>}
          </button>

          <button
            disabled
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              background: '#f9fafb',
              cursor: 'not-allowed',
              opacity: 0.4
            }}
          >
            <div style={{ fontSize: '24px' }}>🏦</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: '500' }}>Bank Transfer</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Coming soon</div>
            </div>
          </button>

          <button
            disabled
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              background: '#f9fafb',
              cursor: 'not-allowed',
              opacity: 0.4
            }}
          >
            <div style={{ fontSize: '24px' }}>📱</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: '500' }}>Digital Wallet</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Apple Pay, Google Pay</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

