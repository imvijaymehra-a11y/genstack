# Quick Test Guide

## 🧪 Test Both Issues

### 1. Test "User Not Found" Fix

**Step 1: Clear Browser Data**
- Open browser dev tools
- Clear all cookies and local storage
- Refresh page

**Step 2: Sign Up**
- Go to your website
- Create new account with new email
- Check console logs (F12) for any errors

**Step 3: Try Generate Content**
- Go to any tool page
- Try to generate content
- Should work without "user not found" error

**Expected Console Logs:**
```
✅ "Creating missing user in database: user@example.com"
✅ "User created successfully in database"
```

### 2. Test Custom Email Setup

**Step 1: Get Service Role Key**
- Go to Supabase Dashboard
- Settings → API → service_role (copy this key)
- Update .env.local file

**Step 2: Configure DNS**
- Add DNS records from SETUP_CUSTOM_EMAIL.md
- Wait for propagation (can take 24-48 hours)

**Step 3: Test Email**
- Create test account
- Check if email comes from @genstacker.com

## 🔍 Debug Commands

### Test Auth Flow
```bash
# Test if user exists in database
curl -X POST http://localhost:3000/api/debug/auth \
  -H "Content-Type: application/json" \
  -d '{"token":"your-jwt-token"}'
```

### Check Environment
```bash
# Check if .env.local has correct values
cat .env.local | grep SUPABASE
```

## ✅ Success Criteria

- [ ] New signup works without errors
- [ ] Content generation works immediately after signup
- [ ] No "user not found" errors
- [ ] Console shows "User created successfully" 
- [ ] Emails come from @genstacker.com (after DNS setup)

## 🚨 If Still Failing

### Check 1: Service Role Key
```bash
# Make sure this is set in .env.local
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Check 2: Database Permissions
- In Supabase dashboard, check `users` table exists
- Check RLS policies allow service role to insert

### Check 3: Network Tab
- Open browser dev tools → Network
- Look for failed API calls
- Check response messages

## 📞 Quick Fix

If still getting "user not found":

1. **Manually create user in Supabase Dashboard:**
   - Go to Table Editor → users
   - Insert new row with user ID and email

2. **Check service key permissions:**
   - Service role must have INSERT permissions on users table

3. **Verify environment variables:**
   - Restart development server after changing .env.local

---

**The fixes should resolve both issues. Test with a completely new account for best results.**
