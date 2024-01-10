//@ts-nocheck

/**
 * @mockup_resource https://shotsnapp.com/
 * @mockup_resource https://mockuphone.com/device?type=ios#iphone13
 * https://mockupbro.com/mockup/standing-blu-ray-disk-with-cover-mockup
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Outline from "components/Outline";
import Accordion from "components/Accordion";
import heroImage from "public/assets/hero-image-2.png";
import laptopImage from "public/assets/hero-image.png";
import SchoolLogo1 from "public/assets/school-logo1.png";
import SchoolLogo2 from "public/assets/school-logo2.png";
import SchoolLogo3 from "public/assets/school-logo3.png";
import { ContainedButton, GhostButton } from "components/Button/Button";
import NewsLetterSubscription from "@/components/NewsLetterSubscription";
import AWSLogo from "public/assets/aws-logo.png";
export default function Home() {
  return (
    <>
      <Outline>
        <main>
          <section className='hero-section h-screen'>
            <div className='section-container'>
              <div className='left-division mt-10'>
                <h2 className='hero-section__title   nibpro_semi_bold'>SOCIAL MEDIA CAMPAIGN VISUALIZATION SYSTEM</h2>
                <p className='hero-section__description'>
                  <strong>In the digital era, social media platforms like Instagram, Facebook, LinkedIn, and Twitter have become immensely popular and widely used. </strong> However, with the vast reach of social media comes the responsibility of ensuring content accuracy and relevance before
                  sharing. To address this need, my academic project, "Social Media Campaign Visualization System," aims to assist users in reviewing and organizing their posts effectively. By promoting responsible and informed sharing, my system seeks to enhance the overall quality of information
                  on social media platforms
                </p>

                <Link href={"/login"}>
                  <ContainedButton className='mt-10 px-5'>Login</ContainedButton>
                </Link>
              </div>
              <div className='right-division'>
                <Image src={heroImage} alt='Hero Image' />
              </div>
            </div>
          </section>
        </main>
      </Outline>
    </>
  );
}
