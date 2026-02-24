import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, Lock, Loader2, AlertCircle } from 'lucide-react';

interface StripeIntegrationProps {
  clientSecret: string;
  paymentType?: 'subscription' | 'payment' | 'one_time';
  stripeAccount?: string;
  collectTaxDocuments?: boolean;
  widgetBackgroundColor?: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const StripeIntegration: React.FC<StripeIntegrationProps> = ({
  clientSecret,
  paymentType = 'subscription',
  stripeAccount,
  collectTaxDocuments,
  widgetBackgroundColor,
  onSuccess,
  onBack
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [cardNumberError, setCardNumberError] = useState<string>('');
  const [cardExpiryError, setCardExpiryError] = useState<string>('');
  const [cardCvcError, setCardCvcError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const cardComplete = cardNumberComplete && cardExpiryComplete && cardCvcComplete;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !cardComplete) return;

    setProcessing(true);
    setError('');

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        setError('Card element not found');
        setProcessing(false);
        return;
      }

      // Check if client_secret is SetupIntent or PaymentIntent
      const isSetupIntent = clientSecret.startsWith('seti_');
      const isPaymentIntent = clientSecret.startsWith('pi_');

      if (isSetupIntent) {
        const options = stripeAccount ? { stripeAccount } : {};
        const { error: confirmError, setupIntent } = await stripe.confirmCardSetup(
          clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
            }
          },
          options
        );

        if (confirmError) {
          setError(confirmError.message || 'Payment setup failed. Please try again.');
        } else if (setupIntent?.status === 'succeeded') {
          onSuccess();
        } else {
          setError('Payment setup was not successful. Please try again.');
        }
      } else if (isPaymentIntent) {
        const options = stripeAccount ? { stripeAccount } : {};
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardNumberElement,
            }
          },
          options
        );

        if (confirmError) {
          setError(confirmError.message || 'Payment failed. Please try again.');
        } else if (paymentIntent?.status === 'succeeded') {
          onSuccess();
        } else {
          setError('Payment was not successful. Please try again.');
        }
      } else {
        setError('Invalid payment secret received.');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };



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
          Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock size={32} color="#ffffff" strokeWidth={2} />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            Secure Payment
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            Your payment information is encrypted and secure
          </p>
          {collectTaxDocuments && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '12px'
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
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '12px'
            }}>
              Card Number
            </label>
            <div style={{
              padding: '16px 20px',
              border: `2px solid ${cardNumberError ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '16px',
              backgroundColor: 'white',
              transition: 'border-color 0.2s'
            }}>
              <CardNumberElement
                onChange={(e) => {
                  setCardNumberComplete(e.complete);
                  setCardNumberError(e.error?.message || '');
                }}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#111827',
                      fontWeight: '500',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
            {cardNumberError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '8px',
                fontWeight: '500'
              }}>
                <AlertCircle size={14} />
                {cardNumberError}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Expiry Date
              </label>
              <div style={{
                padding: '16px 20px',
                border: `2px solid ${cardExpiryError ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '16px',
                backgroundColor: 'white',
                transition: 'border-color 0.2s'
              }}>
                <CardExpiryElement
                  onChange={(e) => {
                    setCardExpiryComplete(e.complete);
                    setCardExpiryError(e.error?.message || '');
                  }}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#111827',
                        fontWeight: '500',
                        '::placeholder': {
                          color: '#9ca3af',
                        },
                      },
                      invalid: {
                        color: '#ef4444',
                      },
                    },
                  }}
                />
              </div>
              {cardExpiryError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ef4444',
                  fontSize: '13px',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  <AlertCircle size={14} />
                  {cardExpiryError}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                CVC
              </label>
              <div style={{
                padding: '16px 20px',
                border: `2px solid ${cardCvcError ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '16px',
                backgroundColor: 'white',
                transition: 'border-color 0.2s'
              }}>
                <CardCvcElement
                  onChange={(e) => {
                    setCardCvcComplete(e.complete);
                    setCardCvcError(e.error?.message || '');
                  }}
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#111827',
                        fontWeight: '500',
                        '::placeholder': {
                          color: '#9ca3af',
                        },
                      },
                      invalid: {
                        color: '#ef4444',
                      },
                    },
                  }}
                />
              </div>
              {cardCvcError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ef4444',
                  fontSize: '13px',
                  marginTop: '8px',
                  fontWeight: '500'
                }}>
                  <AlertCircle size={14} />
                  {cardCvcError}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: '16px',
              color: '#dc2626',
              fontSize: '14px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '500'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || !cardComplete || processing}
            style={{
              width: '100%',
              padding: '18px',
              background: (!stripe || !cardComplete || processing)
                ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!stripe || !cardComplete || processing) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              boxShadow: (!stripe || !cardComplete || processing) ? 'none' : '0 4px 16px rgba(124, 58, 237, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (stripe && cardComplete && !processing) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (stripe && cardComplete && !processing) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)';
              }
            }}
          >
            {processing ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 0.6s linear infinite' }} />
                Processing...
              </>
            ) : (
              <>
                <Lock size={18} />
                Complete Payment
              </>
            )}
          </button>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Lock size={16} color="#6b7280" />
            <p style={{
              fontSize: '13px',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Your payment is secured by Stripe. We never store your card details.
            </p>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};