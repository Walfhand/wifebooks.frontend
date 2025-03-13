import Image from "next/image";
import Link from "next/link";
import { books } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tous les livres
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explorez notre collection complu00e8te de livres et du00e9couvrez de nouveaux univers.
                </p>
              </div>
              <div className="flex">
                <Link href="/add-book">
                  <Button>
                    Ajouter un livre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
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
                        <Button variant="secondary" className="w-full">
                          Du00e9tails
                        </Button>
                      </Link>
                      <Link href={book.fileUrl} className="flex-1" target="_blank">
                        <Button variant="outline" className="w-full">
                          Tu00e9lu00e9charger
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
