import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-white font-extrabold text-xl tracking-normal transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-['Outfit',sans-serif]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#dc0c6a] to-[#ff518e]",
        primary: "bg-gradient-to-r from-[#dc0c6a] to-[#ff518e]",
        ghost: "bg-transparent text-white hover:bg-white/10",
        outline: "border border-white text-white hover:bg-white hover:text-[#363279]",
      },
      size: {
        base: "h-[45px] w-[282px]",
        md: "h-[48px] w-[282px]", 
        lg: "h-[62px] w-[245px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
