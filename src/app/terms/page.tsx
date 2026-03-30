export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 prose prose-invert">
      <h1 className="text-4xl font-bold mb-8 text-gradient-primary">Terms of Service</h1>
      <p className="text-white/70 leading-relaxed mb-6">
        By accessing SwyHub and generating execution keys, you agree to follow our comprehensive terms of service. You understand that SwyHub is an integrated platform for testing Roblox experiences securely.
      </p>
      
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">1. Anti-Bypass Policies</h2>
      <p className="text-white/70 leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
        Any attempt to bypass the checkpoints provided by our partners (Linkvertise, Lootlabs, Lockrr) using scripts, extensions, or HTTP modifications will result in an immediate IP, HWID, and Discord blacklist.
        We reserve the right to void keys instantly upon detecting abusive traffic.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">2. Acceptable Use</h2>
      <p className="text-white/70 leading-relaxed">
        SwyHub must not be used for malicious activities, botnets, or game-breaking exploits that permanently damage developer economies without their consent. Key sharing is strictly forbidden.
      </p>
    </div>
  );
}
