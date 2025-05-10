
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { prompt } = await req.json();

    if (!prompt) {
      throw new Error("No prompt provided");
    }

    // Create a client for working with Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get user info from JWT
    const authHeader = req.headers.get('Authorization');
    let userId = null;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (user && !error) {
        userId = user.id;
      }
    }

    // Generate medical AI response using the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are AfyaMkononi AI, a helpful healthcare assistant specializing in maternal and child healthcare. You provide information about common health conditions, preventive care, and when to seek medical attention. Always emphasize that you are not a substitute for professional medical advice. Keep responses informative but concise.'
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiResponse = data.choices[0].message.content;

    // Store the conversation in the database if user is authenticated
    if (userId) {
      await supabase.from('ai_conversations').insert({
        user_id: userId,
        prompt: prompt,
        response: aiResponse,
      }).catch(error => {
        console.error("Failed to store conversation:", error);
      });
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
