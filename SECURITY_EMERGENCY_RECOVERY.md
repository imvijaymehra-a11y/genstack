# 🚨 SECURITY EMERGENCY RECOVERY PLAN

## **IMMEDIATE ACTIONS REQUIRED - DO THIS NOW!**

### **🔥 STEP 1: REVOKE ALL COMPROMISED API KEYS (URGENT!)**

Your API keys have been exposed and detected by security scanners. **Revoke them immediately:**

#### **OpenAI API Key (COMPROMISED)**
- **URL:** https://platform.openai.com/api-keys
- **Key to Delete:** `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`
- **Action:** DELETE IMMEDIATELY
- **Replacement:** Create new key with restricted permissions

#### **Anthropic Claude API Key (COMPROMISED)**
- **URL:** https://console.anthropic.com/
- **Key to Delete:** `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`
- **Action:** DELETE IMMEDIATELY
- **Replacement:** Create new key with restricted permissions

#### **Google Gemini API Key (COMPROMISED)**
- **URL:** https://aistudio.google.com/app/apikey
- **Key to Delete:** `AIzaSyAovumgkRWxmo7uvBfim_ca0v8zfRy6kKw`
- **Action:** DELETE IMMEDIATELY
- **Replacement:** Create new key with restricted permissions

#### **Groq API Key (COMPROMISED)**
- **URL:** https://console.groq.com/keys
- **Key to Delete:** `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`
- **Action:** DELETE IMMEDIATELY
- **Replacement:** Create new key with restricted permissions

#### **Supabase Keys (COMPROMISED)**
- **URL:** https://supabase.com/dashboard/project/ebjcelywwmonxcoyufiz/settings/api
- **Keys to Delete:**
  - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViamNlbHl3d21vbnhjb3l1Zml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM1NTEsImV4cCI6MjA4ODkxOTU1MX0.ctHzwjEC-Fd-y6-PWZgFUpZrMyh6u4FwvipTEmK_TfE`
  - Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViamNlbHl3d21vbnhjb3l1Zml6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0MzUxMSwiZXhwIjoyMDg0OTE1NTUxfQ.oUY8D5RghoMBETTaknK5UI1BqeEixv1QJyrJ_ik1am0`
- **Action:** DELETE IMMEDIATELY
- **Replacement:** Generate new keys with restricted permissions

---

### **🔒 STEP 2: SECURE YOUR GIT REPOSITORY**

#### **Remove Sensitive Data from Git History**
```bash
# Remove the compromised .env.local from git history
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env.local' --prune-empty --tag-name-filter cat -- --all

# Clean up the refs
git for-each-ref --format='delete %(refname)' refs/original/ | git update-ref --stdin

# Force push to remove from remote
git push origin --force --all
```

#### **Add Security Precommit Hooks**
```bash
# Install precommit to prevent future API key commits
npm install --save-dev precommit
echo "precommit run --files" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

### **🔧 STEP 3: UPDATE YOUR LOCAL ENVIRONMENT**

#### **Replace with New API Keys**
1. Get new API keys from each service (Step 1)
2. Update your local `.env.local` file with the new keys
3. **NEVER** commit `.env.local` to version control

#### **Environment Variables Template**
```env
# SECURITY WARNING: This file contains sensitive API keys
# DO NOT COMMIT TO VERSION CONTROL
# This file should be in .gitignore

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_new_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_new_supabase_service_role_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_new_openai_api_key_here

# Anthropic Claude Configuration
ANTHROPIC_API_KEY=your_new_anthropic_api_key_here

# Google Gemini Configuration
GOOGLE_AI_API_KEY=your_new_google_gemini_api_key_here

# Groq Configuration
GROQ_API_KEY=your_new_groq_api_key_here

# Optional: Custom domain for production
NEXT_PUBLIC_APP_URL=https://www.genstacker.com
NEXT_PUBLIC_GA_ID=
```

---

### **🛡️ STEP 4: IMPLEMENT SECURITY BEST PRACTICES**

#### **API Key Security**
- ✅ Use environment variables (never hardcode)
- ✅ Rotate keys every 90 days
- ✅ Use restricted permissions
- ✅ Monitor usage regularly
- ✅ Set spending limits

#### **Git Security**
- ✅ `.env.local` in `.gitignore` (already done)
- ✅ Use `.env.example` for templates
- ✅ Precommit hooks to prevent API key commits
- ✅ Regular security scans

#### **Production Security**
- ✅ Use Vercel environment variables
- ✅ Enable Vercel's security features
- ✅ Monitor for unusual API usage
- ✅ Set up alerts for high usage

---

### **📊 STEP 5: MONITOR FOR COMPROMISE**

#### **Check for Unauthorized Usage**
- OpenAI: Monitor API usage dashboard
- Anthropic: Check usage logs
- Google AI: Review API calls
- Groq: Monitor request logs
- Supabase: Check database access logs

#### **Look for Suspicious Activity**
- Unusual API call patterns
- High usage from unknown sources
- Requests from unexpected regions
- Multiple failed authentication attempts

---

### **🚀 STEP 6: RECOVERY COMPLETE CHECKLIST**

#### **Immediate Actions (Do Now)**
- [ ] **Revoke all old API keys**
- [ ] **Generate new API keys**
- [ ] **Update local .env.local**
- [ ] **Remove sensitive data from git history**
- [ ] **Force push cleaned repository**

#### **Security Setup (Do Today)**
- [ ] **Set up API usage monitoring**
- [ ] **Configure spending limits**
- [ ] **Enable security alerts**
- [ ] **Add precommit hooks**
- [ ] **Test application with new keys**

#### **Ongoing Maintenance (Do Weekly)**
- [ ] **Review API usage logs**
- [ ] **Check for unusual activity**
- [ ] **Rotate keys if suspicious activity**
- [ ] **Update security documentation**

---

## **🎯 CRITICAL WARNING**

**Your API keys were exposed and detected by:**
- GitHub security scanners
- Anthropic security team
- OpenAI security team  
- Google security team

**This means:**
- Your keys may have been used by unauthorized parties
- You may have incurred unexpected charges
- Your application data may have been accessed

**Immediate action is required to prevent further damage!**

---

## **📞 EMERGENCY CONTACTS**

If you need immediate help:
- **GitHub Support:** https://support.github.com
- **OpenAI Support:** https://help.openai.com
- **Anthropic Support:** https://support.anthropic.com
- **Google Cloud Support:** https://cloud.google.com/support

---

## **✅ RECOVERY STATUS**

**Status:** 🚨 **CRITICAL - IMMEDIATE ACTION REQUIRED**

**Next Steps:**
1. Revoke all API keys (URGENT)
2. Generate new keys
3. Update environment
4. Secure git repository
5. Monitor for compromise

**Timeline:** 
- **0-1 hours:** Revoke keys, update environment
- **1-6 hours:** Secure git, monitor usage
- **6-24 hours:** Full security audit
- **24-72 hours:** Implement long-term security

---

**🚨 THIS IS A CRITICAL SECURITY INCIDENT - ACT IMMEDIATELY!**
