import { useEffect, useState } from 'react'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    const handleInstallAvailable = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    const clearInstallPrompt = () => setInstallPrompt(null)
    window.addEventListener('beforeinstallprompt', handleInstallAvailable)
    window.addEventListener('appinstalled', clearInstallPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallAvailable)
      window.removeEventListener('appinstalled', clearInstallPrompt)
    }
  }, [])

  if (!installPrompt) return null

  const install = async () => {
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <button
      type="button"
      onClick={() => void install()}
      className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-[80] inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-5"
    >
      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
        <path d="M5 17v3h14v-3" />
      </svg>
      Install app
    </button>
  )
}
