import Link from "next/link";
import { Arrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col items-center justify-center text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display text-5xl sm:text-7xl">
        This page has <em className="foil italic">left the stage</em>
      </h1>
      <Link href="/" className="btn mt-10">
        Back to home <Arrow />
      </Link>
    </section>
  );
}
