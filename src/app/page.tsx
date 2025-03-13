import Image from "next/image";
import Link from "next/link";
import { books } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Découvrez une collection unique de livres
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Une bibliothèque numérique où chaque page raconte une histoire, chaque mot évoque une émotion.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/books">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Explorer la collection
                    </Button>
                  </Link>
                  <Link href="/add-book">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Ajouter un livre
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden aspect-square overflow-hidden rounded-xl bg-muted lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
                  alt="Bibliothèque de livres"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Livres en vedette</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez nos dernières publications et plongez dans des univers fascinants.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 mt-8">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>
                      {new Date(book.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/books/${book.id}`} className="w-full">
                      <Button variant="secondary" className="w-full">
                        Voir plus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/books">
                <Button variant="outline" size="lg">
                  Voir tous les livres
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Partagez votre passion</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vous avez un livre à partager ? Ajoutez-le à notre collection et faites découvrir votre univers.
                </p>
              </div>
              <Link href="/add-book">
                <Button size="lg">
                  Ajouter un livre maintenant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
