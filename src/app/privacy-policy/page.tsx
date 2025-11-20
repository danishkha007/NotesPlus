import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Privacy Policy",
  description: "Read the privacy policy for NotesPlus.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
          Privacy Policy
        </h1>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Our Commitment to Your Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
                <p>
                    This Privacy Policy describes how NotesPlus ("we", "us", or "our") collects, uses, and discloses your information when you use our website.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">1. Information We Collect</h3>
                    <p>We may collect personal information that you provide to us, such as your name and email address when you register for an account. We also collect non-personal information, such as your browser type and IP address, to improve our services.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">2. How We Use Your Information</h3>
                    <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience. We do not sell your personal information to third parties.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">3. Cookies</h3>
                    <p>We use cookies to store information about your preferences and to personalize your experience. You can choose to disable cookies through your browser settings, but doing so may affect the functionality of the site.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">4. Security</h3>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">5. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>
                
                 <div className="pt-4 text-sm text-muted-foreground">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

            </CardContent>
        </Card>
      </div>
    </div>
  );
}