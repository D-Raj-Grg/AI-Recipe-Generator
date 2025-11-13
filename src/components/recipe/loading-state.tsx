"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

const COOKING_TIPS = [
  "🔪 Always keep your knives sharp for safer and easier cutting",
  "🧂 Season your food in layers for deeper flavor",
  "🌡️ Let meat rest after cooking to keep it juicy",
  "🥘 Taste as you cook and adjust seasoning",
  "🔥 Preheat your pan before adding ingredients",
  "🧊 Keep ingredients cold until ready to use",
  "📏 Mise en place: prep all ingredients before cooking",
  "🌿 Fresh herbs should be added at the end of cooking",
  "🥄 Use the right tool for the right job",
  "⏰ Don't rush: good cooking takes time",
  "🧈 Room temperature ingredients mix better",
  "🍳 Don't overcrowd the pan when searing",
  "🥗 Dress salads just before serving",
  "🍞 Stale bread makes the best croutons",
  "🧄 Remove the green germ from garlic to reduce bitterness"
]

export function LoadingState() {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % COOKING_TIPS.length)
    }, 4000) // Change tip every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-16">
      <Card className="max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          {/* Animated Chef Hat */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChefHat className="h-20 w-20 text-primary mx-auto" />
            </motion.div>

            {/* Sparkles */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-6 w-6 text-amber-500" />
            </motion.div>
          </div>

          {/* Loading Text */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Cooking Up Your Recipes...
            </h3>
            <p className="text-muted-foreground">
              Our AI chef is creating delicious recipes just for you
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Cooking Tips Carousel */}
          <div className="mt-8 min-h-[4rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-muted/50 rounded-lg p-4 max-w-md"
              >
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  💡 Chef&apos;s Tip
                </p>
                <p className="text-base">{COOKING_TIPS[currentTip]}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Loading Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
