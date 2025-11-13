"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  ChefHat,
  Sparkles,
  Clock,
  Heart,
  Leaf,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Check,
  Zap
} from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Get personalized recipes in seconds using advanced AI technology"
    },
    {
      icon: Leaf,
      title: "Dietary Preferences",
      description: "Supports 10+ dietary restrictions and preferences automatically"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "No more endless scrolling - instant recipes from what you have"
    },
    {
      icon: Heart,
      title: "Reduce Food Waste",
      description: "Use up ingredients before they expire with creative recipes"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Enter Ingredients",
      description: "Tell us what you have in your kitchen - any ingredients work"
    },
    {
      number: "02",
      title: "Set Preferences",
      description: "Choose cuisine, meal type, dietary restrictions, and cooking time"
    },
    {
      number: "03",
      title: "Generate & Cook",
      description: "Get 3-5 personalized recipes with step-by-step instructions"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Home Cook",
      content: "ChefMate has completely changed how I cook. I used to waste so much food, now I use everything!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Busy Professional",
      content: "As someone with limited time, this app is a lifesaver. I get amazing recipes in seconds.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Food Enthusiast",
      content: "The AI suggestions are surprisingly creative! I've discovered so many new favorite dishes.",
      rating: 5
    }
  ]

  const stats = [
    { value: "10K+", label: "Recipes Generated" },
    { value: "95%", label: "User Satisfaction" },
    { value: "30 sec", label: "Average Time" },
    { value: "13", label: "Cuisines Supported" }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-20 pb-28 md:pt-32 md:pb-40">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered Recipe Generator
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Transform Your Ingredients
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Into Delicious Meals
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Your AI kitchen companion that generates personalized recipes from ingredients you already have.
              No more food waste, no more meal planning stress.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all text-base px-8 py-6 h-auto"
                asChild
              >
                <Link href="/generate">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Start Cooking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 h-auto"
                asChild
              >
                <Link href="/explore">
                  Explore Recipes
                </Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Join 10,000+ home cooks</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="ml-2">4.9/5 rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Cook Better
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features designed to make cooking easier, faster, and more enjoyable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative overflow-hidden h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                    <CardContent className="pt-8 pb-6">
                      <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Ingredients to Meal in 3 Steps
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Simple, fast, and intuitive - start cooking in less than a minute
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8 pb-6 text-center">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-2xl font-bold text-white shadow-lg">
                        {step.number}
                      </div>
                      <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button size="lg" asChild>
                <Link href="/generate">
                  Try It Now - It&apos;s Free
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by Home Cooks Everywhere
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of happy cooks who have transformed their kitchens
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Start Cooking Smarter?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of home cooks who are reducing food waste and discovering amazing new recipes every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all text-base px-8 py-6 h-auto"
                  asChild
                >
                  <Link href="/generate">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Your First Recipe
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 h-auto"
                  asChild
                >
                  <Link href="/faq">
                    Learn More
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>100% Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Instant results</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
