# Setting Up Custom Email Domain for GenStacker

## 🎯 Goal
Configure Supabase to send emails from `@genstacker.com` instead of the default Supabase domain.

## 📋 Prerequisites
- Access to your domain registrar (where you bought genstacker.com)
- Supabase project dashboard access
- Admin access to DNS settings

## 🔧 Step-by-Step Setup

### 1. Configure DNS Records
Add the following DNS records to your domain registrar:

#### For Email Verification (DKIM)
```
Type: CNAME
Name: k1._domainkey
Value: k1.dkim.supabase.co
TTL: 3600
```

#### For Email Verification (SPF)
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
TTL: 3600
```

#### For Email Verification (DMARC)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@genstacker.com
TTL: 3600
```

### 2. Configure Supabase Settings
1. Go to your Supabase project dashboard
2. Navigate to **Authentication > Settings**
3. Scroll down to **Email Templates**
4. Configure the following:

#### Site URL
```
Site URL: https://www.genstacker.com
```

#### Email Templates
- **Confirmation Template**: Customize with your branding
- **Recovery Template**: Customize with your branding
- **Change Email Address**: Customize with your branding

### 3. Set Up Custom SMTP (Optional but Recommended)
1. In Supabase dashboard, go to **Authentication > Settings**
2. Scroll to **Custom SMTP**
3. Configure with your email provider:
   - **SMTP Host**: smtp.your-provider.com
   - **SMTP Port**: 587
   - **SMTP User**: noreply@genstacker.com
   - **SMTP Password**: [your-app-password]
   - **Sender Name**: GenStacker
   - **Sender Email**: noreply@genstacker.com

## 🧪 Testing the Setup

### 1. Test DNS Propagation
```bash
# Check DKIM record
dig CNAME k1._domainkey.genstacker.com

# Check SPF record
dig TXT genstacker.com

# Check DMARC record
dig TXT _dmarc.genstacker.com
```

### 2. Test Email Delivery
1. Create a test account on your website
2. Check if you receive the verification email
3. Verify the sender is `noreply@genstacker.com`

## 🚨 Troubleshooting

### Issue: DNS records not propagating
- **Solution**: Wait 24-48 hours for DNS propagation
- **Check**: Use DNS lookup tools to verify records

### Issue: Emails still come from Supabase domain
- **Solution**: Verify all DNS records are correctly set
- **Check**: Supabase dashboard for any error messages

### Issue: Emails going to spam
- **Solution**: Check SPF, DKIM, and DMARC records
- **Check**: Email content for spam triggers

## 📧 Alternative: Use Resend (Recommended)

If you want a simpler solution:

1. Sign up for [Resend](https://resend.com)
2. Add your domain: `genstacker.com`
3. Configure DNS records provided by Resend
4. In Supabase, use Resend SMTP settings:
   - **SMTP Host**: smtp.resend.com
   - **SMTP Port**: 587
   - **SMTP User**: resend@genstacker.com
   - **SMTP Password**: [resend-api-key]

## ✅ Verification Checklist

- [ ] DNS records configured correctly
- [ ] Supabase email templates customized
- [ ] Test email sent and received
- [ ] Sender shows as `@genstacker.com`
- [ ] Emails not going to spam
- [ ] All email types working (signup, reset, etc.)

## 📞 Support

If you need help:
1. Check Supabase documentation: https://supabase.com/docs/guides/auth
2. Contact your domain registrar support for DNS issues
3. Use online DNS checker tools to verify records

---

**Note**: This setup ensures all transactional emails (signup confirmations, password resets, etc.) come from your custom domain, improving brand recognition and deliverability.
