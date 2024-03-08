import { sql } from "@vercel/postgres";

export async function genreFetcher() {
  const genres = (await sql`SELECT * from movie_genres`).rows;
  return genres;
}
