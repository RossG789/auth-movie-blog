import { sql } from "@vercel/postgres";
import { auth, currentUser } from "@clerk/nextjs";

export default async function CommentList({ comments }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  // const clerkUser = await currentUser();
  // const userName = clerkUser.username;

  return (
    <div className="bg-slate-100 p-3 rounded-lg">
      <h1 className="text-base text-slate-600">See What Others Have Said</h1>
      {comments.map((comment) => (
        <div className="" key={comment.id}>
          <div>
            <p className="text-lg my-2">
              {comment.commentor_name} said:&quot;{comment.comment}&quot;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
