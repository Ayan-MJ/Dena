import BaseLayout from "../components/BaseLayout";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <div className="col-span-12 min-h-screen flex items-center justify-center -mt-8">
        <div 
          className="text-center px-6 py-12 rounded-3xl w-full max-w-4xl"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2), transparent)'
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Budget without borders.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            One wallet, every currency, zero headaches.
          </p>
          <Link 
            href="/signup"
            className="inline-block bg-primary text-white rounded-2xl px-6 py-3 text-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Early Access
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
}
