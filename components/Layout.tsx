import Footer from "./Footer";
import Header from "./Header";

export default function Layout ({ children  }: any) {
    return (
      <div className=" bg-gray-50 px-2 py-2 flex flex-col justify-center min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }