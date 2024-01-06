import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  title: string;
  image: string;
};

export default function Product({ id, title, image }: Props) {
  return (
    <Link href={"/produits/" + id}>
      <div className="flex flex-col justify-start items-center gap-4 w-full max-w-[350px]">
        <Image width={200} height={200} src={image} alt={title} />
        <h3 className="text-blue-500 underline">{title}</h3>
      </div>
    </Link>
  );
}
