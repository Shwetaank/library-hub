
export type Club = {
  id: string;
  name: string;
  description: string;
  category: string;
  privacy: "public" | "private";
  members: number;
  currentBook: {
    title: string;
    author: string;
    discussionDate: string;
  };
};

export const MOCK_CLUBS: Club[] = [
  {
    id: "1",
    name: "The Midnight Readers",
    description: "For those who find solace in the quiet hours of the night with a good book. We explore thrillers, mysteries, and dark fantasy.",
    category: "mystery",
    privacy: "public",
    members: 128,
    currentBook: {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      discussionDate: "2026-03-15",
    },
  },
  {
    id: "2",
    name: "Sci-Fi Voyagers",
    description: "Journey through distant galaxies, alternate realities, and speculative futures. Open to all fans of science fiction.",
    category: "sci-fi",
    privacy: "public",
    members: 256,
    currentBook: {
      title: "Dune",
      author: "Frank Herbert",
      discussionDate: "2026-03-20",
    },
  },
  {
    id: "3",
    name: "Romance Readers Society",
    description: "A cozy corner for fans of love stories. From historical romance to contemporary tales, we read it all.",
    category: "romance",
    privacy: "public",
    members: 89,
    currentBook: {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      discussionDate: "2026-03-22",
    },
  },
  {
    id: "4",
    name: "The Non-Fiction Guild",
    description: "Dedicated to exploring the world through facts, history, and real-life stories. Biographies, science, and more.",
    category: "non-fiction",
    privacy: "private",
    members: 42,
    currentBook: {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      discussionDate: "2026-04-01",
    },
  },
  {
    id: "5",
    name: "Classic Literature Club",
    description: "Revisiting the timeless classics and discussing their relevance in today's world. Join us for a journey through literary history.",
    category: "fiction",
    privacy: "public",
    members: 153,
    currentBook: {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      discussionDate: "2026-04-05",
    },
  },
  {
    id: "6",
    name: "Fantasy Fellowship",
    description: "A club for adventurers, dreamers, and lovers of magic. We delve into epic fantasies and magical realism.",
    category: "fiction",
    privacy: "private",
    members: 77,
    currentBook: {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      discussionDate: "2026-04-10",
    },
  },
];
