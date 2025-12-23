import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface GameCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  category: string
  color: string
  available?: boolean
}

export function GameCard({
  title,
  description,
  icon: Icon,
  href,
  difficulty,
  category,
  color,
  available = true,
}: GameCardProps) {
  const difficultyColors = {
    Fácil: "bg-success/10 text-success border-success/20",
    Médio: "bg-warning/10 text-warning border-warning/20",
    Difícil: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <Card className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
      {!available && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <Badge variant="secondary" className="text-sm font-semibold">
            Em Breve
          </Badge>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge className={`${difficultyColors[difficulty]} border`}>{difficulty}</Badge>
        </div>
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">{category}</span>
          {available && (
            <Link href={href}>
              <Button
                size="sm"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Jogar
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
