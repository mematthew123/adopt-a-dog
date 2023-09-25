import Footer from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Head>
        <title>Adopt MT</title>
        <meta property="og:title" content="Adopt MT" key="title" />
      </Head>
      <div className="bg-gray-50 h-[100vh]">
        {/* Hero section */}
        <section>
          <div className=" bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-32 md:py-48">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-700">
                Adopt a Furry Friend Today
              </h1>
              <p className="mt-5 text-xl text-gray-500">
                Looking for a new furry friend? We have a variety of dogs and
                cats available for adoption in western Montana.
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
      </div>
    </>
  );
}
