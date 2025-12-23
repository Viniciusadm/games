import { ComingSoonGame } from "@/components/coming-soon-game"
import { Flame } from "lucide-react"

export default function HangmanPage() {
  return (
    <ComingSoonGame
      title="Jogo da Forca"
      description="Adivinhe a palavra letra por letra antes que o boneco seja completamente desenhado. Expanda seu vocabulário enquanto se diverte!"
      icon={Flame}
      color="bg-destructive/10 text-destructive"
      features={[
        "Categorias diversas (animais, países, profissões, filmes)",
        "Banco de palavras constantemente atualizado",
        "Sistema de dicas para palavras difíceis",
        "Dificuldade progressiva conforme você acerta",
        "Estatísticas de palavras descobertas e taxa de acerto",
        "Modo desafio com tempo limitado",
      ]}
    />
  )
}
