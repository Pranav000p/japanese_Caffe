export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
} as const

export const inkReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as const },
  },
} as const

export const bloomIn = {
  initial: { opacity: 0, filter: 'brightness(4) blur(40px)' },
  animate: {
    opacity: 1,
    filter: 'brightness(1) blur(0px)',
    transition: { duration: 2.4, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(212,134,58,0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 40px rgba(212,134,58,0.3)',
    transition: { duration: 0.3 },
  },
} as const

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

