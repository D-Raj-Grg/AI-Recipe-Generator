import type { Metadata } from "next"
import Link from "next/link"
import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Get answers to frequently asked questions about ChefMate AI Recipe Generator. Learn how to use our service effectively.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Frequently Asked Questions</CardTitle>
            <p className="text-muted-foreground">
              Find answers to common questions about ChefMate
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is ChefMate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  ChefMate is an AI-powered recipe generator that creates personalized recipes based on
                  the ingredients you have. Simply enter your ingredients, set your preferences (dietary
                  restrictions, cuisine type, difficulty), and our AI will generate custom recipes just
                  for you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How does ChefMate generate recipes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  ChefMate uses OpenAI&apos;s advanced language models to generate recipes. When you provide
                  ingredients and preferences, our AI analyzes them and creates complete recipes with
                  ingredients, step-by-step instructions, nutritional information, and cooking tips.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is ChefMate free to use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! ChefMate is currently free to use. We may implement rate limiting to ensure fair
                  usage across all users, but the core recipe generation service is free.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Are the nutritional values accurate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The nutritional information provided is an AI-generated estimate based on standard
                  ingredient nutritional values. While generally accurate, these should not be relied
                  upon for medical purposes. For precise nutritional requirements, consult with a
                  healthcare professional or registered dietitian.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Can I trust the recipes are safe for my allergies?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While ChefMate respects the dietary restrictions and excluded ingredients you specify,
                  you should always review the complete ingredient list carefully before cooking. If you
                  have severe allergies, double-check all ingredients and consult the original product
                  labels. ChefMate is a tool to assist you, not replace your judgment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  Where are my saved recipes stored?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Your saved recipes, history, and preferences are stored locally in your browser&apos;s
                  localStorage. This means they are only accessible on the device and browser you used
                  to save them. We never upload your personal recipes to our servers, ensuring complete
                  privacy. However, this also means clearing your browser data will delete your saved
                  recipes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  Can I access my recipes on different devices?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, recipes are stored locally per device/browser. We&apos;re considering adding
                  cloud sync in the future, but for now, you can use the print or share features to
                  transfer recipes between devices.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  How many recipes can I generate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To ensure fair usage, we implement rate limiting. You can generate approximately 15
                  recipes per hour. If you need more, wait a bit and try again. This helps us provide
                  a stable service for all users.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left">
                  Can I use ChefMate offline?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Recipe generation requires an internet connection as it uses AI processing. However,
                  once recipes are saved to your device, you can view them offline. We&apos;re exploring
                  PWA features to improve offline functionality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left">
                  What cuisines does ChefMate support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  ChefMate supports a wide variety of cuisines including Italian, Mexican, Chinese,
                  Japanese, Indian, Thai, French, Greek, Mediterranean, American, Korean, and Vietnamese.
                  You can also leave the cuisine unspecified for creative, fusion recipes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left">
                  Can I print recipes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Each recipe has a print button that opens a printer-friendly view. The print
                  layout removes navigation and unnecessary elements, optimized for standard A4 paper.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger className="text-left">
                  What&apos;s the &quot;Surprise Me&quot; feature?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The &quot;Surprise Me&quot; button randomly selects 3-5 common ingredients and a random cuisine,
                  then automatically generates recipes. It&apos;s perfect for when you want cooking inspiration
                  or are feeling adventurous!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13">
                <AccordionTrigger className="text-left">
                  How do I share recipes with friends?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Each recipe page has share buttons for Twitter, Facebook, and WhatsApp. You can also
                  copy the recipe link to share via any platform. On mobile devices, the native share
                  menu will appear.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-14">
                <AccordionTrigger className="text-left">
                  Can I adjust serving sizes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! On the recipe detail page, you&apos;ll find serving size controls that let you scale
                  the recipe from 0.5x to 3x the original servings. Ingredient quantities update
                  automatically.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-15">
                <AccordionTrigger className="text-left">
                  What if I don&apos;t like a generated recipe?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply generate new recipes! The AI creates unique recipes each time. Try adjusting
                  your ingredients, filters, or cuisine preferences to get different results. You can
                  generate multiple recipes and choose your favorite.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-16">
                <AccordionTrigger className="text-left">
                  Is my data private and secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Your saved recipes and preferences are stored only on your device, not our servers.
                  When generating recipes, only your ingredient list and preferences are sent to OpenAI&apos;s
                  API temporarily. We never permanently store your recipe data. Read our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-17">
                <AccordionTrigger className="text-left">
                  Can I suggest features or report bugs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! We welcome feedback. Please visit our{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact page
                  </Link>{" "}
                  to send us your suggestions, bug reports, or general feedback.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground">
                If you couldn&apos;t find the answer you&apos;re looking for,{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>{" "}
                and we&apos;ll be happy to help!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
