import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// export const CreateClient = createClient(supabaseUrl!, supabaseKey!);
export const CreateClient = createClientComponentClient();

export const handleGithubLogin = async () => {
  const supabase = createClientComponentClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error('Error during login:', error);
  }
};