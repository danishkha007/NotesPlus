import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Terms of Service",
  description: "Read the terms of service for NotesPlus.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
          Terms of Service
        </h1>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Agreement to our Legal Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/80 leading-relaxed">
                <p>
                    Welcome to NotesPlus. These Terms of Service constitute a legally binding agreement made between you and NotesPlus concerning your access to and use of the website.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">1. Use of Our Service</h3>
                    <p>You agree to use our service for educational purposes only. You must not use our services for any illegal or unauthorized purpose. You are responsible for ensuring that your use of the services complies with all applicable laws and regulations.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">2. Intellectual Property</h3>
                    <p>The content provided on NotesPlus, including text, graphics, and logos, is the property of NotesPlus or its content suppliers and is protected by copyright laws. You may use the content for personal, non-commercial use only.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">3. Disclaimer of Warranties</h3>
                    <p>The service is provided on an "as is" and "as available" basis. NotesPlus makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.</p>
                </div>
                
                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">4. Limitation of Liability</h3>
                    <p>In no event shall NotesPlus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NotesPlus's website.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl font-semibold">5. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which NotesPlus operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
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