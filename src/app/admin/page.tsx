import { getStreams, getSubjects, getBreadcrumbs } from "@/lib/data";
import { NoteForm } from "@/components/admin/note-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/layout/breadcrumb";
import { getSubjectsByStream } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage notes and content for NotesPlus.",
};

export default async function AdminPage() {
  const streams = await getStreams();
  const allSubjects = await getSubjects();
  const breadcrumbs = await getBreadcrumbs("page", "Admin");

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <Breadcrumb items={breadcrumbs} className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome, Admin. Here you can manage the content of NotesPlus.
      </p>

      <Tabs defaultValue="add-note">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="add-note">Add New Note</TabsTrigger>
          <TabsTrigger value="manage-notes">Manage Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="add-note">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Create a New Note</CardTitle>
                    <CardDescription>Fill out the form below to add a new study note to the database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <NoteForm streams={streams} subjects={allSubjects} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="manage-notes">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Manage Existing Notes</CardTitle>
                    <CardDescription>Here you can edit or delete existing notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Note management functionality coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
