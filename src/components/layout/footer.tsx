import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-secondary">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NotesPlus Pro. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
