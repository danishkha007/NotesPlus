"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  streamId: z.string().min(1, "Please select a stream"),
  subjectId: z.string().min(1, "Please select a subject"),
  category: z.string().min(1, "Category is required"),
  fileUrl: z.string().url("Must be a valid URL"),
  fileType: z.enum(["pdf", "doc", "video"]),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    streamId?: string[];
    subjectId?: string[];
    category?: string[];
    fileUrl?: string[];
    fileType?: string[];
  };
};

export async function addNoteAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = noteSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Failed to create note. Please check the fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    // In a real application, you would save the data to your database (e.g., Firestore)
    console.log("Saving new note:", validatedFields.data);

    // And upload the file to storage if it's not a URL
    // For now, we assume fileUrl is a direct link

    revalidatePath("/admin");
    revalidatePath("/");
    
    return { message: "Successfully created note." };
  } catch (e) {
    return { message: "Failed to create note on the server." };
  }
}
