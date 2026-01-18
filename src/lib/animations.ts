// ============================================
// DXLR - Framer Motion Animation Variants
// ============================================

import { Variants } from 'framer-motion'

// Page Transitions
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

// Fade Up Animation
export const fadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 30
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Fade In Animation
export const fadeIn: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

// Scale In Animation
export const scaleIn: Variants = {
    initial: {
        scale: 0.95,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Stagger Container
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

// Stagger Item
export const staggerItem: Variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Slide In From Right
export const slideInRight: Variants = {
    initial: {
        x: '100%',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Slide In From Left
export const slideInLeft: Variants = {
    initial: {
        x: '-100%',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        x: '-100%',
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

// Slide Up
export const slideUp: Variants = {
    initial: {
        y: '100%'
    },
    animate: {
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        y: '100%',
        transition: {
            duration: 0.3
        }
    }
}

// Backdrop
export const backdrop: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
}

// Hover Scale (for buttons)
export const hoverScale = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
}

// Image Hover (for product cards)
export const imageHover = {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
}

// Card Hover
export const cardHover = {
    whileHover: {
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
}

// Text Reveal (for hero text)
export const textReveal: Variants = {
    initial: {
        y: '100%',
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Letter by Letter Animation Container
export const letterContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.03
        }
    }
}

// Letter Animation
export const letter: Variants = {
    initial: {
        opacity: 0,
        y: 50
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Accordion
export const accordion: Variants = {
    initial: {
        height: 0,
        opacity: 0
    },
    animate: {
        height: 'auto',
        opacity: 1,
        transition: {
            height: {
                duration: 0.3
            },
            opacity: {
                duration: 0.25,
                delay: 0.1
            }
        }
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            height: {
                duration: 0.3
            },
            opacity: {
                duration: 0.2
            }
        }
    }
}

// Notification Pop
export const notificationPop: Variants = {
    initial: {
        scale: 0.8,
        opacity: 0,
        y: -20
    },
    animate: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2
        }
    }
}

// Parallax variants for scroll
export const parallaxSlow = {
    y: [0, -50],
    transition: {
        y: {
            duration: 0.5,
            ease: 'linear'
        }
    }
}

export const parallaxFast = {
    y: [0, -100],
    transition: {
        y: {
            duration: 0.5,
            ease: 'linear'
        }
    }
}

// Button variants
export const buttonVariants: Variants = {
    initial: {
        scale: 1
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1
        }
    }
}

// Navbar scroll variant
export const navbarScroll: Variants = {
    top: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none'
    },
    scrolled: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
    }
}
