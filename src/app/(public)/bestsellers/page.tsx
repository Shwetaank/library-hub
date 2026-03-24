import BestsellersClient, {
  type BestsellersPageViewModel,
} from "./BestsellersClient";
import { getBestsellersPageData } from "@/lib/discovery";

export const revalidate = 300;

export default async function BestsellersPage() {
  const data = await getBestsellersPageData();

  const mapBook = (book: (typeof data.ranked)[number]) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    available: book.available,
    totalCopies: book.totalCopies,
    coverSrc: book.coverSrc,
    borrowCount: book.borrowCount,
    favoriteCount: book.favoriteCount,
    returnedCount: book.returnedCount,
    activeCount: book.activeCount,
    rating: book.rating,
    reviews: book.reviews,
    momentum: book.momentum,
  });

  const viewModel: BestsellersPageViewModel = {
    hero: data.hero,
    topThree: data.topThree.map(mapBook),
    ranked: data.ranked.map(mapBook),
    trending: data.trending.map(mapBook),
  };

  return <BestsellersClient data={viewModel} />;
}
