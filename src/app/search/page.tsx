import { Suspense } from 'react';
import { searchNotes } from '@/lib/data';
import NoteCard from '@/components/note-card';
import { Skeleton } from '@/components/ui/skeleton';

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

function SearchSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
          ))}
        </div>
    )
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchNotes(query);

  return (
    <>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No Results Found</h3>
          <p className="text-muted-foreground mt-2">
            {`We couldn't find any notes matching your search for "${query}".`}
          </p>
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || '';

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Search Results
        {query && <span className="text-primary">: "{query}"</span>}
      </h1>
      
      {query ? (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchResults query={query} />
        </Suspense>
      ) : (
        <p className="text-muted-foreground">Please enter a search term to find notes.</p>
      )}
    </div>
  );
}
