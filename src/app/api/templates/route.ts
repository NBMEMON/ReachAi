import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase';
import { PLANS } from '@/config/plans';
import type { TemplateCategory } from '@/types';

const VALID_CATEGORIES: TemplateCategory[] = [
  'sales', 'networking', 'follow-up', 'partnership', 'recruiting', 'custom',
];

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', clerkId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: templates, error } = await supabase
      .from('templates')
      .select('*')
      .or(`is_default.eq.true,user_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Templates fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, prompt_template, category } = body;

    // Presence checks
    if (!name || !description || !prompt_template) {
      return NextResponse.json(
        { error: 'name, description, and prompt_template are required' },
        { status: 400 }
      );
    }

    // Type checks
    if (
      typeof name !== 'string' ||
      typeof description !== 'string' ||
      typeof prompt_template !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
    }

    // Length limits
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: 'name must be 100 characters or fewer' },
        { status: 400 }
      );
    }
    if (description.trim().length > 500) {
      return NextResponse.json(
        { error: 'description must be 500 characters or fewer' },
        { status: 400 }
      );
    }
    if (prompt_template.trim().length > 2000) {
      return NextResponse.json(
        { error: 'prompt_template must be 2000 characters or fewer' },
        { status: 400 }
      );
    }

    // Category validation
    const resolvedCategory: TemplateCategory =
      VALID_CATEGORIES.includes(category) ? category : 'custom';

    const supabase = createAdminClient();

    // Fetch user with plan so we can enforce the template limit
    const { data: user } = await supabase
      .from('users')
      .select('id, plan')
      .eq('clerk_id', clerkId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = user.plan as keyof typeof PLANS;
    const templateLimit = PLANS[plan]?.templates;

    // Only enforce when the plan has a numeric cap ('unlimited' skips this)
    if (typeof templateLimit === 'number') {
      const { count, error: countError } = await supabase
        .from('templates')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_default', false);

      if (countError) throw countError;

      if ((count ?? 0) >= templateLimit) {
        return NextResponse.json(
          {
            error: `Your ${plan} plan allows up to ${templateLimit} custom templates. Please upgrade to create more.`,
          },
          { status: 403 }
        );
      }
    }

    const { data, error } = await supabase
      .from('templates')
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim(),
        prompt_template: prompt_template.trim(),
        category: resolvedCategory,
        is_default: false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Template creation error:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}
