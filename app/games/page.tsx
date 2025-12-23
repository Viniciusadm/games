"use client"

import { GameCard } from "@/components/game-card"
import { Brain, Grid3x3, Flame, Puzzle, Target, Lightbulb } from "lucide-react"

export default function GamesPage() {
  const games = [
    {
      title: "Jogo da Velha IA",
      description: "Enfrente uma IA imbatível e aprenda estratégias vencedoras com dicas em tempo real.",
      icon: Grid3x3,
      href: "/games/tic-tac-toe",
      difficulty: "Médio" as const,
      category: "Estratégia",
      color: "bg-primary/10 text-primary",
      available: true,
    },
    {
      title: "Jogo da Memória",
      description: "Teste sua memória encontrando pares de cartas. Diferentes níveis de dificuldade disponíveis.",
      icon: Brain,
      href: "/games/memory",
      difficulty: "Fácil" as const,
      category: "Memória",
      color: "bg-accent/10 text-accent",
      available: false,
    },
    {
      title: "Jogo da Forca",
      description: "Adivinhe a palavra antes que o boneco seja enforcado. Categorias variadas para todos.",
      icon: Flame,
      href: "/games/hangman",
      difficulty: "Médio" as const,
      category: "Vocabulário",
      color: "bg-destructive/10 text-destructive",
      available: false,
    },
    {
      title: "Quebra-Cabeça Deslizante",
      description: "Reorganize as peças para formar a imagem. Estimula o raciocínio espacial.",
      icon: Puzzle,
      href: "/games/sliding-puzzle",
      difficulty: "Difícil" as const,
      category: "Lógica",
      color: "bg-warning/10 text-warning",
      available: false,
    },
    {
      title: "Acerte o Alvo",
      description: "Teste seus reflexos e precisão em desafios cronometrados cada vez mais difíceis.",
      icon: Target,
      href: "/games/target-practice",
      difficulty: "Médio" as const,
      category: "Reflexos",
      color: "bg-success/10 text-success",
      available: false,
    },
    {
      title: "Quiz de Lógica",
      description: "Resolva problemas de lógica desafiadores e melhore seu raciocínio analítico.",
      icon: Lightbulb,
      href: "/games/logic-quiz",
      difficulty: "Difícil" as const,
      category: "Lógica",
      color: "bg-chart-1/10 text-chart-1",
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <section className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Todos os Jogos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Escolha entre diversos jogos educativos e desafiadores
          </p>
        </section>

        {/* Games Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
