import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { genreFetcher } from "../utilities/genreGetter";
import Submit from "../components/buttons/submit";

export default async function Page() {
  let genres = await genreFetcher();

  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    redirect("/sign-in");
  }

  async function handleReview(formData) {
    "use server";

    const clerkUser = await currentUser();
    const userName = clerkUser.username;

    const movie = formData.get("movie");
    const release = formData.get("release");
    const imgUrl = formData.get("imgUrl");
    const review = formData.get("review");
    const [genres] = formData.getAll("genres");

    const [userCheck] = (
      await sql`SELECT * FROM user_names WHERE user_name = ${userName};`
    ).rows;

    await sql`INSERT INTO muvie_reviews (reviewer, movie_name, release_date, img_url, user_review, muvie_genre) VALUES (${userCheck.id}, ${movie}, ${release}, ${imgUrl}, ${review}, ${genres})`;

    redirect("/timeline");
  }

  return (
    <div>
      <div className="my-6 flex justify-center">
        <h2 className="text-xl">Add Your Review</h2>
      </div>
      <div className="flex justify-center">
        <div className="w-96 h-full flex justify-center bg-teal-700 rounded-lg">
          <form
            action={handleReview}
            className="w-80 flex flex-col justify-center p-3"
          >
            <label className="text-slate-200 mt-2 mb-2">Movie Name</label>
            <input
              className="px-1 rounded text-gray-700"
              name="movie"
              placeholder="Movie"
            />

            <label className="text-slate-200 mt-2 mb-2">Year Released</label>
            <input
              className="px-1 rounded text-gray-700"
              name="release"
              placeholder="eg. 2014"
            />

            <label className="text-slate-200 mt-2 mb-2">Image URL</label>
            <input
              className="px-1 rounded text-gray-700"
              name="imgUrl"
              placeholder="http:"
            />

            <label className="text-slate-200 mt-2 mb-2">Your Review</label>
            <input
              className="px-1 rounded text-gray-700"
              name="review"
              placeholder="Review"
            />

            <label
              htmlFor=" genres"
              className="rounded text-slate-200 mt-2 mb-2 "
            >
              Select genre:
            </label>

            <select className="text-gray-700 " name="genres" id="genres">
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.genre_name}
                </option>
              ))}
            </select>

            <Submit />
          </form>
        </div>
      </div>
    </div>
  );
}
