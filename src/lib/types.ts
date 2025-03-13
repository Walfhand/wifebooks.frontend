export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  fileUrl: string;
  createdAt: string;
}

export type BookFormData = Omit<Book, 'id' | 'createdAt'>;
