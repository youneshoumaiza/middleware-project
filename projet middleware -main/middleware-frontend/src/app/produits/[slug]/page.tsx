"use client";

import { Product } from "@/utils/interfaces";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

type Props = {
    params: {
        slug: string
    }
}

export default function Product({ params }: Props) {
    const [product, setProduct] = useState<Product>();
    const router = useRouter();

    const currentId = parseInt(params.slug, 0);

    const handleCommande = () => {
        fetch(`http://${process.env.SERVICE_COMMANDES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: currentId,
                dateCommande: Date.now(),
                quantite: "13",
                commandePayee: false,
            })
        })
            .then(response => response.json())
            .then(data => {
                router.push("/produits/" + currentId + "/commander?commandeId=" + data._id);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchProducts = () => {
            fetch(`http://${process.env.SERVICE_PRODUITS}/${currentId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setProduct({
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        image: data.image
                    })
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });

        }
        fetchProducts();
    }, [currentId])
    return product && (
        <div className="flex flex-col justify-center items-start w-full">
            <Link href={"/"} className="flex justify-center items-center w-full my-12">
                <Image width={500} height={50} src={"/slogan.png"} alt="slogan" />
            </Link>

            <div className="flex flex-col justify-center items-center w-full">
                <Image className="w-[300px]" width={500} height={500} src={product.image} alt={product.title} />
                <div className="flex flex-col justify-center items-center gap-6 w-full my-2">
                    <h3 className="text-xl font-bold text-black text-center max-w-[350px]">{product.title}</h3>
                    <p className="text-base font-normal text-black text-center max-w-[350px]">{product.description}</p>
                    <button onClick={handleCommande} className="text-xl font-medium text-center p-4 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">Commander</button>
                </div>
            </div>
        </div>
    )
}