import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Carousel from "@/components/Carousel";

async function getData(cateogry: string) {
  const query = `*[_type == "product" && category->name == "${cateogry}"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          "name":title,
          "slug": slug.current,
          "categoryName": category->name
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="bg-white dark:bg-black mt-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Products for {params.category}
          </h2>
        </div>
        {data.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="group relative ">
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.imageUrl}
                      alt="Product image"
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="mt-4 flex justify-between px-2 pb-1 ">
                    <div>
                      <h3 className="text-sm text-gray-700 dark:text-gray-200">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600  dark:text-[#5a5959]">
                        {product.categoryName}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900  dark:text-white">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-28 bg-white dark:bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#46d729]">Coming Soon</h1>

              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                We’re working hard to bring you something amazing!
              </p>
              <Link
                href="/"
                className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-[#46d729] rounded-xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
      <Carousel />
    </div>
  );
}
