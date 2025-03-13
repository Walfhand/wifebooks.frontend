import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CherryBlossom } from "@/components/cherry-blossom";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = books.find((book) => book.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CherryBlossom />
      <Navbar />
      <main className="flex-1 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-purple-500/5 z-0"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <Link href="/books">
                <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-pink-500 hover:text-pink-600 transition-colors">
                  ← Retour aux livres
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm group">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                    {book.title}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Ajouté le {new Date(book.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <Card className="border-border/40 bg-background/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{book.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={book.fileUrl} target="_blank">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                      Télécharger le livre
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-pink-500 text-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                    Partager
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Vous pourriez aussi aimer
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books
                  .filter((b) => b.id !== book.id)
                  .slice(0, 3)
                  .map((relatedBook) => (
                    <Link key={relatedBook.id} href={`/books/${relatedBook.id}`} className="group">
                      <div className="overflow-hidden rounded-xl border border-border/40 bg-background/80 backdrop-blur-sm group-hover:border-pink-500/50 transition-colors">
                        <div className="aspect-[3/4] relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Image
                            src={relatedBook.coverImage}
                            alt={relatedBook.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1 group-hover:text-pink-500 transition-colors">{relatedBook.title}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
