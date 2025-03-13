import Image from "next/image";
import Link from "next/link";
import { books } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CherryBlossom } from "@/components/cherry-blossom";

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <CherryBlossom />
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-purple-500/5 z-0"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  Tous les livres
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explorez notre collection complète de livres et découvrez de nouveaux univers.
                </p>
              </div>
              <div className="flex">
                <Link href="/add-book">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                    Ajouter un livre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden flex flex-col h-full border-border/40 bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 group">
                  <div className="aspect-[3/4] relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <CardDescription>
                      {new Date(book.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex w-full gap-2">
                      <Link href={`/books/${book.id}`} className="flex-1">
                        <Button variant="secondary" className="w-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 hover:from-pink-500/20 hover:to-purple-600/20 text-pink-500 border-pink-500/20 transition-all duration-300">
                          Détails
                        </Button>
                      </Link>
                      <Link href={book.fileUrl} className="flex-1" target="_blank">
                        <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                          Télécharger
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
