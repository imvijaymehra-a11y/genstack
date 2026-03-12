import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro';
  created_at: string;
}

export interface Usage {
  id: string;
  user_id: string;
  tool: string;
  created_at: string;
}

export interface Plan {
  name: string;
  daily_limit: number;
  price: number;
}

export const plans: Plan[] = [
  {
    name: 'FREE PLAN',
    daily_limit: 10,
    price: 0
  },
  {
    name: 'PRO PLAN',
    daily_limit: -1, // Unlimited
    price: 29
  }
];

export async function getUserUsage(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { count, error } = await supabase
    .from('usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', today.toISOString());
  
  if (error) {
    console.error('Error fetching user usage:', error);
    return 0;
  }
  
  return count || 0;
}

export async function recordUsage(userId: string, tool: string): Promise<void> {
  const { error } = await supabase
    .from('usage')
    .insert({
      user_id: userId,
      tool,
      created_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error recording usage:', error);
    throw error;
  }
}

export async function getUserPlan(userId: string): Promise<'free' | 'pro' | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('plan')
    .eq('id', userId)
    .single();
  
  if (error || !user) {
    return null;
  }
  
  return user.plan as 'free' | 'pro';
}

export async function canUserGenerate(userId: string): Promise<{ canGenerate: boolean; reason?: string }> {
  const { data: user, error } = await supabase
    .from('users')
    .select('plan')
    .eq('id', userId)
    .single();
  
  if (error || !user) {
    return { canGenerate: false, reason: 'User not found' };
  }
  
  if (user.plan === 'pro') {
    return { canGenerate: true };
  }
  
  const usage = await getUserUsage(userId);
  const dailyLimit = plans.find(p => p.name === 'FREE PLAN')?.daily_limit || 10;
  
  if (usage >= dailyLimit) {
    return { 
      canGenerate: false, 
      reason: 'Daily limit reached. Upgrade to Pro for unlimited generations.' 
    };
  }
  
  return { canGenerate: true };
}

export async function createUserIfNotExists(userId: string, email: string): Promise<void> {
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();
  
  if (!existingUser) {
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        plan: 'free',
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
