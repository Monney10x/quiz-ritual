"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const questions = [
  {
    question:
      "According to the source material, what is the primary concern when using AI agents for on-chain activities involving real money?",
    options: [
      "The cost of running the AI model.",
      "The speed of the AI's response.",
      "Whether the AI can be trusted.",
      "The complexity of the AI's code.",
    ],
    correct: 2,
  },
  {
    question: "Which rule do blockchains follow to build trust, as described in the text?",
    options: [
      "Same input leads to the same output with proof.",
      "Different inputs eventually lead to a single consensus.",
      "Outputs are based on the context of the user.",
      "The fastest output is always accepted as the truth.",
    ],
    correct: 0,
  },
  {
    question: "How does the text characterize the way current AI models provide answers?",
    options: [
      "Random and unpredictable.",
      "Fixed and unchangeable.",
      "Deterministic and absolute.",
      "Probabilistic and context-based.",
    ],
    correct: 3,
  },
  {
    question: "What is the current problem with how smart contracts interact with AI APIs today?",
    options: [
      "The APIs are too slow for blockchain transactions.",
      "The contract accepts answers without verification.",
      "Smart contracts cannot read API data.",
      "AI APIs are too expensive for small contracts.",
    ],
    correct: 1,
  },
  {
    question: "How does the text describe 'Web2 automation with a wallet attached'?",
    options: [
      "The final goal of Ritual's technology.",
      "Centralized AI that requires blind trust.",
      "A more secure version of smart contracts.",
      "A decentralized way to run AI.",
    ],
    correct: 1,
  },
]

type Screen = "start" | "quiz" | "result"

export default function QuizRitual() {
  const [screen, setScreen] = useState<Screen>("start")
  const [username, setUsername] = useState("")
  const [xid, setXid] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const startQuiz = () => {
    if (!username.trim() || !xid.trim()) {
      alert("Please enter your name and X ID!")
      return
    }
    setScreen("quiz")
  }

  const selectOption = (index: number) => {
    if (showAnswer) return
    setSelectedOption(index)
  }

  const nextQuestion = () => {
    if (selectedOption === null) return

    setShowAnswer(true)
    const q = questions[currentQuestion]

    if (selectedOption === q.correct) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedOption(null)
        setShowAnswer(false)
      } else {
        setScreen("result")
      }
    }, 1000)
  }

  const shareOnX = () => {
    const text = `I scored ${score}/${questions.length} on Quiz Ritual! Can you beat my score? ${xid}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedOption(null)
    setShowAnswer(false)
    setUsername("")
    setXid("")
    setScreen("start")
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const getResultMessage = () => {
    if (score === questions.length) {
      return `Excellent ${username}! Perfect Score!`
    } else if (score >= questions.length * 0.7) {
      return `Great job ${username}! Well done!`
    } else if (score >= questions.length * 0.5) {
      return `Good effort ${username}, keep practicing!`
    } else {
      return `${username}, try again for a better score!`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center p-5">
      <Card className="w-full max-w-[600px] bg-white/95 border-white/30 shadow-2xl relative">
        <a
          href="https://x.com/Moneyz0x"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105"
        >
          <img
            src="https://pbs.twimg.com/profile_images/2014273475226251264/jMmg_1Mo.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
          />
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>@Moneyz0x</span>
        </a>

        <CardContent className="p-10">
          <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-black via-neutral-500 to-black bg-clip-text text-transparent">
            Quiz Ritual
          </h1>

          {/* Start Screen */}
          {screen === "start" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-neutral-700 font-semibold">
                  Enter Your Name:
                </Label>
                <Input
                  id="username"
                  placeholder="e.g., John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-2 border-neutral-200 focus:border-black focus:ring-black/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="xid" className="text-neutral-700 font-semibold">
                  Enter Your X (Twitter) ID:
                </Label>
                <Input
                  id="xid"
                  placeholder="e.g., @john123"
                  value={xid}
                  onChange={(e) => setXid(e.target.value)}
                  className="border-2 border-neutral-200 focus:border-black focus:ring-black/30"
                />
              </div>
              <Button
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-black via-neutral-700 to-black text-white font-semibold py-6 hover:opacity-90 transition-all"
              >
                Start Quiz
              </Button>
            </div>
          )}

          {/* Quiz Screen */}
          {screen === "quiz" && (
            <div className="space-y-6">
              <Progress value={progress} className="h-2 bg-neutral-200" />
              <div className="space-y-5">
                <p className="text-sm font-bold text-black">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-lg font-semibold text-neutral-800 leading-relaxed">
                  {questions[currentQuestion].question}
                </p>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedOption === index
                    const isCorrect = index === questions[currentQuestion].correct
                    const showCorrect = showAnswer && isCorrect
                    const showWrong = showAnswer && isSelected && !isCorrect

                    return (
                      <div
                        key={index}
                        onClick={() => selectOption(index)}
                        className={cn(
                          "p-4 border-2 rounded-lg cursor-pointer transition-all text-sm",
                          !showAnswer && !isSelected && "border-neutral-200 bg-white hover:border-black hover:shadow-md",
                          !showAnswer && isSelected && "border-black bg-gradient-to-r from-black to-neutral-700 text-white",
                          showCorrect && "border-green-500 bg-green-500 text-white",
                          showWrong && "border-red-500 bg-red-500 text-white"
                        )}
                      >
                        {option}
                      </div>
                    )
                  })}
                </div>
              </div>
              <Button
                onClick={nextQuestion}
                disabled={selectedOption === null || showAnswer}
                className="w-full bg-gradient-to-r from-black via-neutral-700 to-black text-white font-semibold py-6 hover:opacity-90 transition-all disabled:opacity-50"
              >
                Next Question
              </Button>
            </div>
          )}

          {/* Result Screen */}
          {screen === "result" && (
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-black via-neutral-500 to-black bg-clip-text text-transparent mb-3">
                  {score} / {questions.length}
                </h2>
                <p className="text-lg text-neutral-600">{getResultMessage()}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={shareOnX}
                  className="flex-1 bg-black text-white font-semibold py-6 hover:bg-neutral-800 transition-all"
                >
                  Share on X
                </Button>
                <Button
                  onClick={restartQuiz}
                  variant="outline"
                  className="flex-1 border-2 border-neutral-300 text-neutral-700 font-semibold py-6 hover:bg-neutral-100 transition-all"
                >
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
