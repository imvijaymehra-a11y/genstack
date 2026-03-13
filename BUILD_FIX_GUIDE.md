# 🔧 Build Fix Guide - Missing Dependencies

## ❌ **Error Found:**
```
Module not found: Can't resolve '@google/generative-ai'
```

## ✅ **Quick Fix (2 minutes):**

### **Step 1: Install Missing Packages**
Run these commands in your terminal:

```bash
# Install Google Generative AI package
npm install @google/generative-ai

# Install Anthropic SDK package  
npm install @anthropic-ai/sdk

# Install all dependencies at once
npm install @google/generative-ai @anthropic-ai/sdk
```

### **Step 2: Clear Node Modules (Optional)**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Step 3: Try Build Again**
```bash
npm run build
```

---

## 📦 **What I've Updated:**

### **✅ Added to package.json:**
```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.20.0",
    "@google/generative-ai": "^0.1.3"
  }
}
```

### **✅ Required Packages:**
- **@google/generative-ai** - For Gemini models
- **@anthropic-ai/sdk** - For Claude models
- **openai** - Already installed ✅
- **@supabase/supabase-js** - Already installed ✅

---

## 🚀 **Alternative: Manual Install**

### **If npm commands don't work:**

#### **Option 1: Use yarn**
```bash
yarn add @google/generative-ai @anthropic-ai/sdk
```

#### **Option 2: Use pnpm**
```bash
pnpm add @google/generative-ai @anthropic-ai/sdk
```

#### **Option 3: Edit package.json directly**
1. Open `package.json`
2. Add these lines to dependencies:
   ```json
   "@anthropic-ai/sdk": "^0.20.0",
   "@google/generative-ai": "^0.1.3"
   ```
3. Run: `npm install`

---

## 🔍 **Verification:**

### **After Installation, Check:**
```bash
# Verify packages are installed
npm list @google/generative-ai
npm list @anthropic-ai/sdk

# Should show:
# @google/generative-ai@0.1.3
# @anthropic-ai/sdk@0.20.0
```

### **Test Build:**
```bash
npm run build
```

### **Expected Result:**
```
✓ Compiled successfully
✓ Linting completed
✓ Ready for production
```

---

## 🛠️ **If Issues Persist:**

### **Check Node Version:**
```bash
node --version
# Should be 16+ (recommend 18+)
```

### **Clear npm Cache:**
```bash
npm cache clean --force
npm install
```

### **Update npm:**
```bash
npm install -g npm@latest
```

---

## 📊 **Package Status:**

### **✅ Already Installed:**
- next ✅
- react ✅
- react-dom ✅
- @supabase/supabase-js ✅
- openai ✅
- lucide-react ✅
- tailwindcss ✅

### **⚠️ Need to Install:**
- @google/generative-ai ❌
- @anthropic-ai/sdk ❌

---

## 🎯 **Success Criteria:**

### **✅ After Fix:**
- [ ] Build completes without errors
- [ ] All AI models can be imported
- [ ] Gemini and Claude models work
- [ ] Production build successful

### **✅ Test All Models:**
After build fix, test:
```bash
curl http://localhost:3000/api/test/all-apis
```

---

## 🚀 **Next Steps:**

### **✅ Immediate:**
1. Install missing packages
2. Run build command
3. Verify success

### **✅ After Build Success:**
1. Test all AI models
2. Verify Supabase integration
3. Deploy to production

---

## 📞 **Troubleshooting:**

### **If npm install fails:**
```bash
# Try with admin rights
sudo npm install @google/generative-ai @anthropic-ai/sdk

# Or use different registry
npm config set registry https://registry.npmjs.org/
npm install
```

### **If build still fails:**
```bash
# Check for other missing imports
grep -r "import.*from" src/ | grep -v node_modules
```

### **If TypeScript errors:**
```bash
# Install types
npm install --save-dev @types/google-generative-ai
```

---

**🔧 Run the install commands and your build should work perfectly!** 

The missing packages are the only thing blocking your production build.
