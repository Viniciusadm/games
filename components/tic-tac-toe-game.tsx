"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  Lightbulb,
  Brain,
  GraduationCap,
  ClipboardCheck,
  Swords,
  RotateCcw,
  Download,
  Play,
  Pause,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Cell = "X" | "O" | null
type Board = Cell[]
type Winner = "X" | "O" | "draw" | null

const AI = "X"
const HUMAN = "O"
const EMPTY = null

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

interface Stats {
  best: number
  ok: number
  bad: number
}

interface ErrorStats {
  missedWin: number
  allowedLoss: number
  missedFork: number
  weakPositional: number
}

interface GameHistory {
  board: Board
  played: number
  optimal: { move: number; score: number }
}

export function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [showHint, setShowHint] = useState(true)
  const [trainingMode, setTrainingMode] = useState(false)
  const [teacherMode, setTeacherMode] = useState(false)
  const [examMode, setExamMode] = useState(false)
  const [challengeMode, setChallengeMode] = useState<"normal" | "hard" | "expert">("normal")
  const [stats, setStats] = useState<Stats>({ best: 0, ok: 0, bad: 0 })
  const [errorStats, setErrorStats] = useState<ErrorStats>({
    missedWin: 0,
    allowedLoss: 0,
    missedFork: 0,
    weakPositional: 0,
  })
  const [history, setHistory] = useState<GameHistory[]>([])
  const [replayData, setReplayData] = useState<Board[]>([])
  const [isReplaying, setIsReplaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<Winner>(null)
  const [teacherFeedback, setTeacherFeedback] = useState<string>("")

  const checkWinner = (b: Board): Winner => {
    for (const [a, b2, c] of wins) {
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a] as "X" | "O"
    }
    if (b.every((v) => v !== EMPTY)) return "draw"
    return null
  }

  const minimax = (b: Board, isMax: boolean): number => {
    const r = checkWinner(b)
    if (r === AI) return 1
    if (r === HUMAN) return -1
    if (r === "draw") return 0

    let best = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    for (let i = 0; i < 9; i++) {
      if (b[i] === EMPTY) {
        b[i] = isMax ? AI : HUMAN
        const v = minimax(b, !isMax)
        b[i] = EMPTY
        best = isMax ? Math.max(best, v) : Math.min(best, v)
      }
    }
    return best
  }

  const bestMove = (b: Board, player: "X" | "O"): { move: number; score: number } => {
    const emptyCount = b.filter((cell) => cell === EMPTY).length
    if (emptyCount === 9 && player === HUMAN) {
      return { move: 4, score: 0 }
    }

    let bestScore = player === AI ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    let move = -1

    for (let i = 0; i < 9; i++) {
      if (b[i] === EMPTY) {
        b[i] = player
        const score = minimax(b, player === HUMAN)
        b[i] = EMPTY
        if ((player === AI && score > bestScore) || (player === HUMAN && score < bestScore)) {
          bestScore = score
          move = i
        }
      }
    }
    return { move, score: bestScore }
  }

  const generateFeedback = (played: number, optimal: { move: number; score: number }): string => {
    if (played === optimal.move) {
      const praises = [
        "Excelente jogada! Essa é a melhor escolha possível.",
        "Perfeito! Você está pensando como um mestre.",
        "Ótima decisão estratégica!",
      ]
      return praises[Math.floor(Math.random() * praises.length)]
    }

    const reasons = [
      `A casa ${optimal.move + 1} seria mais estratégica porque controla o centro ou cria mais ameaças.`,
      `Jogar na casa ${optimal.move + 1} te daria mais opções de vitória.`,
      `A casa ${optimal.move + 1} bloquearia melhor as jogadas da IA.`,
    ]
    return `Boa tentativa! ${reasons[Math.floor(Math.random() * reasons.length)]}`
  }

  const playerMove = (i: number) => {
    if (board[i] || gameOver || isReplaying) return

    const newBoard = [...board]
    const optimal = bestMove(newBoard, HUMAN)

    if (!trainingMode) {
      const newStats = { ...stats }
      if (i === optimal.move) newStats.best++
      else if (optimal.score === 0) newStats.ok++
      else newStats.bad++
      setStats(newStats)
    }

    if (teacherMode) {
      setTeacherFeedback(generateFeedback(i, optimal))
    }

    setHistory([...history, { board: [...board], played: i, optimal }])
    setReplayData([...replayData, [...board]])

    newBoard[i] = HUMAN
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      finishGame(result)
      return
    }

    setTimeout(() => {
      const ai = bestMove(newBoard, AI)
      newBoard[ai.move] = AI
      setBoard([...newBoard])
      setReplayData((prev) => [...prev, [...newBoard]])

      const finalResult = checkWinner(newBoard)
      if (finalResult) {
        finishGame(finalResult)
      }
    }, 300)
  }

  const finishGame = (result: Winner) => {
    setGameOver(true)
    setWinner(result)

    if (examMode) {
      const gamesHistory = JSON.parse(localStorage.getItem("gamesHistory") || "[]")
      gamesHistory.push({
        date: new Date().toISOString(),
        result,
        stats,
        errorStats,
      })
      localStorage.setItem("gamesHistory", JSON.stringify(gamesHistory))
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameOver(false)
    setWinner(null)
    setHistory([])
    setReplayData([])
    setTeacherFeedback("")
  }

  const replay = () => {
    if (replayData.length === 0) return
    setIsReplaying(true)
    let i = 0
    const interval = setInterval(() => {
      if (i >= replayData.length) {
        clearInterval(interval)
        setIsReplaying(false)
        return
      }
      setBoard([...replayData[i]])
      i++
    }, 600)
  }

  const exportReport = () => {
    const data = localStorage.getItem("gamesHistory") || "[]"
    const blob = new Blob([data], { type: "application/json" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "relatorio-jogo-da-velha.json"
    a.click()
  }

  const shouldShowHint = showHint && !examMode && !gameOver
  const hintMove = shouldShowHint ? bestMove(board, HUMAN) : null

  const cycleChallenge = () => {
    const modes: Array<"normal" | "hard" | "expert"> = ["normal", "hard", "expert"]
    const currentIndex = modes.indexOf(challengeMode)
    setChallengeMode(modes[(currentIndex + 1) % modes.length])
  }

  const totalMoves = stats.best + stats.ok + stats.bad
  const accuracy = totalMoves > 0 ? Math.round((stats.best / totalMoves) * 100) : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 md:gap-6 p-4 md:p-0">
      <div className="space-y-4 md:space-y-6">
        <Card className="border-2">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg">Controles</CardTitle>
            <CardDescription className="text-xs md:text-sm">Configure o modo de jogo</CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={showHint ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      disabled={examMode}
                      className="gap-1.5 text-xs md:text-sm h-8 md:h-9 px-2.5 md:px-3"
                    >
                      <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Dicas
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Mostra a melhor jogada possível em tempo real</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={trainingMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setTrainingMode(!trainingMode)
                        if (!trainingMode) {
                          setTeacherMode(false)
                          setExamMode(false)
                        }
                      }}
                      className="gap-1.5 text-xs md:text-sm h-8 md:h-9 px-2.5 md:px-3"
                    >
                      <Brain className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Treino
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Modo livre para praticar sem contar estatísticas</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={teacherMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setTeacherMode(!teacherMode)
                        if (!teacherMode) {
                          setTrainingMode(false)
                          setExamMode(false)
                        }
                      }}
                      className="gap-1.5 text-xs md:text-sm h-8 md:h-9 px-2.5 md:px-3"
                    >
                      <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Professor
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Receba feedback explicativo após cada jogada</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={examMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setExamMode(!examMode)
                        if (!examMode) {
                          setTrainingMode(false)
                          setTeacherMode(false)
                          setShowHint(false)
                        }
                      }}
                      className="gap-1.5 text-xs md:text-sm h-8 md:h-9 px-2.5 md:px-3"
                    >
                      <ClipboardCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Prova
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Teste sem dicas - conta para ranking!</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cycleChallenge}
                      className="gap-1.5 bg-transparent text-xs md:text-sm h-8 md:h-9 px-2.5 md:px-3"
                    >
                      <Swords className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {challengeMode.toUpperCase()}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Alterna entre níveis de dificuldade da IA</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {(trainingMode || teacherMode || examMode) && (
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold text-sm",
                    trainingMode && "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400",
                    teacherMode && "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400",
                    examMode && "bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400",
                  )}
                >
                  {trainingMode && (
                    <>
                      <Brain className="w-4 h-4" />
                      Modo Treino - Estatísticas desativadas
                    </>
                  )}
                  {teacherMode && (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      Modo Professor - Recebendo feedback
                    </>
                  )}
                  {examMode && (
                    <>
                      <ClipboardCheck className="w-4 h-4" />
                      Modo Prova - Sem dicas disponíveis
                    </>
                  )}
                </div>
              )}

              {teacherMode && teacherFeedback && !gameOver && (
                <div className="flex items-start gap-3 px-4 py-3 bg-purple-500/10 border-2 border-purple-500 rounded-lg max-w-md">
                  <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-600 dark:text-purple-400 leading-relaxed">{teacherFeedback}</p>
                </div>
              )}

              {shouldShowHint && hintMove && hintMove.move !== -1 && !gameOver && (
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent rounded-lg">
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  <span className="text-xs md:text-sm font-medium text-accent-foreground">
                    Sugestão: Casa {hintMove.move + 1}
                  </span>
                </div>
              )}

              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] mx-auto">
                <div className="grid grid-cols-3 gap-2 md:gap-3 p-3 md:p-6 bg-muted/30 rounded-2xl">
                  {board.map((cell, i) => {
                    const isHinted = shouldShowHint && hintMove?.move === i && cell === EMPTY && !gameOver
                    const isWinningCell =
                      winner &&
                      winner !== "draw" &&
                      wins.some((combo) => combo.includes(i) && combo.every((idx) => board[idx] === winner))

                    return (
                      <button
                        key={i}
                        onClick={() => playerMove(i)}
                        disabled={!!cell || gameOver || isReplaying}
                        className={cn(
                          "aspect-square w-full rounded-xl font-bold text-3xl sm:text-4xl md:text-5xl transition-all duration-200",
                          "flex items-center justify-center",
                          "disabled:cursor-not-allowed",
                          cell === EMPTY && !gameOver && !isReplaying && "hover:bg-card hover:scale-105 cursor-pointer",
                          cell === EMPTY ? "bg-card border-2 border-border" : "bg-card",
                          isHinted && "ring-4 ring-accent/50 bg-accent/10 animate-pulse",
                          isWinningCell && "ring-4 ring-success animate-pulse",
                          cell === "X" && "text-primary",
                          cell === "O" && "text-accent",
                        )}
                      >
                        {cell}
                      </button>
                    )
                  })}
                </div>
              </div>

              {gameOver && winner && (
                <div
                  className={cn(
                    "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl border-2",
                    winner === HUMAN && "bg-success/10 border-success text-success-foreground",
                    winner === AI && "bg-destructive/10 border-destructive text-destructive-foreground",
                    winner === "draw" && "bg-warning/10 border-warning text-warning-foreground",
                  )}
                >
                  {winner === HUMAN && <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />}
                  {winner === AI && <XCircle className="w-5 h-5 md:w-6 md:h-6" />}
                  {winner === "draw" && <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />}
                  <span className="font-semibold text-base md:text-lg">
                    {winner === HUMAN && "Você venceu! Parabéns!"}
                    {winner === AI && "IA venceu. Tente novamente!"}
                    {winner === "draw" && "Empate!"}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                <Button
                  onClick={resetGame}
                  variant="default"
                  className="gap-1.5 text-xs md:text-sm h-9 md:h-10 px-3 md:px-4"
                >
                  <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Novo Jogo
                </Button>
                <Button
                  onClick={replay}
                  variant="outline"
                  className="gap-1.5 bg-transparent text-xs md:text-sm h-9 md:h-10 px-3 md:px-4"
                  disabled={replayData.length === 0 || isReplaying}
                >
                  {isReplaying ? (
                    <Pause className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  ) : (
                    <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  )}
                  Replay
                </Button>
                <Button
                  onClick={exportReport}
                  variant="outline"
                  className="gap-1.5 bg-transparent text-xs md:text-sm h-9 md:h-10 px-3 md:px-4"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Card className="border-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Desempenho
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {trainingMode
                ? "Modo treino - estatísticas pausadas"
                : examMode
                  ? "Modo prova - conta para ranking!"
                  : "Suas estatísticas de jogo"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium text-foreground">Precisão</span>
                <span className="text-xl md:text-2xl font-bold text-primary">{accuracy}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-2.5 md:p-3 bg-success/10 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-foreground">Jogadas ótimas</span>
                <Badge variant="outline" className="bg-success text-success-foreground border-success text-xs">
                  {stats.best}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 md:p-3 bg-warning/10 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-foreground">Jogadas OK</span>
                <Badge variant="outline" className="bg-warning text-warning-foreground border-warning text-xs">
                  {stats.ok}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 md:p-3 bg-destructive/10 rounded-lg">
                <span className="text-xs md:text-sm font-medium text-foreground">Jogadas ruins</span>
                <Badge
                  variant="outline"
                  className="bg-destructive text-destructive-foreground border-destructive text-xs"
                >
                  {stats.bad}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-primary text-base md:text-lg">
              <Brain className="w-4 h-4 md:w-5 md:h-5" />
              Dicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 md:space-y-3 text-xs md:text-sm leading-relaxed text-foreground">
            <p>• Controle o centro (casa 5) sempre que possível</p>
            <p>• Bloqueie vitórias do oponente antes de atacar</p>
            <p>• Crie situações de "garfo" (duas ameaças simultâneas)</p>
            <p>• Use as quinas estrategicamente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
