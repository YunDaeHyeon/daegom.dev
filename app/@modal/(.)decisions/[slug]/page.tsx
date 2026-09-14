import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { DecisionDetailContent } from "@/components/decision-detail-content";
import { decisions, workItems } from "@/lib/content";

export default async function DecisionModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decision = decisions.find((d) => d.slug === slug);
  if (!decision) notFound();

  const relatedWork = workItems.find((w) => w.slug === decision.relatedWork);

  return (
    <Modal>
      <DecisionDetailContent decision={decision} relatedWork={relatedWork} />
    </Modal>
  );
}
