import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { WorkDetailContent } from "@/components/work-detail-content";
import { workItems, decisions } from "@/lib/content";

export default async function WorkModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);
  if (!item) notFound();

  const related = decisions.filter((d) =>
    item.relatedDecisions?.includes(d.slug)
  );

  return (
    <Modal>
      <WorkDetailContent item={item} related={related} />
    </Modal>
  );
}
