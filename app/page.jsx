"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { QuoteIcon, Search, Sparkles } from "lucide-react"
import { Header } from "@/components/header"

// Predefined quotes organized by topics
const quotesData = {
  motivation: [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
  ],
  success: [
    {
      text: "Success is not the key to happiness. Happiness is the key to success.",
      author: "Albert Schweitzer",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
    {
      text: "Success is walking from failure to failure with no loss of enthusiasm.",
      author: "Winston Churchill",
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
  ],
  life: [
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
    },
    {
      text: "The purpose of our lives is to be happy.",
      author: "Dalai Lama",
    },
    {
      text: "Life is really simple, but we insist on making it complicated.",
      author: "Confucius",
    },
    {
      text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      author: "Martin Luther King Jr.",
    },
    {
      text: "Life is 10% what happens to you and 90% how you react to it.",
      author: "Charles R. Swindoll",
    },
  ],
  wisdom: [
    {
      text: "The only true wisdom is in knowing you know nothing.",
      author: "Socrates",
    },
    {
      text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
      author: "Bill Keane",
    },
    {
      text: "A wise man can learn more from a foolish question than a fool can learn from a wise answer.",
      author: "Bruce Lee",
    },
    {
      text: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
  ],
  love: [
    {
      text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
      author: "Lao Tzu",
    },
    {
      text: "The best thing to hold onto in life is each other.",
      author: "Audrey Hepburn",
    },
    {
      text: "Love is composed of a single soul inhabiting two bodies.",
      author: "Aristotle",
    },
    {
      text: "Where there is love there is life.",
      author: "Mahatma Gandhi",
    },
    {
      text: "Love all, trust a few, do wrong to none.",
      author: "William Shakespeare",
    },
  ],
  friendship: [
    {
      text: "A friend is someone who knows all about you and still loves you.",
      author: "Elbert Hubbard",
    },
    {
      text: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
      author: "C.S. Lewis",
    },
    {
      text: "A real friend is one who walks in when the rest of the world walks out.",
      author: "Walter Winchell",
    },
    {
      text: "Friendship is the only cement that will ever hold the world together.",
      author: "Woodrow Wilson",
    },
    {
      text: "True friendship comes when the silence between two people is comfortable.",
      author: "David Tyson",
    },
  ],
  creativity: [
    {
      text: "Creativity is intelligence having fun.",
      author: "Albert Einstein",
    },
    {
      text: "The creative adult is the child who survived.",
      author: "Ursula K. Le Guin",
    },
    {
      text: "Imagination is more important than knowledge.",
      author: "Albert Einstein",
    },
    {
      text: "You can't use up creativity. The more you use, the more you have.",
      author: "Maya Angelou",
    },
    {
      text: "Creativity takes courage.",
      author: "Henri Matisse",
    },
  ],
}

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("")
  const [quotes, setQuotes] = useState([])
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const availableTopics = Object.keys(quotesData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return

    setIsLoading(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const normalizedTopic = topic.toLowerCase().trim()
    let selectedQuotes = []

    // Find quotes for the exact topic match
    if (quotesData[normalizedTopic]) {
      const topicQuotes = quotesData[normalizedTopic]
      selectedQuotes = getRandomQuotes(topicQuotes, 3)
    } else {
      // Search for partial matches across all topics
      const allQuotes = []
      Object.entries(quotesData).forEach(([key, topicQuotes]) => {
        if (key.includes(normalizedTopic) || normalizedTopic.includes(key)) {
          allQuotes.push(...topicQuotes)
        }
      })

      if (allQuotes.length > 0) {
        selectedQuotes = getRandomQuotes(allQuotes, 3)
      } else {
        // If no matches found, show random quotes from motivation
        selectedQuotes = getRandomQuotes(quotesData.motivation, 3)
      }
    }

    setQuotes(selectedQuotes)
    setIsSearched(true)
    setIsLoading(false)
  }

  const getRandomQuotes = (quoteArray, count) => {
    const shuffled = [...quoteArray].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const handleTopicClick = (selectedTopic) => {
    setTopic(selectedTopic)
  }

  const getRandomQuote = () => {
    const allTopics = Object.keys(quotesData)
    const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)]
    setTopic(randomTopic)

    const topicQuotes = quotesData[randomTopic]
    const selectedQuotes = getRandomQuotes(topicQuotes, 3)
    setQuotes(selectedQuotes)
    setIsSearched(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 pt-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Discover Inspiration</span>
              </div>

              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Quote Generator
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover inspiring quotes on any topic. Enter a subject below and get three carefully selected quotes to
                motivate and inspire your journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={getRandomQuote} variant="outline" className="gap-2 bg-transparent">
                <Sparkles className="h-4 w-4" />
                Surprise Me
              </Button>
            </div>
          </div>

          {/* Search Form */}
          <Card className="mx-auto max-w-2xl shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Search className="h-6 w-6 text-indigo-600" />
                Find Quotes by Topic
              </CardTitle>
              <CardDescription className="text-base">
                Enter a topic like "motivation", "success", "life", or any subject you're interested in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base font-medium">
                    Topic or Subject
                  </Label>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="e.g., motivation, success, life, wisdom..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-lg h-12"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Generate Quotes
                    </>
                  )}
                </Button>
              </form>

              {/* Available Topics */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Popular Topics:</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((availableTopic) => (
                    <Badge
                      key={availableTopic}
                      variant="secondary"
                      className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-colors text-sm py-1 px-3"
                      onClick={() => handleTopicClick(availableTopic)}
                    >
                      {availableTopic}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quotes Display */}
          {isSearched && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Quotes about "{topic}"</h2>
                <p className="text-muted-foreground text-lg">Here are three inspiring quotes for you</p>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {quotes.map((quote, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <QuoteIcon className="h-8 w-8 text-indigo-400 opacity-60 group-hover:opacity-80 transition-opacity" />
                          <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            #{index + 1}
                          </div>
                        </div>

                        <blockquote className="text-lg font-medium text-foreground leading-relaxed">
                          "{quote.text}"
                        </blockquote>

                        <div className="flex items-center justify-end pt-4 border-t">
                          <cite className="text-base font-semibold text-indigo-600 dark:text-indigo-400 not-italic">
                            — {quote.author}
                          </cite>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {quotes.length === 0 && (
                <Card className="text-center p-12 shadow-lg">
                  <CardContent>
                    <div className="space-y-4">
                      <QuoteIcon className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                      <p className="text-lg text-muted-foreground">
                        No quotes found for "{topic}". Try a different topic or check out our popular topics above.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
