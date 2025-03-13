import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">404</h1>
              <p className="text-xl text-muted-foreground">
                Page non trouvée
              </p>
              <p className="text-muted-foreground">
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
              </p>
            </div>
            <Link href="/">
              <Button>
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
