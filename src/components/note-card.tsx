import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Note } from '@/lib/types';
import { Download, FileText, Film, FileType2 } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

type NoteCardProps = {
  note: Note;
};

const FileTypeIcon = ({ type }: { type: Note['fileType'] }) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-destructive" />;
    case 'doc':
      return <FileType2 className="h-5 w-5 text-blue-500" />;
    case 'video':
      return <Film className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

export default function NoteCard({ note }: NoteCardProps) {
  
  if (!note.streamSlug || !note.subjectSlug) {
    // In a real app, you might want to handle this case more gracefully
    return null;
  }

  const noteImage = placeholderImages.find(p => p.id === `note-${note.fileType}`) || placeholderImages.find(p => p.id === 'note-default');

  return (
    <Link href={`/${note.streamSlug}/${note.subjectSlug}/${note.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 hover:border-primary">
        <CardHeader>
           <div className="flex justify-between items-start">
             <CardTitle className="font-headline text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
                {note.title}
             </CardTitle>
             <FileTypeIcon type={note.fileType} />
           </div>
          <CardDescription className="line-clamp-2 text-sm">{note.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
           <div className="flex items-center text-xs text-muted-foreground">
              <Download className="w-3 h-3 mr-1" />
              {note.downloadCount.toLocaleString()} downloads
           </div>
        </CardContent>
        <CardFooter>
          <Badge variant="secondary">{note.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
