"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Stream, Subject } from "@/lib/types";
import { addNoteAction } from "@/lib/actions";

const noteFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  streamId: z.string().min(1, "Please select a stream"),
  subjectId: z.string().min(1, "Please select a subject"),
  category: z.string().min(1, "Category is required"),
  fileUrl: z.string().url("Must be a valid URL for the file"),
  fileType: z.enum(["pdf", "doc", "video"], {
    required_error: "You need to select a file type.",
  }),
});

type NoteFormProps = {
  streams: Stream[];
  subjects: Subject[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding Note..." : "Add Note"}
    </Button>
  );
}

export function NoteForm({ streams, subjects }: NoteFormProps) {
  const { toast } = useToast();
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      description: "",
      streamId: "",
      subjectId: "",
      category: "",
      fileUrl: "",
    },
  });

  const streamIdValue = form.watch("streamId");

  useEffect(() => {
    if (streamIdValue) {
      setFilteredSubjects(subjects.filter((s) => s.streamId === streamIdValue));
      form.setValue("subjectId", ""); // Reset subject when stream changes
    } else {
      setFilteredSubjects([]);
    }
  }, [streamIdValue, subjects, form]);

  const [state, formAction] = useFormState(addNoteAction, { message: "" });
  
  useEffect(() => {
    if(state.message){
        if(state.errors){
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: state.message,
            });
            form.reset();
        }
    }
  }, [state, toast, form])


  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Introduction to Thermodynamics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief summary of what the note contains."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="streamId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Stream</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a stream" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {streams.map((stream) => (
                        <SelectItem key={stream.id} value={stream.id}>
                        {stream.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!streamIdValue}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {filteredSubjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Introductory, Core Concepts" {...field} />
                </FormControl>
                <FormDescription>
                    A short category to classify the note.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="fileType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>File Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a file type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="doc">DOC</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/path/to/file.pdf" {...field} />
              </FormControl>
              <FormDescription>
                Direct link to the downloadable file (PDF, DOC, Video). For now, there is no file upload.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
