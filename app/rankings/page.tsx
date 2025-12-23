"use client"

import { Trophy, Medal, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <section className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-accent/10 rounded-2xl">
              <Trophy className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Rankings
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Veja os melhores jogadores e suas conquistas
          </p>
        </section>

        {/* Coming Soon */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <Medal className="w-8 h-8 text-primary" />
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <Award className="w-8 h-8 text-success" />
              </div>
            </div>
            <CardTitle className="text-2xl">Sistema de Rankings em Desenvolvimento</CardTitle>
            <CardDescription className="text-base mt-2">
              Em breve você poderá competir com outros jogadores e subir no ranking global
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-sm">Rankings por jogo</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Medal className="w-5 h-5 text-primary" />
                <span className="text-sm">Conquistas e badges</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-success" />
                <span className="text-sm">Ranking global</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Badge variant="secondary" className="text-sm">
                Disponível em breve
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
