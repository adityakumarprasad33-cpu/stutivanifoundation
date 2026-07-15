import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-2 text-3xl font-bold">404 - Page Not Found</h2>
      <p className="mb-6 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
