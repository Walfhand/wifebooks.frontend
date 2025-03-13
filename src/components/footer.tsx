import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 font-semibold">WifeBooks</span>. Tous droits réservés.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-pink-500 relative group"
          >
            Accueil
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/books"
            className="text-sm text-muted-foreground transition-colors hover:text-pink-500 relative group"
          >
            Livres
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/add-book"
            className="text-sm text-muted-foreground transition-colors hover:text-pink-500 relative group"
          >
            Ajouter un livre
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
