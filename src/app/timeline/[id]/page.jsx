import Link from "next/link";
import Image from "next/image";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import CommentList from "@/app/components/comments";
import CommentForm from "@/app/components/comment-field";

export default async function Page({ params }) {
  const review = (
    await sql`
    SELECT muvie_reviews.* , muvie_comments.*, reviewer_names.user_name AS reviewer_name, commentor_names.user_name AS commentor_name 
  
    FROM muvie_reviews

    LEFT JOIN 
    muvie_comments on muvie_comments.review_id = muvie_reviews.id


    LEFT JOIN user_names AS reviewer_names ON muvie_reviews.reviewer = reviewer_names.id
    LEFT JOIN user_names AS commentor_names ON muvie_comments.commentor = commentor_names.id


    WHERE muvie_reviews.id =${params.id}`
  ).rows;

  console.log(review);

  const reviewData = review[0];

  //     await sql`SELECT * FROM muvie_reviews WHERE id =${params.id}`
  //   ).rows;

  //   console.log(review);
  revalidatePath("/timeline/[id]", "page");

  return (
    <div className="w-full text-center p-8 text-2xl flex flex-col items-center">
      <h3>{reviewData.reviewer_name}&apos;s Review</h3>
      <h2>{reviewData.movie_name}</h2>
      <h2>{reviewData.release_date}</h2>
      <Image
        className="h-96 w-64 object-cover rounded-lg"
        src={reviewData.img_url}
        height={150}
        width={150}
        alt=""
      />
      <p className="overflow-auto mt-6 p-2 w-96 h-20 text-start text-base bg-emerald-600 rounded-lg">
        {reviewData.reviewer_name} said: &quot;{reviewData.user_review}&quot;
      </p>

      <CommentForm id={params.id} />

      <CommentList comments={review} />

      <Link href={`/timeline`} className="text-emerald-500 text-base">
        Back to the reviews
      </Link>
    </div>
  );
}
