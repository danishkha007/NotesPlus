
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPopularNotes, getStreams } from '@/lib/data';
import NoteCard from '@/components/note-card';
import { placeholderImages } from '@/lib/placeholder-images';
import { HeartPulse, FlaskConical, Cog } from 'lucide-react';
import type { Stream } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const streamIcons: Record<string, React.ReactNode> = {
    'engineering': <Cog className="h-12 w-12 text-primary" />,
    'pharmacy': <FlaskConical className="h-12 w-12 text-primary" />,
    'medical': <HeartPulse className="h-12 w-12 text-primary" />,
};

const faqs = [
    {
        question: "Is NotesPlus completely free to use?",
        answer: "Yes, absolutely! All notes and study materials on NotesPlus are available for free. Our mission is to make educational resources accessible to everyone, without any cost."
    },
    {
        question: "Can I contribute my own study notes?",
        answer: "We are thrilled that you want to contribute! We are currently working on a system to allow users to upload and share their own notes. Please check back soon for updates on this feature."
    },
    {
        question: "How are the notes verified for quality?",
        answer: "Our team of subject matter experts and dedicated community members review the notes for accuracy, completeness, and clarity. While we strive for the highest quality, we also encourage users to report any issues they find."
    },
    {
        question: "What subjects and streams do you cover?",
        answer: "We started with a focus on Engineering, Pharmacy, and Medical streams. However, we are constantly expanding our library to include more subjects and fields of study. If you have a request for a specific stream, please let us know via our contact page."
    },
    {
        question: "Do I need an account to download notes?",
        answer: "While you can browse all the content without an account, creating a free account allows you to track your downloads, save your favorite notes, and get personalized recommendations. Signing up is quick and easy!"
    }
]

export default async function Home() {
  const streams = await getStreams();
  const popularNotes = await getPopularNotes();
  const heroImage = placeholderImages.find(p => p.id === 'hero-landing');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full relative">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            Free Study Material for Students
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
            Welcome to NotesPlus. Your one-stop destination for high-quality, free study notes and resources.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#streams">Browse Notes</Link>
          </Button>
        </div>
      </section>

      <section id="streams" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Explore by Stream
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find curated notes and materials for your specific field of study.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {streams.map((stream) => (
              <Link href={`/${stream.slug}`} key={stream.id} className="group">
                <Card className="h-full flex flex-col items-center text-center p-6 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
                  <CardHeader className="p-0 flex flex-col items-center">
                    <div className="mb-4 bg-primary/10 p-4 rounded-full flex items-center justify-center">
                        {streamIcons[stream.slug] || <Cog className="h-12 w-12 text-primary" />}
                    </div>
                    <CardTitle className="font-headline text-2xl">{stream.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2 flex-grow">
                    <p className="text-muted-foreground">{stream.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Popular Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
                Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12">
                Have questions? We've got answers.
                </p>

                <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </div>
      </section>
    </div>
  );
}
