# GenStacker - AI Tools Hub

A production-ready SaaS web application that provides 41 AI tools grouped into 6 categories. Users can generate content using AI tools powered by the OpenAI API.

## Features

- **41 AI Tools** across 6 categories
- **Dynamic Tool Engine** - Easy to add new tools without creating new pages
- **User Authentication** with Supabase Auth
- **Freemium Model** - Free users get 10 generations/day, Pro users get unlimited
- **SEO Optimized** pages for all tools
- **Modern UI** with TailwindCSS
- **Responsive Design** for all devices
- **Dark/Light Mode** support
- **Copy to Clipboard** functionality
- **Loading Animations** for better UX

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI Integration**: OpenAI API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Supabase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd genstacker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Supabase Database**
   
   Run the following SQL in your Supabase SQL editor:
   
   ```sql
   -- Create users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create usage table
   CREATE TABLE usage (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     tool TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create indexes
   CREATE INDEX idx_usage_user_id ON usage(user_id);
   CREATE INDEX idx_usage_created_at ON usage(created_at);
   
   -- Enable RLS
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
   
   -- RLS Policies
   CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
   
   CREATE POLICY "Users can view own usage" ON usage FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own usage" ON usage FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/src
  /app
    page.tsx                    # Homepage
    /tools
      page.tsx                  # All tools directory
      /[slug]/page.tsx          # Dynamic tool page
    /dashboard
      page.tsx                  # User dashboard
    /pricing
      page.tsx                  # Pricing page
    /api
      /generate/route.ts         # AI generation API
    layout.tsx                  # Root layout
    globals.css                 # Global styles
  /components
    Navbar.tsx                 # Navigation component
    Footer.tsx                 # Footer component
    ToolForm.tsx               # Tool input form
    ToolOutput.tsx              # Tool output display
    ToolCard.tsx               # Tool card component
  /lib
    tools.ts                   # Tools configuration
    openai.ts                  # OpenAI integration
    supabase.ts               # Supabase configuration
    utils.ts                   # Utility functions
```

## Adding New Tools

To add a new tool, simply add it to the `tools` array in `/src/lib/tools.ts`:

```typescript
{
  slug: "your-tool-slug",
  name: "Your Tool Name",
  description: "Description of what this tool does",
  category: "Your Category",
  prompt: "Write a prompt template with {input} placeholder",
  seoTitle: "SEO Title for the tool",
  seoDescription: "SEO Description for the tool"
}
```

The tool will automatically be available at `/tools/your-tool-slug` with full functionality.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ |
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ |

## Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Usage Limits

- **Free Plan**: 10 generations per day
- **Pro Plan**: Unlimited generations

## API Endpoints

### POST /api/generate

Generates content using AI.

**Request Body:**
```json
{
  "toolSlug": "blog-generator",
  "input": "Your topic or request"
}
```

**Headers:**
```
Authorization: Bearer <user_session_token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "content": "Generated content here...",
  "tool": "Blog Generator",
  "usage": {
    "tool": "blog-generator",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact support@genstacker.com or create an issue in the repository.
