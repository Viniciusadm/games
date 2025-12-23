"use client"

import { GameCard } from "@/components/game-card"
import { Brain, Grid3x3, Flame, Puzzle, Target, Lightbulb } from "lucide-react"

export default function Home() {
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
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-2xl animate-pulse">
              <Brain className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            GameHub Pro
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aprimore suas habilidades mentais com jogos educativos e desafiadores. Treine sua memória, lógica,
            estratégia e reflexos.
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">6</div>
            <div className="text-sm text-muted-foreground">Jogos Disponíveis</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-accent">5</div>
            <div className="text-sm text-muted-foreground">Categorias</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-success">100%</div>
            <div className="text-sm text-muted-foreground">Grátis</div>
          </div>
        </section>

        {/* Games Grid */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-balance">Escolha Seu Jogo</h2>
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
