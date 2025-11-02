# Stripe Integration Setup Guide

## 📋 Prerequisites
- Stripe Account (create at https://stripe.com)
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. Use **Test mode** keys for development

### 2. Create Products & Prices in Stripe
1. Go to [Stripe Products](https://dashboard.stripe.com/test/products)
2. Click "Add Product"
3. Create two products:

#### Starter Plan
- **Name**: Starter Plan
- **Description**: Perfect for small teams and startups
- **Pricing**: $29/month (recurring)
- After creating, copy the **Price ID** (starts with `price_`)

#### Professional Plan
- **Name**: Professional Plan  
- **Description**: Best for growing businesses
- **Pricing**: $99/month (recurring)
- After creating, copy the **Price ID** (starts with `price_`)

### 3. Update Environment Variables

Edit `.env.local` file:

```env
# Replace with your actual Stripe keys
STRIPE_SECRET_KEY= sk_test_51NdBQICxxJUWv23VePLyDcE3edOf90u7OPjda7dC96mTQU5nhwjMdJcyTEP1GvhGeC5JTzo2rmmm4MDhTorqthi000XxfzbS9G
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51NdBQICxxJUWv23Vn91u1avmSwvGPbP6bST04iwpMRZwB6YV9phwegKfykbvdfmZQxD2x1ZEegbn0rongXPPZuDG000Jmrmnlx

# Update for production deployment
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Update Price IDs in Code

Edit `components/Pricing.jsx` and replace the Price IDs:

```javascript
const pricingPlans = [
  {
    // ...
    priceId: "price_xxxxxxxxxxxxx", // Your Starter Plan Price ID
  },
  {
    // ...
    priceId: "price_xxxxxxxxxxxxx", // Your Professional Plan Price ID
  },
];
```

### 5. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the pricing section
3. Click "Get Started" on any plan
4. You should be redirected to Stripe Checkout
5. Use Stripe test card: `4242 4242 4242 4242`
   - Use any future date for expiry
   - Use any 3 digits for CVC
   - Use any valid ZIP code

### 6. Webhook Setup (Optional but Recommended)

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 🚀 Production Deployment

1. Switch to live mode keys in Stripe Dashboard
2. Update `.env.local` with live keys
3. Update `NEXT_PUBLIC_BASE_URL` to your production URL
4. Deploy to your hosting platform
5. Test with real payment methods

## 📝 Important Notes

- Never commit `.env.local` to version control
- Always use test mode during development
- Keep your secret keys secure
- Test all payment flows before going live

## � Email Notifications Setup

When a customer completes payment, they will receive an email automatically. Here's how it works:

### Automatic Stripe Receipts (Built-in)
Stripe automatically sends receipt emails to customers after successful payments. This is enabled by default.

### Custom Confirmation Emails (Advanced)
For custom branded emails, you need to:

1. **Setup Webhook in Stripe Dashboard:**
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhook`
   - Events to listen: `checkout.session.completed`
   - Copy the webhook signing secret
   - Add to `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

2. **Test Webhook Locally (Development):**
   ```bash
   # Install Stripe CLI
   stripe login
   
   # Forward webhooks to local server
   stripe listen --forward-to localhost:3000/api/webhook
   
   # This will give you a webhook secret starting with whsec_
   # Copy this to your .env.local
   ```

3. **Integrate Email Service (Optional):**
   
   The webhook is ready but needs an email service. Choose one:
   
   **Option A: SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```
   Update webhook route with SendGrid API key.
   
   **Option B: Resend (Recommended)**
   ```bash
   npm install resend
   ```
   Add to `.env.local`: `RESEND_API_KEY=your_key`
   
   **Option C: Nodemailer (SMTP)**
   ```bash
   npm install nodemailer
   ```
   Configure SMTP settings in webhook.

### What Customers See:
1. **Email Modal** - Before payment, customer enters email
2. **Stripe Checkout** - Email is pre-filled in Stripe form
3. **Stripe Receipt** - Automatic receipt after payment (always works)
4. **Custom Email** - Your branded confirmation (needs webhook setup)

## �🔒 Security

- Secret keys are only used on the server-side (API routes)
- Publishable keys are safe to use in client-side code
- All payment processing happens on Stripe's secure servers
- No credit card data is ever stored in your application
- Webhook signatures are verified for security

## 🆘 Troubleshooting

### "Module not found: Can't resolve 'stripe'"
- Run: `npm install stripe`
- Restart the development server

### "Invalid API Key"
- Check that your keys are correctly copied
- Ensure no extra spaces in `.env.local`
- Verify you're using the correct mode (test/live)

### Checkout Session Not Creating
- Check server console for errors
- Verify Price IDs are correct
- Ensure `.env.local` is loaded

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
