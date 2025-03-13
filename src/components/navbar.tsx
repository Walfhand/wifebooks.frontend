import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">WifeBooks</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Accueil
            </Link>
            <Link
              href="/books"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Livres
            </Link>
            <Link
              href="/add-book"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Ajouter un livre
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="secondary" size="sm">
            Connexion
          </Button>
        </div>
      </div>
    </header>
  )
}
