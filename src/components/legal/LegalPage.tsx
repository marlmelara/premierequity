import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="font-heading text-3xl font-semibold text-forest sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Last updated: {updated}</p>
          <div className="mt-10 space-y-6 leading-relaxed text-neutral-700 [&_a]:text-forest [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
