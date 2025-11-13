import type { Metadata } from "next"
import Link from "next/link"
import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ChefMate AI Recipe Generator. Learn how we protect your data and respect your privacy.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: November 13, 2025</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                ChefMate (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and safeguard information when you use our AI-powered recipe
                generation service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Information Stored Locally</h3>
              <p className="text-muted-foreground mb-3">
                ChefMate stores the following data <strong>locally in your browser</strong> using localStorage:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your saved/bookmarked recipes</li>
                <li>Your recipe generation history (last 20 recipes)</li>
                <li>Your preferences (dietary restrictions, theme, serving size)</li>
                <li>Ingredients you&apos;ve searched for</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong>Important:</strong> This data is stored only on your device and is never sent to our servers.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Information We Process</h3>
              <p className="text-muted-foreground mb-3">
                When you generate recipes, we process:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Ingredients you input</li>
                <li>Dietary restrictions and preferences you select</li>
                <li>Filters you apply (cuisine type, meal type, difficulty, etc.)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This information is sent to OpenAI&apos;s API to generate recipes and is not permanently stored by us.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-3">
                We may collect basic usage information through our hosting provider (Vercel), including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address (for rate limiting and abuse prevention)</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Generate personalized recipes based on your input</li>
                <li>Improve the quality and relevance of generated recipes</li>
                <li>Prevent abuse and enforce rate limiting</li>
                <li>Analyze usage patterns to improve the Service</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 OpenAI</h3>
              <p className="text-muted-foreground">
                We use OpenAI&apos;s API to generate recipes. When you request a recipe, your ingredients,
                preferences, and filters are sent to OpenAI. Please review{" "}
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OpenAI&apos;s Privacy Policy
                </a>{" "}
                for information about how they handle data.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Vercel (Hosting)</h3>
              <p className="text-muted-foreground">
                Our Service is hosted on Vercel, which may collect analytics data. Review{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>{" "}
                for more information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>
              <p className="text-muted-foreground mb-3">
                <strong>Local Storage:</strong> Your saved recipes, history, and preferences are stored in
                your browser&apos;s localStorage. This means:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Data persists across sessions on the same browser</li>
                <li>Data is specific to your browser and device</li>
                <li>Clearing browser data will delete your saved recipes</li>
                <li>We cannot access or recover your locally stored data</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong>Security:</strong> We implement reasonable security measures to protect data in
                transit using HTTPS encryption.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-3">
                ChefMate uses minimal cookies and tracking:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Essential cookies for theme preferences (dark/light mode)</li>
                <li>localStorage for saving recipes and history (not cookies)</li>
                <li>No third-party advertising or tracking cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Clear your locally stored data at any time through browser settings</li>
                <li>Delete your saved recipes and history through the{" "}
                  <Link href="/preferences" className="text-primary hover:underline">
                    Preferences page
                  </Link>
                </li>
                <li>Opt-out of analytics by using browser privacy settings or extensions</li>
                <li>Request information about data we may have collected (contact us)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                ChefMate is not directed to children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If you believe we have collected information
                from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be processed in the United States or other countries where our
                service providers operate. By using ChefMate, you consent to such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of significant
                changes by posting the new policy on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our privacy practices, please contact
                us at{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  our contact page
                </Link>.
              </p>
            </section>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Summary:</strong> ChefMate prioritizes your privacy. Your recipes and preferences
                are stored locally on your device, not on our servers. We only process ingredient data
                temporarily to generate recipes via OpenAI&apos;s API.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
