import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email" className="mr-8">
          Email
        </label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>

      <div>
        <button className="bg-red-400" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
