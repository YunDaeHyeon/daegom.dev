import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { DecisionDetailContent } from "@/components/decision-detail-content";
import { decisions, projectItems } from "@/lib/content";

export default async function DecisionModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decision = decisions.find((d) => d.slug === slug);
  if (!decision) notFound();

  const relatedProject = projectItems.find((w) => w.slug === decision.relatedProject);

  return (
    <Modal>
      <DecisionDetailContent decision={decision} relatedProject={relatedProject} />
    </Modal>
  );
}
