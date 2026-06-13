import { useState } from 'react'
import { Send, Sparkles, X } from 'lucide-react'
import { useUiStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
}

const suggestions = [
  '¿Por qué bajó la eficiencia en empaque?',
  'Resume las alertas críticas de hoy',
  'Explica la tendencia de pérdidas',
]

export function CopilotPanel() {
  const { copilotOpen, setCopilotOpen } = useUiStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Hola, soy tu asistente de inteligencia operacional. Puedo explicarte métricas, priorizar alertas o analizar tendencias. ¿En qué te ayudo?',
    },
  ])
  const [input, setInput] = useState('')

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text },
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Análisis en demo: cuando el backend FastAPI exponga el endpoint de explicaciones (ai/explainer.py), responderé con datos reales de tu operación.',
      },
    ])
    setInput('')
  }

  if (!copilotOpen) return null

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-[420px] flex-col border-l border-zinc-100 bg-white/95 shadow-soft backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Asistente IA</h3>
            <p className="text-xs text-zinc-400">Inteligencia operacional contextual</p>
          </div>
        </div>
        <button
          onClick={() => setCopilotOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100"
          aria-label="Cerrar asistente"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              msg.role === 'assistant'
                ? 'bg-ai-banner text-zinc-700'
                : 'ml-auto bg-primary text-white',
            )}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Sugerencias */}
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 border-t border-zinc-100 p-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregunta sobre tu operación..."
          className="h-11 flex-1 rounded-xl bg-zinc-100 px-4 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white hover:bg-secondary"
          aria-label="Enviar"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </aside>
  )
}
