import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RefreshCw, CheckCircle, ShieldAlert } from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";
import CopyButton from "@/components/dashboard/CopyButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch real data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { count: totalKeys } = await supabase
    .from('user_keys')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { data: activeKeys } = await supabase
    .from('user_keys')
    .select('*')
    .eq('user_id', user.id)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1);

  const { data: logs } = await supabase
    .from('executions_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const activeKey = activeKeys?.[0];
  const avatarUrl = profile?.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`;
  const rawUsername = profile?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || "User";
  const username = rawUsername.endsWith('#0') ? rawUsername.split('#')[0] : rawUsername;

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-purple-light">
          Dashboard
        </h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Key Section */}
          <div className="glass-card p-6 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md rounded-2xl ring-1 ring-white/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
              <CheckCircle className="text-green-400 w-5 h-5" /> Your Active Key
            </h2>
            
            {activeKey ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-sm text-brand-purple-light break-all shadow-inner">
                  <span className="truncate mr-2">{activeKey.key}</span>
                  <CopyButton text={activeKey.key} />
                </div>
                <div className="flex justify-between items-center text-[11px] text-white/30 uppercase tracking-widest px-1">
                  <span>Expires: <strong className="text-white/60">{new Date(activeKey.expires_at).toLocaleString('pt-BR')}</strong></span>
                  <span>Created: {new Date(activeKey.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-white/20 border-2 border-dashed border-white/5 rounded-xl bg-white/[0.01]">
                <p className="text-sm">No active session found.</p>
                <p className="text-[10px] mt-1 font-mono">Bypass the key system to see your key here.</p>
              </div>
            )}
          </div>

          {/* Execution Logs */}
          <div className="glass-card p-6 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md rounded-2xl ring-1 ring-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                Recent Executions
              </h2>
              <button className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white flex items-center gap-1.5 transition-colors">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
            
            <div className="space-y-2.5">
              {logs && logs.length > 0 ? logs.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                  <div className="flex gap-4 items-center">
                    <span className="text-[10px] font-bold tracking-tighter text-brand-purple-light bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">{log.script_name}</span>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                    log.status === 'Success' 
                      ? 'text-green-400 bg-green-400/5 border-green-400/10' 
                      : 'text-red-400 bg-red-400/5 border-red-400/10'
                  }`}>
                    {log.status === 'Success' ? 'Verified' : 'Failed'}
                  </span>
                </div>
              )) : (
                <div className="py-12 flex flex-col items-center justify-center border border-white/5 rounded-xl bg-white/[0.01]">
                   <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Awaiting First Execution</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile / Stats */}
        <div className="space-y-8">
          <div className="glass-card p-10 text-center border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md rounded-2xl ring-1 ring-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-purple/30"></div>
            
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-2xl group-hover:bg-brand-purple/30 transition-all duration-700"></div>
              <div className="relative w-28 h-28 rounded-full border-[6px] border-[#0a0a0a] overflow-hidden shadow-2xl ring-1 ring-brand-purple/20">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-[#0a0a0a] shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
            </div>
            
            <h3 className="text-2xl font-black tracking-tight text-white mb-1 drop-shadow-sm">{username}</h3>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20">
              <span className="text-[10px] font-black tracking-[0.2em] text-brand-purple-light uppercase">{profile?.tier || 'Standard User'}</span>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <p className="text-3xl font-black text-white leading-none">{totalKeys || 0}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2">Keys</p>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-black text-white leading-none">0</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2">Loads</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-7 border border-brand-purple/30 bg-brand-purple/[0.03] backdrop-blur-md rounded-2xl ring-1 ring-brand-purple/10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-brand-purple-light mb-5">
              <ShieldAlert className="w-4 h-4 text-brand-purple" /> System Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                 <p className="text-[11px] text-white/60 font-medium">Session Authenticated</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                 <p className="text-[11px] text-white/60 font-medium">HWID Integrity Verified</p>
              </div>
              <p className="text-[10px] text-white/30 italic mt-4 pt-4 border-t border-white/5 leading-relaxed">
                SwyHub uses hardware finger-printing. Sharing keys will result in an immediate blacklist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
