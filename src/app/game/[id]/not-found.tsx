import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Not Found</h1>
          <p className="text-gray-600 mb-8">
            The game you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition-colors"
          >
            Go Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

