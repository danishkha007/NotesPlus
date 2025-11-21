import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import './globals.css';
import { FirebaseProvider } from '@/firebase/provider';

export const metadata: Metadata = {
  title: {
    default: 'NotesPlus - Free Study Material for Students',
    template: '%s | NotesPlus',
  },
  description: 'NotesPlus offers free, high-quality study materials, notes, and resources for students across various streams like Engineering and Pharmacy. Boost your learning with our comprehensive and accessible educational content.',
  keywords: ['NotesPlus', 'free study material', 'student notes', 'engineering notes', 'pharmacy notes'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <FirebaseProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseProvider>
      </body>
    </html>
  );
}