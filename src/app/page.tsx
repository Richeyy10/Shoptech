import Banner from "@/components/banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/footer";
import HeaderSlider from "@/components/headerslider";
import HomeProduct from "@/components/homeproducts";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/newsletter";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProduct />
        <FeaturedProducts />
        <Banner />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
