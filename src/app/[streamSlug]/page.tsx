import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStreamBySlug, getSubjectsByStream, getBreadcrumbs } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Breadcrumb from '@/components/layout/breadcrumb';
import { ArrowRight } from 'lucide-react';

type StreamPageProps = {
  params: {
    streamSlug: string;
  };
};

export async function generateMetadata({ params }: StreamPageProps) {
  const stream = await getStreamBySlug(params.streamSlug);
  if (!stream) {
    return { title: 'Stream Not Found' };
  }
  return {
    title: `${stream.name} Notes`,
    description: `Browse and download free study notes for all subjects in ${stream.name}.`,
  };
}

export default async function StreamPage({ params }: StreamPageProps) {
  const stream = await getStreamBySlug(params.streamSlug);
  if (!stream) {
    notFound();
  }

  const subjects = await getSubjectsByStream(stream.id);
  const breadcrumbs = await getBreadcrumbs('stream', params.streamSlug);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={breadcrumbs} className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">
        {stream.name}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {stream.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <Link href={`/${stream.slug}/${subject.slug}`} key={subject.id}>
            <Card className="h-full group hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{subject.name}</CardTitle>
                <CardDescription>{subject.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end items-center">
                  <span className="text-sm font-semibold text-primary group-hover:underline flex items-center">
                    View Notes <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
