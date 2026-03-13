# Fix Custom SMTP Setup in Supabase

## 🚨 Current Issue
You're seeing "Set up custom SMTP" warning because Supabase is still using its built-in email service instead of your custom SMTP configuration.

## 🔧 Quick Fix Steps

### Step 1: Go to SMTP Settings
1. Open Supabase Dashboard
2. Navigate to **Authentication** → **Settings**
3. Scroll down to **Email Templates** section
4. Look for **Custom SMTP** or **SMTP Settings**

### Step 2: Configure Custom SMTP
You need to disable the built-in service and configure your own SMTP:

#### Option A: Use Resend (Recommended)
```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend@genstacker.com
SMTP Password: [your-resend-api-key]
Sender Name: GenStacker
Sender Email: noreply@genstacker.com
```

#### Option B: Use Your Own SMTP Provider
```
SMTP Host: smtp.your-email-provider.com
SMTP Port: 587
SMTP User: noreply@genstacker.com
SMTP Password: [your-app-password]
Sender Name: GenStacker
Sender Email: noreply@genstacker.com
```

### Step 3: Save and Test
1. Click **Save** or **Update** settings
2. Wait for Supabase to verify SMTP connection
3. Test by sending a verification email

## 📋 Required DNS Records (if using custom domain)

Before configuring SMTP, ensure these DNS records exist:

### For @genstacker.com
```
# SPF Record (Required)
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all

# DKIM Record (Required)
Type: CNAME
Name: k1._domainkey
Value: k1.dkim.supabase.co

# DMARC Record (Recommended)
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@genstacker.com
```

## 🔄 Alternative: Use Resend (Easier)

If SMTP setup is complex, use Resend:

### 1. Sign up for Resend
1. Go to [https://resend.com](https://resend.com)
2. Create account
3. Add domain: `genstacker.com`
4. Resend provides DNS records to add

### 2. Connect Supabase to Resend
In Supabase SMTP settings, use:
```
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend@genstacker.com
SMTP Password: [resend-api-key]
Encryption: STARTTLS
```

## 🔍 Troubleshooting

### Issue: Still seeing "built-in email service" warning
**Solutions:**
1. **Clear browser cache** and refresh Supabase dashboard
2. **Try different browser** (Chrome vs Firefox)
3. **Check SMTP credentials** are correct
4. **Ensure DNS records** are properly set

### Issue: SMTP connection fails
**Solutions:**
1. **Verify SMTP host and port** are correct
2. **Check username/password** combination
3. **Ensure firewall** allows SMTP connections
4. **Test SMTP connection** with tool like telnet

### Issue: Emails still come from Supabase domain
**Solutions:**
1. **Save SMTP settings** again (sometimes needs double-save)
2. **Restart Supabase project** (in settings)
3. **Check if custom SMTP is enabled** (not just configured)

## 📊 Testing Your Setup

### 1. Test Email Delivery
1. Create a test account on your website
2. Check email headers when received:
   ```
   From: noreply@genstacker.com
   Authentication-Results: spf=pass dkim=pass
   ```

### 2. Test All Email Types
- **Signup confirmation**
- **Password reset**
- **Account notifications**

## ✅ Success Indicators

- [ ] "Set up custom SMTP" warning disappears
- [ ] Test emails arrive from `noreply@genstacker.com`
- [ ] Email headers show SPF/DKIM pass
- [ ] No rate limit warnings from Supabase
- [ ] All email types working correctly

## 🚨 Important Notes

### Rate Limits
- **Supabase built-in**: ~100 emails/hour
- **Custom SMTP**: Depends on your provider (usually much higher)
- **Resend**: 3000 emails/day (free tier)

### Security
- **Never commit SMTP credentials** to git
- **Use app passwords** instead of regular passwords
- **Enable TLS/SSL** for secure connections

---

**After configuring custom SMTP, the warning should disappear and all emails will come from your custom domain with much higher sending limits.**
