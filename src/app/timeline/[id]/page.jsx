import Link from "next/link";
import Image from "next/image";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import CommentField from "@/app/components/comments";

export default async function Page({ params }) {
  console.log(params);
  const [review] = (
    await sql`SELECT * FROM muvie_reviews WHERE id =${params.id}`
  ).rows;

  revalidatePath("/timeline/[id]", "page");

  return (
    <div className="">
      <h3>{review.username}&apos;s Review</h3>
      <h2>{review.movie}</h2>
      <h2>{review.release}</h2>
      <Image
        className="h-96 w-64 object-cover rounded-lg"
        src={review.imgurl}
        height={150}
        width={150}
        alt=""
      />
      <p className="">
        {review.username} said: &quot;{review.review}&quot;
      </p>

      {/* <CommentForm id={params.id} /> */}

      <CommentField id={params.id} />

      <Link href={`/timeline`} className="text-emerald-500">
        Back to the reviews
      </Link>
    </div>
  );
}
