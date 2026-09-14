import Image from "next/image";

export function ProfilePhoto() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[260px] shrink-0 overflow-hidden rounded-md border border-border bg-muted">
      <Image
        src="/photos/profile.jpg"
        alt="윤대현"
        fill
        sizes="260px"
        priority
        className="object-cover object-[50%_30%]"
      />
    </div>
  );
}
