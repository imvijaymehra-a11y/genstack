# GenStacker Deployment Guide

## Prerequisites

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
   - Verify installation: `node --version` and `npm --version`

2. **Set up Supabase**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Get Project URL and Anon Key from Settings > API

3. **Get OpenAI API Key**
   - Create account at [openai.com](https://openai.com)
   - Generate API key from platform.openai.com

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

## Database Setup

Create the following tables in your Supabase project:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Usage Table
```sql
CREATE TABLE usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Enable RLS (Row Level Security)
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Usage policies
CREATE POLICY "Users can insert own usage" ON usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own usage" ON usage FOR SELECT USING (auth.uid() = user_id);
```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## Environment Variables for Production
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your deployed domain)

## Common Issues & Solutions

### Build Errors
- Ensure all environment variables are set
- Check Node.js version compatibility
- Verify all dependencies are installed

### Runtime Errors
- Check Supabase connection
- Verify OpenAI API key is valid
- Ensure database tables exist

### Authentication Issues
- Check Supabase auth settings
- Verify CORS configuration
- Ensure redirect URLs are configured

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify environment variables
3. Check Supabase logs
4. Review OpenAI API usage

## Features

- 41 AI-powered tools
- User authentication with Supabase
- Usage tracking and limits
- Responsive design
- Dark mode support
- SEO optimization
- Rate limiting
