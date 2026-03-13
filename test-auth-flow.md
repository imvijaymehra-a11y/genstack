# Testing Authentication & Content Generation Flow

## 🧪 Test Steps

### 1. User Registration Test
**Expected Flow:**
1. User signs up → Supabase creates auth user
2. `createUserIfNotExists` function creates user in database
3. User receives verification email from Supabase
4. User clicks verification link → Account verified

**Files to Check:**
- `src/app/api/auth/signup/route.ts` - Creates user in database
- `src/lib/supabase.ts` - `createUserIfNotExists` function

### 2. User Login Test
**Expected Flow:**
1. User logs in → Gets session token
2. Frontend stores session
3. User can access tools

**Files to Check:**
- `src/app/api/auth/login/route.ts`
- `src/components/Navbar.tsx` - Auth state management

### 3. Content Generation Test
**Expected Flow:**
1. User tries to generate content
2. API receives Bearer token
3. `supabase.auth.getUser(token)` validates user
4. `canUserGenerate(user.id)` checks database
5. If user not found → Creates user automatically
6. Checks usage limits
7. Calls OpenAI API
8. Records usage in database
9. Returns generated content

**Files to Check:**
- `src/app/api/generate/route.ts` - Main generation logic
- `src/lib/supabase.ts` - User validation functions

## 🔧 Debugging Steps

### If "User not found" error occurs:

1. **Check Supabase Database:**
   ```sql
   SELECT * FROM users WHERE email = 'your-email@example.com';
   ```

2. **Check Auth vs Database Sync:**
   - User exists in auth.users but not in public.users
   - Solution: Automatic user creation in generate API

3. **Check Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=correct?
   NEXT_PUBLIC_SUPABASE_ANON_KEY=correct?
   SUPABASE_SERVICE_ROLE_KEY=correct?
   ```

### If content generation fails:

1. **Check OpenAI Integration:**
   - API key valid?
   - OpenAI service accessible?

2. **Check Usage Limits:**
   ```sql
   SELECT COUNT(*) FROM usage 
   WHERE user_id = 'user-id' 
   AND created_at >= CURRENT_DATE;
   ```

3. **Check Rate Limiting:**
   - In-memory rate limit might be too strict
   - Daily limit: 10 for free users

## 🧪 Manual Testing

### Test with Browser DevTools:

1. **Open Browser DevTools → Network tab**
2. **Sign up** → Check `POST /api/auth/signup`
3. **Sign in** → Check `POST /api/auth/login`
4. **Generate content** → Check `POST /api/generate`

**Expected Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Expected Request Body:**
```json
{
  "toolSlug": "blog-generator",
  "input": "Test input"
}
```

## 🚨 Common Issues & Solutions

### Issue: User exists in auth but not database
**Solution:** Automatic user creation in generate API (already implemented)

### Issue: Invalid token error
**Solution:** Check token format and expiration

### Issue: OpenAI API error
**Solution:** Verify API key and usage limits

### Issue: Rate limit exceeded
**Solution:** Check daily usage count or upgrade plan

## ✅ Success Indicators

- ✅ User can sign up and receive verification email
- ✅ User can log in and see authenticated state
- ✅ User can generate content without "user not found" error
- ✅ Usage is properly tracked in database
- ✅ Rate limits are enforced correctly

## 📊 Monitoring

Add these console logs to track issues:

```javascript
// In generate route
console.log('User from auth:', user);
console.log('Can generate:', await canUserGenerate(user.id));
console.log('Usage count:', await getUserUsage(user.id));
```

---

**After implementing fixes, test the complete flow from signup to content generation.**
