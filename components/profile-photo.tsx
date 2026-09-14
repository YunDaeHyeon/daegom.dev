import Image from "next/image";

export function ProfilePhoto() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[200px] shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:max-w-[220px]">
      <Image
        src="/photos/profile.jpg"
        alt="윤대현"
        fill
        sizes="220px"
        priority
        className="object-cover object-[50%_30%]"
      />
    </div>
  );
}
