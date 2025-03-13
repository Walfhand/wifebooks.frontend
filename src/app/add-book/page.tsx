"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CherryBlossom } from "@/components/cherry-blossom";

export default function AddBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null as File | null,
    bookFile: null as File | null,
  });
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Créer une prévisualisation pour l'image de couverture
      if (name === "coverImage" && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverPreview(e.target?.result as string);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ici, vous implémenteriez la logique pour envoyer les données au backend
      // Par exemple, en utilisant FormData pour gérer les fichiers
      console.log("Données du formulaire:", formData);

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Réinitialiser le formulaire après la soumission
      setFormData({
        title: "",
        description: "",
        coverImage: null,
        bookFile: null,
      });
      setCoverPreview(null);

      // Afficher un message de succès (dans un cas réel, vous utiliseriez un toast ou une notification)
      alert("Livre ajouté avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre:", error);
      alert("Une erreur est survenue lors de l'ajout du livre.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <CherryBlossom />
      <Navbar />
      <main className="flex-1 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-purple-500/5 z-0"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="mx-auto max-w-2xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Ajouter un nouveau livre
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Partagez votre livre avec le monde. Remplissez le formulaire ci-dessous pour ajouter un nouveau livre à la collection.
              </p>
            </div>

            <Card className="border-border/40 bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Informations du livre</CardTitle>
                  <CardDescription>
                    Veuillez fournir les détails de votre livre.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Titre du livre <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Entrez le titre du livre"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Description <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Entrez une description du livre"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="coverImage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Image de couverture <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                      {coverPreview && (
                        <div className="mt-2 overflow-hidden rounded-md border border-border/40 bg-background/80 backdrop-blur-sm group">
                          <div className="relative aspect-[3/4] w-full">
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                              src={coverPreview}
                              alt="Prévisualisation de la couverture"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bookFile" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Fichier du livre <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="bookFile"
                        name="bookFile"
                        type="file"
                        accept=".pdf,.epub,.mobi"
                        required
                        onChange={handleFileChange}
                        className="border-pink-500/20 focus:border-pink-500 focus:ring-pink-500/20"
                      />
                      {formData.bookFile && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Fichier sélectionné: {formData.bookFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => window.history.back()}
                    className="border-pink-500 text-pink-500 hover:bg-pink-500/10 transition-all duration-300"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
                  >
                    {isSubmitting ? "Ajout en cours..." : "Ajouter le livre"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
