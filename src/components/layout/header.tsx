"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Menu, Search, User as UserIcon, X } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormEvent, useState } from "react";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from 'next/image';
import { useIsMobile } from "@/hooks/use-mobile";


const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="NotesPlus Home">
      <Image src="/logo.svg" alt="NotesPlus Logo" width={140} height={32} className="h-8 w-auto text-primary" />
    </Link>
  );

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const user = useUser();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      if(isMobile) setMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const NavMenu = ({ isMobileSheet = false }: { isMobileSheet?: boolean }) => (
    <nav className={`flex items-center gap-4 ${isMobileSheet ? 'flex-col space-y-4 text-lg mt-8' : 'hidden md:flex'}`}>
      {navLinks.map(link => (
        <Link 
          key={link.href} 
          href={link.href} 
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          onClick={() => isMobileSheet && setMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/20 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <NavMenu />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-full max-w-xs hidden sm:block">
            <form
              onSubmit={handleSearch}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search notes..."
                className="pl-10 w-full"
                defaultValue={searchParams.get("q") || ""}
              />
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
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
                  <DropdownMenuItem onClick={handleSignOut}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
            )}

            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full">
                  <div className="flex justify-between items-center">
                    <Logo />
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                       </Button>
                    </SheetClose>
                  </div>
                  <div className="mt-8">
                    <form onSubmit={handleSearch} className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input name="search" type="search" placeholder="Search notes..." className="pl-10 w-full" defaultValue={searchParams.get("q") || ""} />
                    </form>
                    <NavMenu isMobileSheet />
                    {!user && (
                      <Button asChild className="w-full mt-8">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          <LogIn className="mr-2 h-4 w-4" /> Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
