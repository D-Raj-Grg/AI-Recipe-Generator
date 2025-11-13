import type { Metadata } from "next"
import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Bug, Lightbulb, Github } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ChefMate team. Report bugs, suggest features, or ask questions about our AI recipe generator.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MainNav />

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              We&apos;d love to hear from you! Choose the best way to reach us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bug className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">Report a Bug</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Found something that isn&apos;t working? Let us know so we can fix it.
                  </p>
                  <a
                    href="https://github.com/D-Raj-Grg/AI-Recipe-Generator/issues/new?labels=bug&template=bug_report.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Submit Bug Report →
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">Feature Request</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Have an idea to make ChefMate better? We want to hear it!
                  </p>
                  <a
                    href="https://github.com/D-Raj-Grg/AI-Recipe-Generator/issues/new?labels=enhancement&template=feature_request.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Request Feature →
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">General Feedback</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Share your thoughts, suggestions, or just say hello!
                  </p>
                  <a
                    href="https://github.com/D-Raj-Grg/AI-Recipe-Generator/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Start Discussion →
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">Email Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Prefer email? Reach out for support or inquiries.
                  </p>
                  <a
                    href="mailto:support@chefmate.app"
                    className="text-primary hover:underline font-medium"
                  >
                    support@chefmate.app →
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-background rounded-lg">
                  <Github className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Open Source Project</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    ChefMate is open source! You can view the code, contribute, or fork the project on GitHub.
                  </p>
                  <a
                    href="https://github.com/D-Raj-Grg/AI-Recipe-Generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium text-sm"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> For questions about using ChefMate, check out our{" "}
                <a href="/faq" className="text-primary hover:underline">
                  FAQ page
                </a>{" "}
                first. You might find your answer there!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
