'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const LenisProvider = dynamic(
  () => import("@/lib/lenis").then((mod) => mod.LenisProvider),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor"),
  { ssr: false }
);
const NoiseOverlay = dynamic(
  () => import("@/components/ui/NoiseOverlay"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress"),
  { ssr: false }
);
const Navbar = dynamic(
  () => import("@/components/layout/Navbar"),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer"),
  { ssr: false }
);

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LenisProvider>
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  )
}
