import { notFound } from 'next/navigation';
import { getSubjectBySlug, getNotesBySubject, getBreadcrumbs, getStreamBySlug } from '@/lib/data';
import NoteCard from '@/components/note-card';
import Breadcrumb from '@/components/layout/breadcrumb';

type SubjectPageProps = {
  params: {
    streamSlug: string;
    subjectSlug: string;
  };
};

export async function generateMetadata({ params }: SubjectPageProps) {
  const subject = await getSubjectBySlug(params.subjectSlug);
  if (!subject) {
    return { title: 'Subject Not Found' };
  }
  const stream = await getStreamBySlug(params.streamSlug);
  return {
    title: `${subject.name} Notes | ${stream?.name}`,
    description: `Download free study notes for ${subject.name} in the ${stream?.name} stream.`,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const stream = await getStreamBySlug(params.streamSlug);
  const subject = await getSubjectBySlug(params.subjectSlug);

  if (!subject || !stream || subject.streamId !== stream.id) {
    notFound();
  }

  const notes = await getNotesBySubject(subject.id);
  const breadcrumbs = await getBreadcrumbs('subject', params.subjectSlug);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
        {subject.name} Notes
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {`Browse all available materials for ${subject.name}.`}
      </p>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={{...note, streamSlug: stream.slug, subjectSlug: subject.slug}} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No Notes Yet</h3>
          <p className="text-muted-foreground mt-2">
            Check back soon for new materials in this subject.
          </p>
        </div>
      )}
    </div>
  );
}
