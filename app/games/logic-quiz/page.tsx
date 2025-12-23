import { ComingSoonGame } from "@/components/coming-soon-game"
import { Lightbulb } from "lucide-react"

export default function LogicQuizPage() {
  return (
    <ComingSoonGame
      title="Quiz de Lógica"
      description="Resolva enigmas e problemas de lógica desafiadores que vão testar sua capacidade de raciocínio analítico e dedução!"
      icon={Lightbulb}
      color="bg-chart-1/10 text-chart-1"
      features={[
        "Problemas de lógica de múltiplos tipos (sequências, padrões, dedução)",
        "Dificuldade progressiva conforme você avança",
        "Explicações detalhadas para cada resposta",
        "Sistema de pontos baseado em tempo e tentativas",
        "Desafios especiais semanais",
        "Rankings por categoria de problema",
      ]}
    />
  )
}
