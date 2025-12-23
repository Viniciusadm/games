import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"

interface ComingSoonGameProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  features: string[]
}

export function ComingSoonGame({ title, description, icon: Icon, color, features }: ComingSoonGameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/games">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </Button>
          </Link>
        </div>

        {/* Coming Soon Card */}
        <Card className="overflow-hidden">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <div className={`p-6 rounded-2xl ${color}`}>
                <Icon className="w-16 h-16" />
              </div>
            </div>
            <div className="space-y-3">
              <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
              <CardDescription className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {description}
              </CardDescription>
            </div>
            <div className="flex items-center justify-center gap-2 text-warning">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Em Desenvolvimento</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Recursos Planejados:</h3>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Enquanto isso, que tal experimentar nosso{" "}
                <Link href="/games/tic-tac-toe" className="text-primary hover:underline font-medium">
                  Jogo da Velha IA
                </Link>
                ?
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
