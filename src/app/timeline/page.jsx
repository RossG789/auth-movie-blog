import { sql } from "@vercel/postgres";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function Page() {
  const clerkUser = await currentUser();
  const userName = clerkUser.username;

  const [userCheck] = (
    await sql`SELECT * FROM user_names WHERE user_name = ${userName};`
  ).rows;

  if (userCheck?.user_name !== userName) {
    await sql`INSERT INTO user_names (user_name) VALUES (${userName})`;
  }

  const reviews = await sql`
  SELECT muvie_reviews.* , movie_genres.genre_name, user_names.user_name FROM muvie_reviews

LEFT JOIN
  user_names ON muvie_reviews.reviewer = user_names.id
LEFT JOIN
  movie_genres ON muvie_reviews.muvie_genre = movie_genres.id;`;
  // console.log(reviews);

  revalidatePath("/timeline");

  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="text-xl">Reviews</p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {reviews.rows.map((review) => (
          <div
            className="col-span-1 flex flex-col items-center text-center"
            key={review.id}
          >
            <Image
              className="h-96 w-full object-cover bg-red-900 rounded-lg"
              src={review.img_url}
              height={150}
              width={150}
              alt=""
            />
            <h3 className="font-bold text-lg">{review.movie_name}</h3>
            <h3 className="font-thin">{review.release_date}</h3>
            <h3 className="font-thin">{review.genre_name}</h3>
            <h2 className="font-light">Submitted by: {review.user_name}</h2>

            <Link href={`/timeline/${review.id}`} className="text-emerald-500">
              Read Review
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
