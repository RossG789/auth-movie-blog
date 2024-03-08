// import SubmitCommentBtn from "./submit-comment-btn";
// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";

// export default function CommentForm({ id }) {
//   async function handleComment(formData) {
//     "use server";

//     const comment = formData.get("comment");

//     const commentResult = (
//       await sql`INSERT INTO comments (comment_content, review_id) VALUES (${comment}, ${id})`
//     ).rows;

//     redirect(`/movie-reviews/${id}`);
//   }

//   console.log(id);

//   return (
//     <div className="">
//       <form action={handleComment} className="flex flex-col mt-6 items-center">
//         <label className="text-base">Leave Comment</label>
//         <input
//           className="h-12 text-base text-gray-700 bg-gray-200 rounded-lg"
//           name="comment"
//           placeholder="Leave A Comment"
//         />

//         <SubmitCommentBtn />
//       </form>
//     </div>
//   );
// }
