'use client'

import { SessionProvider } from "next-auth/react"
import {FC, ReactNode} from 'react';
import { TranslationProvider } from "@/hooks/useTranslations"

interface ProviderProps{
    children: ReactNode;
}

const Provider: FC<ProviderProps> = ({children}) => {
    return (
        <SessionProvider>
            <TranslationProvider>
                {children}
            </TranslationProvider>
        </SessionProvider>
    )
}

export default Provider;