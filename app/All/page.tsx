import Link from "next/link";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { simplifiedProduct } from "@/app/interface";
import { client } from "@/lib/sanity";

async function getData() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
        _id,
          price,
        "name":title,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);

  return data;
}

export default async function page() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="dark:bg-black bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight dark:text-white text-gray-900">
            Products
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8  ">
          {data.map((product) => (
            <div
              key={product._id}
              className="group relative  rounded-xl dark:bg-[#0b0b0b] "
            >
              <div className="aspect-square  w-full overflow-hidden border rounded-xl shadow-sm shadow-gray-400 bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between px-2 py-3">
                <div>
                  <h3 className="text-sm dark:text-gray-300 text-700 pointer">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700  ">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
