"use client";

import { useState, useEffect } from "react";
import type { Note } from "@/lib/types";
import { aiPoweredRecommendations } from "@/ai/flows/ai-powered-recommendations";
import NoteCard from "@/components/note-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getNoteById } from "@/lib/data";

type RecommendationsProps = {
  currentNote: Note;
  popularNotes: Note[];
};

export default function Recommendations({ currentNote, popularNotes }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const result = await aiPoweredRecommendations({
          currentNoteTitle: currentNote.title,
          currentNoteDescription: currentNote.description,
          currentNoteCategory: currentNote.category,
          currentNoteStream: currentNote.streamName || '',
          currentNoteSubject: currentNote.subjectName || '',
          popularNotes: popularNotes.map(n => n.title),
        });

        if (result.recommendedNotes && result.recommendedNotes.length > 0) {
          // This is a mock-up of fetching full note details from a list of titles.
          // In a real app, you'd likely have a more efficient way to do this.
          const recommendedNoteDetails = (await Promise.all(
            result.recommendedNotes.map(title => 
              // A real implementation would query by title, here we simulate by finding in all notes
              getNoteById(
                // This is a hacky way to find a note by title for the mock data
                // In a real DB, you'd query: `db.notes.where('title', '==', title).get()`
                ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9'].find(id => {
                  const note = popularNotes.find(p => p.id === id) || currentNote.id === id ? currentNote : null;
                  return note?.title === title
                }) || ''
              )
            )
          )).filter((note): note is Note => note !== undefined);
          
          setRecommendations(recommendedNoteDetails);
        } else {
            setRecommendations([]);
        }

      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentNote, popularNotes]);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center md:text-left">
        Recommended For You
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8">No recommendations available at the moment.</p>
      )}
    </div>
  );
}
