import { notFound } from 'next/navigation';
import { getNoteById, getBreadcrumbs, searchNotes } from '@/lib/data';
import Breadcrumb from '@/components/layout/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, Film, FileType2 } from 'lucide-react';
import type { Note } from '@/lib/types';
import Recommendations from '@/components/notes/recommendations';
import { getPopularNotes } from '@/lib/data';


export async function generateStaticParams() {
    // This is a temporary hack to get all notes to generate static paths.
    // In a real application, you might source this from a more direct query.
    const notes = await searchNotes(' ');
    return notes.map((note) => ({
      streamSlug: note.streamSlug || '',
      subjectSlug: note.subjectSlug || '',
      noteId: note.id,
    }));
}

type NotePageProps = {
  params: {
    noteId: string;
    streamSlug: string;
    subjectSlug: string;
  };
};

export async function generateMetadata({ params }: NotePageProps) {
  const note = await getNoteById(params.noteId);
  if (!note) {
    return { title: 'Note Not Found' };
  }
  return {
    title: note.title,
    description: note.description,
  };
}

const FileTypeIcon = ({ type, className }: { type: Note['fileType'], className?: string }) => {
  const baseClass = "mr-2 h-5 w-5";
  switch (type) {
    case 'pdf':
      return <FileText className={`${baseClass} ${className}`} />;
    case 'doc':
      return <FileType2 className={`${baseClass} ${className}`} />;
    case 'video':
      return <Film className={`${baseClass} ${className}`} />;
    default:
      return null;
  }
};

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNoteById(params.noteId);
  if (!note) {
    notFound();
  }

  const breadcrumbs = await getBreadcrumbs('note', params.noteId);
  const popularNotes = await getPopularNotes();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} className="mb-6" />
      
      <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Badge variant="secondary" className="mb-2">{note.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
              {note.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                <span>{note.streamName}</span>
                <span>&bull;</span>
                <span>{note.subjectName}</span>
            </div>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {note.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
                {note.tags.map(tag => (
                    <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="border rounded-lg p-4 sticky top-24">
                <h3 className="font-headline text-lg font-semibold mb-4">Download</h3>
                <Button className="w-full" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download {note.fileType.toUpperCase()}
                </Button>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className='flex items-center'>
                      <FileTypeIcon type={note.fileType} />
                      <span>File Type: {note.fileType.toUpperCase()}</span>
                    </div>
                    <span>{note.downloadCount.toLocaleString()} downloads</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Recommendations currentNote={note} popularNotes={popularNotes} />
    </div>
  );
}
