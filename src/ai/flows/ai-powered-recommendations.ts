'use server';

/**
 * @fileOverview AI-powered note recommendation flow.
 *
 * This file defines a Genkit flow that suggests relevant notes based on the currently viewed note and popular downloads.
 *
 * @interface AIPoweredRecommendationsInput - The input type for the aiPoweredRecommendations function.
 * @interface AIPoweredRecommendationsOutput - The output type for the aiPoweredRecommendations function.
 * @function aiPoweredRecommendations - A function that takes note details and returns a list of recommended notes.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredRecommendationsInputSchema = z.object({
  currentNoteTitle: z.string().describe('The title of the currently viewed note.'),
  currentNoteDescription: z.string().describe('The description of the currently viewed note.'),
  currentNoteCategory: z.string().describe('The category of the currently viewed note.'),
  currentNoteStream: z.string().describe('The stream of the currently viewed note.'),
  currentNoteSubject: z.string().describe('The subject of the currently viewed note.'),
  popularNotes: z.array(z.string()).describe('A list of titles of the most popular notes.'),
});
export type AIPoweredRecommendationsInput = z.infer<typeof AIPoweredRecommendationsInputSchema>;

const AIPoweredRecommendationsOutputSchema = z.object({
  recommendedNotes: z.array(z.string()).describe('A list of recommended note titles.'),
});
export type AIPoweredRecommendationsOutput = z.infer<typeof AIPoweredRecommendationsOutputSchema>;

export async function aiPoweredRecommendations(input: AIPoweredRecommendationsInput): Promise<AIPoweredRecommendationsOutput> {
  return aiPoweredRecommendationsFlow(input);
}

const recommendNotesPrompt = ai.definePrompt({
  name: 'recommendNotesPrompt',
  input: {schema: AIPoweredRecommendationsInputSchema},
  output: {schema: AIPoweredRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to recommend relevant study notes to students.

  Given the details of the note a student is currently viewing and a list of popular notes, suggest other notes that the student might find helpful.

  Consider the title, description, category, stream, and subject of the current note.
  Also, consider the popularity of other notes.

  Current Note Title: {{{currentNoteTitle}}}
  Current Note Description: {{{currentNoteDescription}}}
  Current Note Category: {{{currentNoteCategory}}}
  Current Note Stream: {{{currentNoteStream}}}
  Current Note Subject: {{{currentNoteSubject}}}
  Popular Notes: {{#each popularNotes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Recommend notes that are similar in content, category, stream, or subject to the current note, or that are popular among other students.
  Do not recommend the current note.
  Format your response as a list of note titles.
  `,
});

const aiPoweredRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredRecommendationsFlow',
    inputSchema: AIPoweredRecommendationsInputSchema,
    outputSchema: AIPoweredRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await recommendNotesPrompt(input);
    return output!;
  }
);
