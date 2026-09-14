import Image from "next/image";

export function ProfilePhoto() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[240px] shrink-0 overflow-hidden rounded-md border border-border bg-muted lg:max-w-[280px] lg:mr-4">
      <Image
        src="/photos/profile.jpg"
        alt="윤대현"
        fill
        sizes="(min-width: 1024px) 280px, 240px"
        priority
        className="object-cover object-[50%_30%]"
      />
    </div>
  );
}
