import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPopularNotes, getStreams } from '@/lib/data';
import NoteCard from '@/components/note-card';
import { placeholderImages } from '@/lib/placeholder-images';

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
            Welcome to NotesPlus Pro. Your one-stop destination for high-quality, free study notes and resources.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#streams">Browse Notes</Link>
          </Button>
        </div>
      </section>

      <section id="streams" className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Explore by Stream
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {streams.map((stream) => (
              <Link href={`/${stream.slug}`} key={stream.id}>
                <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="font-headline">{stream.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{stream.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-secondary">
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
    </div>
  );
}
