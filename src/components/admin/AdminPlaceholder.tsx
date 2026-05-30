'use client'
export function AdminPlaceholder({ title }: { title: string }) {
  const t = title.charAt(0).toUpperCase() + title.slice(1)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">{t} Manager</h1>
      <div className="glass-card rounded-2xl p-16 border border-white/[0.07] text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
        <p className="text-white/40 text-sm">Full CRUD interface for {t.toLowerCase()} management is being built.</p>
      </div>
    </div>
  )
}
