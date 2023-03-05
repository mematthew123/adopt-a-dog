import Link from "next/link";

export default function Index() {
  return (
    <div className="bg-gray-50">
    
      {/* Hero section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-32 md:py-48">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
              Adopt a Furry Friend Today
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Looking for a new furry friend? We have a variety of dogs and cats
              available for adoption.
            </p>
            <div className="mt-8 flex items-center">
              <Link href="/dogs">
                <p className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Adopt a Dog
                </p>
              </Link>
              <Link href="/cats">
                <p className="ml-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Adopt a Cat
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2021 Adopt MT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
