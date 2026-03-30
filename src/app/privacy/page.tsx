export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 prose prose-invert">
      <h1 className="text-4xl font-bold mb-8 text-gradient-primary">Privacy Policy</h1>
      <p className="text-white/70 leading-relaxed mb-6">
        Your privacy is critically important to us at SwyHub. We have fundamental principles about protecting your data.
      </p>
      
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Data We Collect</h2>
      <ul className="list-disc pl-6 space-y-4 text-white/70">
        <li><strong>Discord Data:</strong> When you log in with Discord, we collect your basic profile information (ID, Username, Avatar).</li>
        <li><strong>Hardware Context:</strong> To prevent abuse, our verification gateways hash your IP and machine abstractions to issue valid keys.</li>
        <li><strong>Usage Metrics:</strong> Scripts running through our hub log basic execution counts to ensure reliability and track popular features.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Data Retention</h2>
      <p className="text-white/70 leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg mt-4">
        Logs from our checkpoint systems are typically flushed after 7 days unless involved in a ban/abuse investigation. Account data can be requested for deletion at any time via our Discord server ticket system.
      </p>
    </div>
  );
}
