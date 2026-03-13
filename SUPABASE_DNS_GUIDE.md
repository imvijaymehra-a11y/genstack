# Adding DNS Records in Supabase for Custom Email Domain

## 🎯 Goal
Configure Supabase to send emails from `@genstacker.com` by adding DNS records directly in Supabase dashboard.

## 📋 Prerequisites
- Supabase project dashboard access
- Custom domain: `genstacker.com`
- Access to domain registrar (optional, but recommended for verification)

## 🔧 Step-by-Step Setup

### Method 1: Using Supabase Dashboard (Recommended)

#### Step 1: Go to Authentication Settings
1. Open your Supabase project dashboard
2. Navigate to **Authentication** in the left sidebar
3. Click on **Settings** tab

#### Step 2: Configure Custom SMTP
1. Scroll down to **Email Templates** section
2. Look for **Site URL** and **SMTP Settings**
3. Click on **Custom SMTP** or **Email Settings**

#### Step 3: Add DNS Records
1. In the email settings, look for **Domain Verification** or **DNS Configuration**
2. You'll see DNS records that need to be added:
   - **DKIM** record
   - **SPF** record  
   - **DMARC** record (optional but recommended)

#### Step 4: Add Records to Your Domain Registrar
Go to your domain registrar (where you bought genstacker.com) and add these records:

**DKIM Record:**
```
Type: CNAME
Name: k1._domainkey
Value: k1.dkim.supabase.co
TTL: 3600 (or 1 Hour)
```

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
TTL: 3600 (or 1 Hour)
```

**DMARC Record (Recommended):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@genstacker.com
TTL: 3600 (or 1 Hour)
```

### Method 2: Using Supabase CLI (Advanced)

If you prefer using CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to your project
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Add custom domain
supabase domains add genstacker.com
```

## 🔍 Verification Steps

### Step 1: Verify DNS Propagation
After adding DNS records, wait for propagation:

```bash
# Check DKIM record
dig CNAME k1._domainkey.genstacker.com

# Check SPF record  
dig TXT genstacker.com

# Check DMARC record
dig TXT _dmarc.genstacker.com
```

### Step 2: Verify in Supabase
1. Go back to Supabase dashboard
2. In email settings, click **Verify Domain**
3. Supabase will check the DNS records
4. Wait for verification status (can take 5-30 minutes)

## 📧 Configure Email Templates

Once domain is verified, customize your emails:

### 1. Basic Settings
```
Site URL: https://www.genstacker.com
From Email: noreply@genstacker.com
From Name: GenStacker
Reply-to Email: support@genstacker.com
```

### 2. Customize Email Templates

#### Confirmation Email
- Subject: "Verify your GenStacker account"
- Body: Include your branding and verification link

#### Reset Password Email  
- Subject: "Reset your GenStacker password"
- Body: Include your branding and reset link

#### Welcome Email
- Subject: "Welcome to GenStacker!"
- Body: Welcome message with features overview

## 🚨 Common Issues & Solutions

### Issue: DNS records not propagating
**Solution:**
- Wait 24-48 hours for full DNS propagation
- Use online DNS checker tools to verify
- Check for typos in DNS records

### Issue: Domain verification fails
**Solution:**
- Double-check DNS record values
- Ensure no trailing spaces or extra characters
- Verify TTL settings (use 3600 minimum)

### Issue: Emails still come from Supabase domain
**Solution:**
- Ensure domain is verified in Supabase dashboard
- Check if custom SMTP is enabled
- Verify sender email is set to your domain

### Issue: Emails going to spam
**Solution:**
- Ensure SPF, DKIM records are correct
- Add DMARC record if not present
- Check email content for spam triggers

## 📊 Alternative: Use Resend (Easier Setup)

If DNS setup is complex, use Resend:

### 1. Sign up for Resend
1. Go to [resend.com](https://resend.com)
2. Create account
3. Add your domain: `genstacker.com`

### 2. Configure DNS with Resend
Resend will provide specific DNS records for your domain.

### 3. Connect Supabase to Resend
In Supabase dashboard, use these SMTP settings:
```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend@genstacker.com
SMTP Password: [your-resend-api-key]
Sender Name: GenStacker
Sender Email: noreply@genstacker.com
```

## ✅ Testing Your Setup

### 1. Test Email Delivery
1. Create a test account on your website
2. Check if verification email arrives
3. Verify sender is `noreply@genstacker.com`
4. Check spam folder if not in inbox

### 2. Test All Email Types
- Sign up verification
- Password reset
- Account notifications

## 🔍 Troubleshooting Commands

### Check DNS Status
```bash
# Check all DNS records for domain
dig any genstacker.com

# Check specific record types
nslookup -type=TXT genstacker.com
nslookup -type=CNAME k1._domainkey.genstacker.com
```

### Check Email Headers
When you receive test email, check headers:
```
Authentication-Results: spf=pass dkim=pass dmarc=pass
From: noreply@genstacker.com
Return-Path: <>
```

## ✅ Success Checklist

- [ ] DNS records added to domain registrar
- [ ] DNS propagation completed (wait 24-48 hours)
- [ ] Domain verified in Supabase dashboard
- [ ] Custom SMTP enabled in Supabase
- [ ] Email templates customized
- [ ] Test email sent and received successfully
- [ ] Sender shows as `@genstacker.com`
- [ ] Emails not going to spam folder

## 📞 Support Resources

- **Supabase Documentation**: https://supabase.com/docs/guides/auth
- **DNS Checker**: https://www.whatsmydns.net/
- **Email Tester**: https://www.mail-tester.com/
- **DMARC Inspector**: https://dmarcian.com/

---

**After completing these steps, all emails from your GenStacker application will come from your custom domain, improving deliverability and brand recognition.**
