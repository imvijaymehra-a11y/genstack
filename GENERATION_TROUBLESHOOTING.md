# Content Generation Troubleshooting Guide

## 🚨 Issue: "Failed to generate content. Please try again later."

### 🔍 Most Likely Causes

1. **Invalid/Expired OpenAI API Key**
2. **OpenAI Billing/Quota Issues**  
3. **Network/Connection Problems**
4. **Rate Limiting Issues**

---

## 🔧 Step-by-Step Fixes

### Step 1: Test OpenAI API Key

#### Test Your API Key Directly:
```bash
curl -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

#### Expected Response:
```json
{
  "choices": [{"message": {"content": "Hello!"}}]
}
```

#### Error Responses:
- `401 Unauthorized` → Invalid API key
- `429 Too Many Requests` → Rate limit exceeded
- `402 Payment Required` → Billing issue

### Step 2: Check OpenAI Dashboard

1. Go to [OpenAI Dashboard](https://platform.openai.com/)
2. Check **API Keys** section
3. Verify your key is **active** and not **expired**
4. Check **Usage** and **Billing** tabs

### Step 3: Fix API Key Issues

#### Option A: Generate New API Key
1. Go to OpenAI Dashboard → API Keys
2. Click "Create new secret key"
3. Copy the new key immediately
4. Update your `.env.local` file

#### Option B: Check Billing
1. Go to OpenAI Dashboard → Billing
2. Add payment method if not present
3. Check credit balance
4. Set usage limits if needed

### Step 4: Test with Debug Endpoint

Use the debug endpoint I created:

```bash
curl -X POST http://localhost:3000/api/debug/generate \
  -H "Content-Type: application/json" \
  -d '{
    "toolSlug": "blog-generator",
    "input": "test content"
  }'
```

This will tell you exactly what's failing.

---

## 🛠️ Advanced Fixes

### Fix 1: Add Better Error Handling
<tool_call>edit
<arg_key>file_path</arg_key>
<arg_value>c:\Users\HPBP\Documents\GitHub\genstack1\src\lib\openai.ts
