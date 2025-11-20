import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, User } from "lucide-react";
import Breadcrumb from "@/components/layout/breadcrumb";
import { getBreadcrumbs } from "@/lib/data";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the NotesPlus team.",
};

export default async function ContactPage() {
  const breadcrumbs = await getBreadcrumbs("page", "Contact Us");
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} className="mb-6" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          We'd love to hear from you. Whether you have a question, feedback, or a suggestion, please feel free to reach out.
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
            <CardDescription>We'll do our best to get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input id="name" placeholder="John Doe" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                 <div className="relative">
                   <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                   <Textarea id="message" placeholder="Your message..." className="pl-10 pt-2.5" rows={5} />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
