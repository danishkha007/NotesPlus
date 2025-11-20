"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, LogIn, Search, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormEvent } from "react";

// Mock user data, replace with actual auth logic
const user = null; // or { displayName: 'John Doe', email: 'john@example.com', role: 'admin' }

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-primary">
    <BookOpen className="h-7 w-7" />
    <span className="font-headline text-2xl font-bold">NotesPlus Pro</span>
  </Link>
);

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") || "";

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    if (query) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        name="q"
        defaultValue={defaultQuery}
        type="search"
        placeholder="Search for notes, subjects, streams..."
        className="w-full pl-10 pr-4 py-2"
        aria-label="Search"
      />
    </form>
  );
};


const UserNav = () => {
  if (!user) {
    return (
      <Button asChild variant="outline">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.displayName || ""} />
            <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="flex-1 flex justify-center px-4">
           <div className="hidden md:block w-full">
            <SearchBar />
           </div>
        </div>
        <UserNav />
      </div>
       <div className="md:hidden p-2 border-t">
          <SearchBar />
        </div>
    </header>
  );
}
