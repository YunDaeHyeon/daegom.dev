import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { ProjectDetailContent } from "@/components/project-detail-content";
import { projectItems, decisions } from "@/lib/content";

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = projectItems.find((w) => w.slug === slug);
  if (!item) notFound();

  const related = decisions.filter((d) =>
    item.relatedDecisions?.includes(d.slug)
  );

  return (
    <Modal>
      <ProjectDetailContent item={item} related={related} />
    </Modal>
  );
}
