export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string;
}

export const featuredBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "https://placehold.co/300x450/0070f3/white?text=The+Midnight+Library",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://placehold.co/300x450/ff4081/white?text=Project+Hail+Mary",
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the author of The Martian.",
    genre: "Sci-Fi",
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverImage: "https://placehold.co/300x450/f5a623/white?text=The+Silent+Patient",
    description: "A shocking psychological thriller of a woman’s act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
    genre: "Mystery",
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    coverImage: "https://placehold.co/300x450/22c55e/white?text=Educated",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    genre: "Non-Fiction",
  },
  {
    id: 5,
    title: "Circe",
    author: "Madeline Miller",
    coverImage: "https://placehold.co/300x450/8b5cf6/white?text=Circe",
    description: "A thrilling, feminist retelling of the Greek myth of Circe, the powerful witch who can turn men to beasts.",
    genre: "Fantasy",
  },
];