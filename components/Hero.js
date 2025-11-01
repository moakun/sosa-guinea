"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import {motion} from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import LanguageSwitcher from "./LanguageSwitcher";


const Hero = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const { t } = useTranslations();

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="about"
    >
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <ScrollAnimationWrapper>
          <motion.div
            className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            variants={scrollAnimation}>
            <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                {t('hero.title').split('Anti-Corruption')[0]}
                <strong>Anti-Corruption</strong>
                {t('hero.title').includes('Éthique') ? ' et ' : ' y '}
                <strong>{t('hero.title').includes('Éthique') ? 'Éthique des Affaires' : 'Ética Empresarial'}</strong>
              </h1>
              <p className="text-black-500 mt-4 mb-6">
                {t('hero.company')}
              </p>
              <Link href="/login">
                <ButtonPrimary>{t('hero.cta')}</ButtonPrimary>
              </Link>
              <p className="text-sm text-black mt-4">
                {t('hero.supportEmail')} <a href="mailto:developedbymoe@gmail.com" className="text-blue-500 underline">developedbymoe@gmail.com</a>
              </p>
              <p className="text-sm text-black mt-4">
                {t('hero.certificateEmail')} <a href="mailto:developedbymoe@gmail.com" className="text-blue-500 underline">developedbymoe@gmail.com</a>
              </p>
            </div>
            <div className="flex w-full">
              <motion.div className="h-full w-full" variants={scrollAnimation}>
                <Image
                  src="/assets/Illustration1.png"
                  alt="VPN Illustrasi"
                  quality={100}
                  width={612}
                  height={383}
                  layout="responsive"
                />
              </motion.div>
            </div>
          </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
       <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
       ></div>
      </div>
    </div>
  );
};

export default Hero;