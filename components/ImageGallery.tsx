"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface ImageProps {
  _key: string;
  asset?: {
    _ref: string;
    _type: string;
  };
  _upload?: {
    progress: number;
    previewImage: string;
  };
}

interface iAppProps {
  images: ImageProps[];
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: ImageProps) => {
    setBigImage(image);
  };

  const getImageSrc = (image: ImageProps) => {
    if (image.asset) {
      return urlFor(image).url();
    } else if (image._upload?.previewImage) {
      return image._upload.previewImage;
    }
    return ""; // In case neither URL nor previewImage is available
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col ">
        {images.map((image, idx) => (
          <div
            key={image._key || idx}
            className="overflow-hidden bg-gray-100 dark:bg-black rounded-xl"
          >
            <Image
              src={getImageSrc(image)}
              width={200}
              height={200}
              alt={`Image ${idx}`}
              className="h-full w-full object-cover object-center cursor-pointer "
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-black lg:col-span-4">
        <Image
          src={getImageSrc(bigImage)}
          alt="Big image"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
