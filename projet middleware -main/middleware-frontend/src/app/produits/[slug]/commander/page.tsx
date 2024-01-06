"use client";

import LoginModal from "@/components/LoginModal";
import { Product } from "@/utils/interfaces";
import Image from "next/image"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
    params: {
        slug: string
    }
}

export default function Product({ params }: Props) {
    const searchParams = useSearchParams();

    const commandeId = searchParams.get('commandeId');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    const [paid, setPaid] = useState<Boolean>(false);

    const [product, setProduct] = useState<Product>();

    const currentId = parseInt(params.slug, 0);

    const payCommande = (token: string) => {
        fetch(`http://${process.env.SERVICE_PAIEMENT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` || ""
            },
            body: JSON.stringify({
                idCommande: commandeId,
                montant: "100",
                numeroCarte: 1234567890
            })
        })
            .then(response => {
                if (response.status === 401) {
                    handleOpenModal();
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                setPaid(true);
            })
            .catch(error => console.error(error));
    }

    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleSignin = () => {
        fetch(`http://${process.env.SERVICE_PAIEMENT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: creds.username,
                password: creds.password,
            })
        })
            .then(response => {
                if (!response.ok) {
                    alert("Authentification échoué. Veuillez réessayer!")
                }
                return response.json()
            })
            .then(data=> {
                handleCloseModal();
                payCommande(data.token);
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
        const checkCommande = () => {
            fetch(`http://${process.env.SERVICE_COMMANDES}/${commandeId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.commandePayee) {
                        setPaid(true);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });

        }
        checkCommande();
    }, [currentId]);
    return product && (
        <div className="flex flex-col justify-center items-start w-full">
            <LoginModal isOpen={isModalOpen} creds={creds} handleCloseModal={handleCloseModal} handleSignin={handleSignin} handleChange={handleChange} />

            <Link href={"/"} className="flex justify-center items-center w-full my-12">
                <Image width={500} height={50} src={"/slogan.png"} alt="slogan" />
            </Link>

            <div className="flex flex-col justify-center items-center w-full">
                <Image className="w-[300px]" width={500} height={500} src={product.image} alt={product.title} />
                <div className="flex flex-col justify-center items-center gap-6 w-full my-2">
                    <h3 className="text-xl font-bold text-black text-center max-w-[350px]">{product.title}</h3>
                    <p className="text-base font-normal text-black text-center max-w-[350px]">{product.description}</p>
                    {!paid
                        ? <>
                            <p className="border border-black rounded-md p-2 text-base font-normal text-black text-center max-w-[350px]">
                                Ici l&apos;utilisateur sélectionne en temps normale un moyen de paiement et entre les informations de sa carte bancaire. Nous allons éviter d&apos;ajouter les formulaires nécessaires afin de garder l&apos;application la more basic et simple possible pour la suite. Si vous vous sentez à l&apos;aise, vous pouvez créer un formulaire pour accepter le numéro de la CB, que vous treaterez dans le contrôleur grâce à un PostMapping.
                            </p>
                            <button onClick={() => payCommande("")} className="text-xl font-medium text-center p-4 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">Payer Ma Commande</button>
                        </>
                        : <p className="text-2xl font-black text-green-600 text-center max-w-[350px]">Paiement Passé</p>
                    }
                </div>
            </div>
        </div>
    )
}