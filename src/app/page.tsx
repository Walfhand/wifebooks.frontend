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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-purple-500/5 z-0"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                    Découvrez une collection unique de livres
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Une bibliothèque numérique où chaque page raconte une histoire, chaque mot évoque une émotion.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/books">
                    <Button size="lg" className="w-full min-[400px]:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                      Explorer la collection
                    </Button>
                  </Link>
                  <Link href="/add-book">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto border-pink-500 text-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                      Ajouter un livre
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden aspect-square overflow-hidden rounded-xl bg-muted lg:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 rounded-xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
                  alt="Bibliothèque de livres"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background/95 to-muted/30 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmY5ZmIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48cGF0aCBkPSJNMTIgMTJ2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNiAwaDZ2NmgtNnYtNnptMTIgMGg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 z-0"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Livres en vedette</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez nos dernières publications et plongez dans des univers fascinants.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 mt-8">
              {books.map((book) => (
                <Card key={book.id} className="overflow-hidden border-border/40 bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
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
                      <Button variant="secondary" className="w-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 hover:from-pink-500/20 hover:to-purple-600/20 text-pink-500 border-pink-500/20 transition-all duration-300">
                        Voir plus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/books">
                <Button variant="outline" size="lg" className="border-pink-500 text-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                  Voir tous les livres
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-purple-500/5 z-0"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Partagez votre passion</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vous avez un livre à partager ? Ajoutez-le à notre collection et faites découvrir votre univers.
                </p>
              </div>
              <Link href="/add-book">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
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
