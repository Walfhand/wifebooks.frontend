import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <Link href="/books">
                <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent">
                  ← Retour aux livres
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
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

                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{book.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={book.fileUrl} target="_blank">
                    <Button size="lg" className="w-full sm:w-auto">
                      Télécharger le livre
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Partager
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold tracking-tighter">Vous pourriez aussi aimer</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {books
                  .filter((b) => b.id !== book.id)
                  .slice(0, 3)
                  .map((relatedBook) => (
                    <Link key={relatedBook.id} href={`/books/${relatedBook.id}`} className="group">
                      <div className="overflow-hidden rounded-xl border group-hover:border-primary/50 transition-colors">
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={relatedBook.coverImage}
                            alt={relatedBook.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold line-clamp-1">{relatedBook.title}</h3>
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
