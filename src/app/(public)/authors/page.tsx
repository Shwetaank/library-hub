import AuthorsClient, { type AuthorsPageViewModel } from "./AuthorsClient";
import { getAuthorsPageData } from "@/lib/discovery";

export const revalidate = 300;

export default async function AuthorsPage() {
  const data = await getAuthorsPageData();

  const authors = data.authors.map((author) => ({
    name: author.name,
    titles: author.titles,
    genres: author.genres,
    availableCopies: author.availableCopies,
    borrowCount: author.borrowCount,
    favoriteCount: author.favoriteCount,
    latestTitle: author.latestTitle,
    imageUrl: author.imageUrl,
    followers: author.followers,
    yearsActive: author.yearsActive,
  }));

  const spotlight = data.spotlight
    ? {
        name: data.spotlight.name,
        titles: data.spotlight.titles,
        genres: data.spotlight.genres,
        availableCopies: data.spotlight.availableCopies,
        borrowCount: data.spotlight.borrowCount,
        favoriteCount: data.spotlight.favoriteCount,
        latestTitle: data.spotlight.latestTitle,
        imageUrl: data.spotlight.imageUrl,
        followers: data.spotlight.followers,
        yearsActive: data.spotlight.yearsActive,
      }
    : null;

  const emerging = data.emerging.map((author) => ({
    name: author.name,
    titles: author.titles,
    genres: author.genres,
    availableCopies: author.availableCopies,
    borrowCount: author.borrowCount,
    favoriteCount: author.favoriteCount,
    latestTitle: author.latestTitle,
    imageUrl: author.imageUrl,
    followers: author.followers,
    yearsActive: author.yearsActive,
  }));

  const viewModel: AuthorsPageViewModel = {
    hero: data.hero,
    authors,
    spotlight,
    emerging,
  };

  return <AuthorsClient data={viewModel} />;
}
