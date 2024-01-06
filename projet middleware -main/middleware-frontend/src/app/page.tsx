"use client";

import Product from "@/components/Product";
import { Product as ProductInterface } from "@/utils/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchProducts = () => {
      fetch(`http://${process.env.SERVICE_PRODUITS}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setProducts(data)
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });

    }
    fetchProducts();
  }, [])
  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-center items-center w-full my-12">
        <Image width={500} height={50} src={"/slogan.png"} alt="slogan" />
      </div>

      <div className="flex justify-start items-center w-full my-12">
        <div className="grid grid-cols-3 w-full justify-items-center gap-8">
          {products.map((product) => {
            return (
              <Product key={product.id} id={product.id} title={product.title} image={product.image} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
