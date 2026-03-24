import CatalogClient, { type CatalogPageViewModel } from "./CatalogClient";
import { getCatalogPageData } from "@/lib/discovery";

export const revalidate = 300;

type SearchParams = Promise<{ q?: string; genre?: string }>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = (await searchParams) ?? {};
  const data = await getCatalogPageData({
    query: params.q,
    genre: params.genre,
  });

  const books = data.books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    available: book.available,
    availabilityLabel: book.availabilityLabel,
    rating: book.rating,
    reviews: book.reviews,
    coverSrc: book.coverSrc,
  }));

  const viewModel: CatalogPageViewModel = {
    hero: data.hero,
    genres: data.genres,
    books,
    featuredBooks: books.slice(0, 3),
    availableBooks: books.filter((book) => book.available > 0).slice(0, 4),
    activeGenre: data.activeGenre,
    activeQuery: data.activeQuery,
  };

  return <CatalogClient data={viewModel} />;
}
