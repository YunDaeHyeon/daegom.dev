import { redirect } from "next/navigation";
import { Editor } from "@/components/studio/editor";
import { koreaToday } from "@/lib/studio/dates";
import { getStudioUser } from "@/lib/studio/session";

export default async function NewPost() {
  if (!(await getStudioUser())) redirect("/studio");

  return <Editor mode="new" defaultDate={koreaToday()} />;
}
