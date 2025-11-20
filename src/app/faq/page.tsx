import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumb from "@/components/layout/breadcrumb";
import { getBreadcrumbs } from "@/lib/data";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about NotesPlus.",
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

export default async function FAQPage() {
  const breadcrumbs = await getBreadcrumbs("page", "FAQ");

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} className="mb-6" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4">
          Frequently Asked Questions
        </h1>
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
  );
}
