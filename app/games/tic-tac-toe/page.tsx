"use client"

import { TicTacToeGame } from "@/components/tic-tac-toe-game"
import { Brain, Trophy, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TicTacToePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </Button>
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Jogo da Velha Pro
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Treine suas habilidades contra uma IA imbatível. Aprenda estratégias vencedoras com dicas em tempo real.
          </p>
        </header>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-card-foreground">Estatísticas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-card-foreground">Dicas inteligentes</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm">
            <BookOpen className="w-4 h-4 text-success" />
            <span className="text-card-foreground">Modo treino</span>
          </div>
        </div>

        {/* Game Component */}
        <TicTacToeGame />
      </div>
    </div>
  )
}
