import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-brand mb-4 font-ivy">Page Not Found</h1>
        <p className="text-text-brand mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          href="/"
          className="inline-block bg-brand text-white px-6 py-3 rounded-md font-medium hover:bg-brand/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}