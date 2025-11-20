import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Breadcrumb from "@/components/layout/breadcrumb";
import { getBreadcrumbs } from "@/lib/data";


const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 12.12C34.553 8.243 29.626 6 24 6C12.955 6 4 14.955 4 26s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.804 12.12C34.553 8.243 29.626 6 24 6C16.312 6 9.61 10.339 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 46c5.626 0 10.553-1.757 14.498-4.818l-6.571-4.819C29.655 39.108 25.349 42 20 42c-5.221 0-9.664-2.438-12.24-6.014l-6.522 5.027C5.396 39.469 13.987 46 24 46z"/>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.16-4.087 5.571l6.571 4.819C45.272 34.623 48 29.435 48 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);


export default async function LoginPage() {
    const breadcrumbs = await getBreadcrumbs("page", "Login");
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumb items={breadcrumbs} className="mb-6" />
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Welcome to NotesPlus</CardTitle>
                <CardDescription>Sign in to download notes and more.</CardDescription>
                </CardHeader>
                <CardContent>
                <Button className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300">
                    <GoogleIcon />
                    Sign in with Google
                </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
