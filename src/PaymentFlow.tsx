import React, { useState } from 'react';
import { StripeIntegration } from './StripeIntegration';
import { StripeProvider } from './StripeProvider';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, CreditCard, Building2, Wallet } from 'lucide-react';

interface PaymentFlowProps {
  widgetId: string;
  planId: string;
  interval?: string;
  paymentType: string;
  collectTaxDocuments?: boolean;
  widgetBackgroundColor?: string;
  onBack: () => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  widgetId,
  planId,
  interval,
  paymentType,
  collectTaxDocuments,
  widgetBackgroundColor,
  onBack
}) => {
  const [step, setStep] = useState<'methods' | 'stripe' | 'success'>('methods');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [backendPaymentType, setBackendPaymentType] = useState<'subscription' | 'payment' | 'one_time'>('subscription');
  const [stripeAccount, setStripeAccount] = useState<string>();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError('');
    
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const extractErrorMessage = (errorResponse: any): string => {
    if (errorResponse.error) {
      // Extract meaningful error from Stripe error messages
      if (errorResponse.error.includes('Invalid email address')) {
        return 'Please enter a valid email address';
      }
      if (errorResponse.error.includes('customer')) {
        return 'Customer information is invalid';
      }
      if (errorResponse.error.includes('payment')) {
        return 'Payment processing failed. Please try again.';
      }
      // Return the actual error message if it's user-friendly
      const errorParts = errorResponse.error.split(': ');
      return errorParts.length > 1 ? errorParts[errorParts.length - 1] : errorResponse.error;
    }
    return errorResponse.message || 'An unexpected error occurred';
  };

  const handlePaymentMethodSelect = async (method: string) => {
    if (method !== 'credit_card' || !email) return;
    
    // Validate email before proceeding
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setEmailError('');
    
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
        setStripeAccount(data.stripe_account);
        setStep('stripe');
      } else {
        const errorMessage = extractErrorMessage(data);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripeSuccess = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '480px',
          width: '100%',
          background: '#ffffff',
          border: '1px solid #f0f0f0',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle2 size={40} color="#ffffff" strokeWidth={2.5} />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '12px',
            lineHeight: '1.3'
          }}>
            Payment Successful!
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0
          }}>
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'stripe') {
    return (
      <StripeProvider stripeAccount={stripeAccount}>
        <StripeIntegration 
          clientSecret={clientSecret}
          paymentType={backendPaymentType}
          stripeAccount={stripeAccount}
          collectTaxDocuments={collectTaxDocuments}
          widgetBackgroundColor={widgetBackgroundColor}
          onSuccess={handleStripeSuccess}
          onBack={() => setStep('methods')}
        />
      </StripeProvider>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: widgetBackgroundColor || 'linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: '#ffffff',
        border: '1px solid #f0f0f0',
        borderRadius: '24px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        padding: '48px'
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
        >
          <ArrowLeft size={20} />
          Back to Plans
        </button>

        <h2 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '32px',
          textAlign: 'center',
          lineHeight: '1.3'
        }}>
          Complete Your Purchase
        </h2>

        {collectTaxDocuments && (
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert('Tax document link will be configured by admin'); }}
              style={{
                color: '#7c3aed',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Click here to get a Copy of my W9/W8BEN
            </a>
          </p>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '12px'
          }}>
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: `2px solid ${emailError ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '16px',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              if (!emailError) e.currentTarget.style.borderColor = '#7c3aed';
            }}
            onBlur={(e) => {
              if (!emailError) e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            required
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            maxLength={254}
          />
          {emailError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px',
              color: '#ef4444',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <AlertCircle size={16} />
              {emailError}
            </div>
          )}
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Payment Method
          </label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => handlePaymentMethodSelect('credit_card')}
              disabled={!email || loading || !!emailError}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px',
                border: `2px solid ${email && !emailError ? '#e5e7eb' : '#f3f4f6'}`,
                borderRadius: '16px',
                background: email && !emailError ? '#ffffff' : '#f9fafb',
                cursor: email && !emailError ? 'pointer' : 'not-allowed',
                opacity: email && !emailError ? 1 : 0.5,
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (email && !emailError) {
                  e.currentTarget.style.borderColor = '#7c3aed';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (email && !emailError) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <CreditCard size={28} color="#ffffff" strokeWidth={2} />
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Credit Card</div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Visa, Mastercard, American Express</div>
              </div>
              {loading && <Loader2 size={20} color="#7c3aed" style={{ animation: 'spin 0.6s linear infinite' }} />}
            </button>

            <button
              disabled
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px',
                border: '2px solid #f3f4f6',
                borderRadius: '16px',
                background: '#f9fafb',
                cursor: 'not-allowed',
                opacity: 0.4,
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: '#f3f4f6',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Building2 size={28} color="#9ca3af" strokeWidth={2} />
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Bank Transfer</div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Coming soon</div>
              </div>
            </button>

            <button
              disabled
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px',
                border: '2px solid #f3f4f6',
                borderRadius: '16px',
                background: '#f9fafb',
                cursor: 'not-allowed',
                opacity: 0.4,
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: '#f3f4f6',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Wallet size={28} color="#9ca3af" strokeWidth={2} />
              </div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Digital Wallet</div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Apple Pay, Google Pay</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

