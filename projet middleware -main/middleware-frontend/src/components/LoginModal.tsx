import { useEffect, useRef, useState } from 'react';

type ModalProps = {
    isOpen: boolean;
    handleCloseModal: () => void;
    handleSignin: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    creds: {
        username: string,
        password: string
    }
}

export default function LoginModal({ isOpen, handleCloseModal, handleSignin, handleChange, creds }: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleCloseModal();
            }
        };

        if (isOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, handleCloseModal]);

    if (!isOpen) return null;
    return (
        <div className="flex justify-center items-center w-full h-full fixed top-0" ref={modalRef}>
            <div className="absolute w-full h-full bg-black opacity-20 z-40">
                <div className="w-screen h-screen"></div>
            </div>
            <div className="w-full max-w-xs z-50">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="Username" 
                            name='username'
                            value={creds.username}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password"
                            type="password"
                            placeholder="******************" 
                            name='password'
                            value={creds.password}
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleSignin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}