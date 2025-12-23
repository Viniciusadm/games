import { ComingSoonGame } from "@/components/coming-soon-game"
import { Target } from "lucide-react"

export default function TargetPracticePage() {
  return (
    <ComingSoonGame
      title="Acerte o Alvo"
      description="Teste seus reflexos e precisão clicando nos alvos que aparecem na tela. Quanto mais rápido e preciso, maior sua pontuação!"
      icon={Target}
      color="bg-success/10 text-success"
      features={[
        "Alvos com velocidades e tamanhos variados",
        "Modo de treino e modo cronometrado",
        "Power-ups especiais (tempo extra, alvos duplos)",
        "Gráfico de evolução de precisão",
        "Desafios diários com recompensas",
        "Comparação com recordes globais",
      ]}
    />
  )
}
