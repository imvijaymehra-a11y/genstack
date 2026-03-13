# Payment Integration Guide: PayPal & Razorpay

This guide provides step-by-step instructions for integrating PayPal and Razorpay payment gateways into your GenStacker application.

## 🚀 Quick Setup Overview

### 1. PayPal Integration
- Create PayPal Developer Account
- Get API Credentials
- Install PayPal SDK
- Implement payment flow

### 2. Razorpay Integration  
- Create Razorpay Account
- Get API Keys
- Install Razorpay SDK
- Implement payment flow

---

## 💳 PayPal Integration

### Step 1: Create PayPal Developer Account

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Sign up or log in with your PayPal account
3. Navigate to "Apps & Credentials"
4. Create a new app:
   - App name: "GenStacker Payments"
   - Sandbox mode: Enable for testing
   - Features: Select "Accept payments"

### Step 2: Get API Credentials

After creating the app, you'll receive:
- **Client ID**: Public identifier for your app
- **Client Secret**: Private key (never expose in frontend)
- **Sandbox credentials** for testing
- **Live credentials** for production

### Step 3: Install PayPal SDK

```bash
npm install @paypal/react-paypal-js
# or
yarn add @paypal/react-paypal-js
```

### Step 4: Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_PAYPAL_ENVIRONMENT=sandbox # Change to 'live' for production
```

### Step 5: PayPal Component Implementation

Create `src/components/PayPalButton.tsx`:

```tsx
'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export default function PayPalButton({ amount, onSuccess, onError }: PayPalButtonProps) {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        disabled={isPaid}
        forceReRender={[amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            setIsPaid(true);
            onSuccess(details);
          });
        }}
        onError={(error) => {
          onError(error);
        }}
      />
    </PayPalScriptProvider>
  );
}
```

### Step 6: Payment API Route

Create `src/app/api/paypal/capture-order/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const orderID = await request.json();
    
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const orderData = await response.json();
    
    return NextResponse.json(orderData);
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    }
  );

  const data = await response.json();
  return data.access_token;
}
```

---

## 🇮🇳 Razorpay Integration

### Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in
3. Complete KYC verification (required for live payments)
4. Navigate to Settings → API Keys
5. Generate API Keys:
   - **Test Mode** for development
   - **Live Mode** for production

### Step 2: Get API Keys

You'll receive:
- **Key ID**: Public identifier
- **Key Secret**: Private key (never expose in frontend)

### Step 3: Install Razorpay SDK

```bash
npm install razorpay
# or
yarn add razorpay
```

### Step 4: Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_ENVIRONMENT=test # Change to 'live' for production
```

### Step 5: Razorpay Component Implementation

Create `src/components/RazorpayButton.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { RazorpayOptions } from 'razorpay';

interface RazorpayButtonProps {
  amount: number; // in rupees
  currency?: string;
  name: string;
  description: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

export default function RazorpayButton({
  amount,
  currency = 'INR',
  name,
  description,
  onSuccess,
  onError,
}: RazorpayButtonProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openRazorpay = () => {
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: amount * 100, // Convert to paise
      currency,
      name,
      description,
      image: '/your-logo.png', // Add your logo
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'GenStacker Office',
      },
      theme: {
        color: '#6366f1', // Indigo color matching your theme
      },
      modal: {
        ondismiss: function () {
          onError(new Error('Payment cancelled by user'));
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={openRazorpay}
      className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
    >
      Pay with Razorpay
    </button>
  );
}
```

### Step 6: Payment Verification API

Create `src/app/api/razorpay/verify-payment/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified, update user's subscription in database
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
```

---

## 🎯 Usage Example

### Pricing Page Integration

Create `src/app/pricing/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import PayPalButton from '@/components/PayPalButton';
import RazorpayButton from '@/components/RazorpayButton';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'razorpay'>('paypal');

  const plans = {
    basic: { name: 'Basic', price: 9.99, features: ['10 AI generations/day'] },
    pro: { name: 'Pro', price: 19.99, features: ['100 AI generations/day', 'Priority support'] },
    enterprise: { name: 'Enterprise', price: 49.99, features: ['Unlimited generations', 'Custom models'] },
  };

  const handlePaymentSuccess = async (details: any) => {
    // Update user's subscription in your database
    console.log('Payment successful:', details);
    // Redirect to success page or dashboard
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    // Show error message to user
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`p-8 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPlan === key
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">${plan.price}/month</p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                PayPal
              </button>
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                Razorpay
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Complete Payment for {plans[selectedPlan as keyof typeof plans].name}
            </h3>
            <p className="text-2xl font-bold mb-6">
              ${plans[selectedPlan as keyof typeof plans].price}/month
            </p>
            
            {paymentMethod === 'paypal' ? (
              <PayPalButton
                amount={plans[selectedPlan as keyof typeof plans].price.toString()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            ) : (
              <RazorpayButton
                amount={plans[selectedPlan as keyof typeof plans].price * 83} // Convert USD to INR (approximate)
                name="GenStacker Pro"
                description={`${plans[selectedPlan as keyof typeof plans].name} Plan`}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 Advanced Configuration

### Webhooks Setup

#### PayPal Webhooks
1. Go to PayPal Developer Dashboard
2. Select your app → Webhooks
3. Add webhook URL: `https://yourdomain.com/api/paypal/webhook`
4. Subscribe to events: `PAYMENT.CAPTURE.COMPLETED`

#### Razorpay Webhooks
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/razorpay/webhook`
3. Select events: `payment.captured`, `order.paid`

### Database Schema

```sql
-- User subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL, -- active, cancelled, expired
  payment_provider VARCHAR(20) NOT NULL, -- paypal, razorpay
  provider_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment transactions table
CREATE TABLE payment_transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  subscription_id INTEGER REFERENCES subscriptions(id),
  payment_provider VARCHAR(20) NOT NULL,
  provider_transaction_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) NOT NULL, -- pending, completed, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Production Checklist

### Before Going Live

1. **Switch to Live Credentials**
   - Update PayPal to live mode
   - Update Razorpay to live keys
   - Update environment variables

2. **Security**
   - Never expose secret keys in frontend
   - Use HTTPS for all payment endpoints
   - Implement proper webhook verification

3. **Testing**
   - Test with small amounts first
   - Verify webhook endpoints are working
   - Test refund flow

4. **Compliance**
   - Add privacy policy and terms of service
   - Display payment provider logos appropriately
   - Include refund policy

### Error Handling

```typescript
// Example error handling utility
export class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider: 'paypal' | 'razorpay'
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

// Usage in payment components
const handlePaymentError = (error: any) => {
  if (error instanceof PaymentError) {
    // Handle specific payment errors
    switch (error.code) {
      case 'PAYMENT_DECLINED':
        showMessage('Payment was declined. Please try another card.');
        break;
      case 'INSUFFICIENT_FUNDS':
        showMessage('Insufficient funds. Please use a different payment method.');
        break;
      default:
        showMessage('Payment failed. Please try again.');
    }
  } else {
    showMessage('An unexpected error occurred. Please try again.');
  }
};
```

---

## 📞 Support & Resources

### PayPal Resources
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal React SDK](https://github.com/paypal/react-paypal-js)
- [PayPal API Reference](https://developer.paypal.com/docs/api/)

### Razorpay Resources
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Webhook Guide](https://razorpay.com/docs/webhooks/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)

### Common Issues & Solutions

1. **CORS Errors**: Ensure your domain is whitelisted in payment provider settings
2. **Webhook Failures**: Check if your server is accessible from the internet
3. **Currency Issues**: Ensure you're using supported currencies for each provider
4. **Amount Validation**: PayPal uses decimals, Razorpay uses integers (paise)

This guide should help you successfully integrate both PayPal and Razorpay into your GenStacker application. Happy coding! 🚀
