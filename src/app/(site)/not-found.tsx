import Link from "next/link";

export const metadata = {
  title: "404: Not found",
  description: "Sorry, we couldn't find that.",
};

export default function Custom404() {
  return (
    <div className="px-5 py-16 flex flex-col items-center gap-y-6">
      <h1 className="text-7xl font-serif">
        Sorry, we couldn&rsquo;t find that.
      </h1>
      <p>
        <Link href="/" className="text-lg underline">
          Go back to home
        </Link>
      </p>
    </div>
  );
}
