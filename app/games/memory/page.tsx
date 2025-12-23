import { ComingSoonGame } from "@/components/coming-soon-game"
import { Brain } from "lucide-react"

export default function MemoryGamePage() {
  return (
    <ComingSoonGame
      title="Jogo da Memória"
      description="Teste e aprimore sua memória visual encontrando pares de cartas idênticas. Quanto mais rápido você encontrar os pares, maior será sua pontuação!"
      icon={Brain}
      color="bg-accent/10 text-accent"
      features={[
        "Múltiplos níveis de dificuldade (4x4, 6x6, 8x8)",
        "Temas variados de cartas (animais, números, símbolos)",
        "Sistema de pontuação baseado em tempo e tentativas",
        "Recordes pessoais e estatísticas detalhadas",
        "Modo treino sem limite de tempo",
        "Efeitos visuais e sonoros imersivos",
      ]}
    />
  )
}
