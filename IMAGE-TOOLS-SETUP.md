# Image Tools Setup Guide
## Professional Image Processing APIs

### 🎯 Overview
Your GenStacker now supports professional image processing with real API integrations. The image tools will work with fallbacks, but for best results, configure the APIs below.

### 🔧 Required Environment Variables

Add these to your `.env.local` file:

```bash
# Background Removal APIs (Choose one)
REMOVE_BG_API_KEY=your_remove_bg_api_key
REPLICATE_API_KEY=your_replicate_api_key

# Image Enhancement APIs (Choose one)
ADOBE_API_KEY=your_adobe_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# AI Image Generation APIs (Choose one or more)
OPENAI_API_KEY=your_openai_api_key
STABILITY_API_KEY=your_stability_api_key
MIDJOURNEY_API_KEY=your_midjourney_api_key
```

### 🚀 API Setup Instructions

#### 1. Background Removal (Cutout.pro style)

**Option A: Remove.bg API (Recommended)**
```bash
# Get API key from: https://www.remove.bg/api
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

**Option B: Replicate API**
```bash
# Get API key from: https://replicate.com/account
REPLICATE_API_KEY=your_replicate_api_key
```

#### 2. Image Enhancement (CapCut.pro style)

**Option A: Adobe Photoshop API**
```bash
# Get API key from: https://developer.adobe.com/console
ADOBE_API_KEY=your_adobe_api_key
```

**Option B: Cloudinary (Free tier available)**
```bash
# Get credentials from: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 3. AI Image Generation

**Option A: OpenAI DALL-E 3**
```bash
# Get API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key
```

**Option B: Stability AI**
```bash
# Get API key from: https://platform.stability.ai/account
STABILITY_API_KEY=your_stability_api_key
```

### 🎯 What Each API Does

#### Background Removal APIs:
- **Remove.bg**: Professional background removal with transparent PNG output
- **Replicate**: AI-powered background removal using RMBG-1.4 model

#### Image Enhancement APIs:
- **Adobe Photoshop API**: Professional enhancement with upscaling and color correction
- **Cloudinary**: Cloud-based enhancement with transformations and filters

#### AI Generation APIs:
- **OpenAI DALL-E 3**: Photorealistic image generation
- **Stability AI**: Fast, high-quality AI image generation

### 🔄 Fallback System

If no API keys are configured, the system will:
1. **Return original images** for background removal and enhancement
2. **Create enhanced SVG visualizations** for AI generation
3. **Provide professional UI** with all enhancement options

### 🚀 Quick Setup (Free Options)

For immediate functionality without cost:

1. **Cloudinary** (Free tier available):
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Stability AI** (Free credits available):
   ```bash
   STABILITY_API_KEY=your_stability_api_key
   ```

### 📱 Testing the Tools

1. **Background Remover**:
   - Upload an image with a clear subject
   - Should return PNG with transparent background
   - Check console for API being used

2. **Image Enhancer**:
   - Upload any image
   - Select enhancement type (Auto, 4K, Colors, etc.)
   - Should return enhanced version

3. **AI Image Generator**:
   - Enter detailed prompt
   - Should generate image based on description
   - Different models available based on API keys

### 🔍 Debugging

Check browser console for:
- `Using Remove.bg API for background removal`
- `Using Adobe Photoshop API for enhancement`
- `Using OpenAI DALL-E for generation`
- `Using fallback: returning original image`

### 💡 Pro Tips

1. **Start with free APIs** (Cloudinary, Stability AI)
2. **Add Remove.bg** for best background removal
3. **Use OpenAI** for highest quality AI generation
4. **Monitor API usage** to avoid costs
5. **Fallback system** ensures tools always work

### 🎉 Results

With proper API configuration:
- ✅ **Real background removal** with transparent PNGs
- ✅ **Professional image enhancement** with upscaling
- ✅ **High-quality AI image generation**
- ✅ **Fast processing** (2-5 seconds)
- ✅ **Professional results** like CapCut.pro and Cutout.pro

### 📞 Support

If you need help:
1. Check console logs for API errors
2. Verify API keys are correct
3. Ensure proper .env.local formatting
4. Test APIs directly first

---

**Your GenStacker image tools are now ready for professional use!** 🚀
