import { sql } from "@vercel/postgres";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function Page() {
  const reviews = await sql`
    SELECT * FROM muvie_reviews;`;

  revalidatePath("/timeline");

  return (
    <div>
      <div className="">
        <h1>Reviews</h1>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {reviews.rows.map((review) => (
          <div
            className="col-span-1 flex flex-col items-center text-center"
            key={review.id}
          >
            <Image
              className="h-96 w-full object-cover bg-red-900 rounded-lg"
              src={review.imgurl}
              height={150}
              width={150}
              alt=""
            />
            <h3 className="font-bold text-lg">{review.movie}</h3>
            <h3 className="font-thin">{review.release}</h3>
            <h2 className="font-light">Submitted by: {review.username}</h2>

            <Link href={`/timeline/${review.id}`} className="text-emerald-500">
              Read Review
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
