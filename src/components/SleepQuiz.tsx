import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Moon, Thermometer, Bed, ArrowRight } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  icon: React.ReactNode
  options: { value: string; label: string }[]
}

const questions: QuizQuestion[] = [
  {
    id: 'position',
    question: 'What is your primary sleep position?',
    icon: <Bed className="h-6 w-6" />,
    options: [
      { value: 'back', label: 'Back sleeper' },
      { value: 'side', label: 'Side sleeper' },
      { value: 'stomach', label: 'Stomach sleeper' },
      { value: 'combo', label: 'Combination sleeper' }
    ]
  },
  {
    id: 'temperature',
    question: 'How do you sleep temperature-wise?',
    icon: <Thermometer className="h-6 w-6" />,
    options: [
      { value: 'hot', label: 'I sleep hot' },
      { value: 'cold', label: 'I sleep cold' },
      { value: 'neutral', label: 'Just right' }
    ]
  },
  {
    id: 'concerns',
    question: 'What is your main sleep concern?',
    icon: <Moon className="h-6 w-6" />,
    options: [
      { value: 'pain', label: 'Neck/back pain' },
      { value: 'insomnia', label: 'Trouble falling asleep' },
      { value: 'comfort', label: 'General comfort' },
      { value: 'quality', label: 'Sleep quality' }
    ]
  }
]

interface Recommendations {
  title: string
  products: string[]
  description: string
}

const getRecommendations = (answers: Record<string, string>): Recommendations => {
  const recommendations: string[] = []
  let title = ''
  let description = ''

  // Temperature-based recommendations
  if (answers.temperature === 'hot') {
    recommendations.push('CoolBreeze Gel Pillow', 'Cooling Gel Mattress Topper')
    title = 'Stay Cool All Night'
    description = 'Based on your preference for cooler sleep, we recommend our cooling gel products.'
  } else if (answers.temperature === 'cold') {
    recommendations.push('Cloud Memory Foam Pillow', 'Weighted Therapy Blanket')
    title = 'Warm & Cozy Setup'
    description = 'For a warmer sleep experience, these products provide comfort and warmth.'
  } else {
    recommendations.push('Cloud Memory Foam Pillow', 'Premium Memory Foam Topper')
    title = 'Balanced Comfort'
    description = 'Perfect temperature regulation with our balanced product selection.'
  }

  // Position-based recommendations
  if (answers.position === 'side' || answers.position === 'back') {
    if (!recommendations.includes('Cervical Support Pillow')) {
      recommendations.push('Cervical Support Pillow')
    }
  }

  // Concern-based recommendations
  if (answers.concerns === 'pain') {
    if (!recommendations.includes('Cervical Support Pillow')) {
      recommendations.push('Cervical Support Pillow')
    }
    recommendations.push('Premium Memory Foam Topper')
  } else if (answers.concerns === 'insomnia') {
    recommendations.push('Melatonin Sleep Aid', 'Weighted Therapy Blanket')
  } else if (answers.concerns === 'quality') {
    recommendations.push('Natural Sleep Support Formula', 'Luxury Sleep Sheets Set')
  }

  return {
    title,
    products: [...new Set(recommendations)].slice(0, 4),
    description
  }
}

export const SleepQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const recommendations = showResults ? getRecommendations(answers) : null

  return (
    <section id="sleep-quiz" className="py-16 bg-gradient-dreamy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResults ? (
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {questions[currentQuestion].icon}
                  <CardTitle className="text-2xl">Sleep Setup Quiz</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-xl font-semibold">
                {questions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ''}
                onValueChange={handleAnswer}
              >
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-base"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                {recommendations?.title}
              </CardTitle>
              <p className="text-center text-muted-foreground text-lg">
                {recommendations?.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Recommended Products:</h4>
                <div className="grid gap-3">
                  {recommendations?.products.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <span className="font-medium">{product}</span>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Recommendations
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetQuiz}
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}