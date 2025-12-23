import { ComingSoonGame } from "@/components/coming-soon-game"
import { Puzzle } from "lucide-react"

export default function SlidingPuzzlePage() {
  return (
    <ComingSoonGame
      title="Quebra-Cabeça Deslizante"
      description="Reorganize as peças deslizantes para formar a imagem completa. Um clássico jogo de lógica que desafia seu raciocínio espacial!"
      icon={Puzzle}
      color="bg-warning/10 text-warning"
      features={[
        "Tamanhos de grade variados (3x3, 4x4, 5x5)",
        "Galeria de imagens para escolher",
        "Contador de movimentos e tempo",
        "Modo de resolução automática para aprender",
        "Visualização de recordes por dificuldade",
        "Sistema de dicas que sugere próximo movimento",
      ]}
    />
  )
}
