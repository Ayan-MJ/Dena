import BaseLayout from "../components/BaseLayout";

export default function Home() {
  return (
    <BaseLayout>
      <div className="col-span-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Welcome to Denariq
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          One wallet, every currency, zero headaches.
        </p>
      </div>
    </BaseLayout>
  );
}
