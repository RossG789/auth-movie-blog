import { sql } from "@vercel/postgres";
import { auth, currentUser } from "@clerk/nextjs";

export default async function CommentField({ id }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const clerkUser = await currentUser();
  const userName = clerkUser.username;

  const comments =
    await sql`SELECT * FROM user_comments WHERE review_id =${id}`;

  return (
    <div>
      <h1 className="">See What Others Have Said</h1>
      {comments.rows.map((comment) => (
        <div className="" key={comment.id}>
          <div>
            <p>
              {userName} said:&quot;{comment.comment_content}&quot;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
