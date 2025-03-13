import { Book } from "./types";

export const books: Book[] = [
  {
    id: "1",
    title: "Le Secret des Étoiles",
    description: "Un voyage mystique à travers les constellations qui révèle les secrets ancestraux de l'univers. Ce livre explore la connexion profonde entre l'humanité et le cosmos.",
    coverImage: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80&w=500&auto=format&fit=crop",
    fileUrl: "/files/book1.pdf",
    createdAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: "2",
    title: "Murmures de l'Aube",
    description: "Une collection de poèmes et de réflexions sur la beauté des premiers instants du jour. Chaque page est une invitation à redécouvrir la magie des matins et le potentiel de chaque nouveau jour.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500&auto=format&fit=crop",
    fileUrl: "/files/book2.pdf",
    createdAt: new Date(2023, 8, 22).toISOString(),
  },
  {
    id: "3",
    title: "L'Énigme du Temps",
    description: "Un roman captivant qui explore les paradoxes temporels et les mystères de l'existence. Suivez le protagoniste dans sa quête pour comprendre les mécanismes cachés qui gouvernent notre perception du temps.",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500&auto=format&fit=crop",
    fileUrl: "/files/book3.pdf",
    createdAt: new Date(2024, 1, 10).toISOString(),
  },
];
