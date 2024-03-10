import Submit from "./buttons/submit";
import { auth, currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export default function CommentForm({ id }) {
  async function handleComment(formData) {
    "use server";

    const clerkUser = await currentUser();
    const userName = clerkUser.username;

    const [userCheck] = (
      await sql`SELECT * FROM user_names WHERE user_name = ${userName};`
    ).rows;

    const comment = formData.get("comment");

    const commentResult = (
      await sql`INSERT INTO muvie_comments (commentor, comment, review_id) VALUES (${userCheck.id}, ${comment}, ${id})`
    ).rows;

    redirect(`/timeline/${id}`);
  }

  return (
    <div className="">
      <form action={handleComment} className="flex flex-col mt-6 items-center">
        <label className="text-base">Leave Comment</label>
        <input
          className="h-12 text-base text-gray-700 bg-gray-200 rounded-lg"
          name="comment"
          placeholder="Leave A Comment"
        />

        <Submit />
      </form>
    </div>
  );
}
