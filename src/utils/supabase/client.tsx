import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const handleGithubLogin = async () => {
  const supabase = createClientComponentClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error('Error during login:', error);
  }
};