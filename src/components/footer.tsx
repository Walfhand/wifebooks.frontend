import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} WifeBooks. Tous droits réservés.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Accueil
          </Link>
          <Link
            href="/books"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Livres
          </Link>
          <Link
            href="/add-book"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ajouter un livre
          </Link>
        </div>
      </div>
    </footer>
  )
}
