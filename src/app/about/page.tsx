import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Lightbulb, Users } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn more about NotesPlus and our mission.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">
          About NotesPlus
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Your partner in academic excellence.
        </p>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
              <BookCopy className="w-6 h-6 text-primary"/>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80 text-lg leading-relaxed">
            <p>
              At NotesPlus, we believe that access to high-quality educational resources should be a right, not a privilege. Our mission is to empower students everywhere by providing free, comprehensive, and well-organized study materials. We aim to break down financial barriers to education and create a level playing field for learners from all backgrounds.
            </p>
            <p>
              We are dedicated to curating a vast library of notes, guides, and practice materials across various streams of study, helping students to not only succeed in their exams but also to foster a deeper understanding of their subjects.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-xl">
                        <Lightbulb className="w-5 h-5 text-primary"/>
                        Our Vision
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                    <p>To become the most trusted and comprehensive free learning platform for students globally, fostering a community of knowledge sharing and academic growth.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-xl">
                        <Users className="w-5 h-5 text-primary"/>
                        Who We Are
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80">
                    <p>We are a passionate team of educators, students, and technology enthusiasts committed to making education accessible to all. We volunteer our time and expertise to build and maintain NotesPlus.</p>
                </CardContent>
            </Card>
        </div>

        <div className="text-center">
            <h2 className="text-2xl font-headline font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                NotesPlus is more than just a website; it's a community. We are constantly growing and evolving, and we welcome contributions from students and educators alike.
            </p>
        </div>

      </div>
    </div>
  );
}