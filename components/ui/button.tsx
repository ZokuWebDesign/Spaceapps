import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Core (top) button styling variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[6px] text-white font-extrabold text-xl tracking-normal transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-['Outfit',sans-serif]",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(54deg,#DC0C6A_26.15%,#FF518E_82.62%)]",
        primary: "bg-[linear-gradient(54deg,#DC0C6A_26.15%,#FF518E_82.62%)]",
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

// (Removed gap map approach; using absolute blur layer now)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Normalize variant (defensive in case a non-typed string slips through)
    const effectiveVariant = (variant || "default") as NonNullable<typeof variant>

    // For primary/default variants we create a layered structure with an absolutely positioned
    // blurred gradient behind the real button so the glow extends beyond edges.
    const isLayered = !asChild && (effectiveVariant === "primary" || effectiveVariant === "default")
    const sizeClass = buttonVariants({ size }) // only to extract width/height tokens

    if (isLayered) {
      // Keep the original size (no inner shrink). Two identical gradient layers: blurred back + sharp front.
      const sizing = sizeClass
        .split(" ")
        .filter(cls => cls.startsWith("h-[") || cls.startsWith("w[") || cls.startsWith("w-"))
        .join(" ")

  const variantClasses = buttonVariants({ variant: effectiveVariant, size })

      return (
        <span className={cn("relative inline-flex", sizing)}>
          {/* Back (blurred) layer */}
          <span
            aria-hidden="true"
            className={cn(
              // Use tailwind provided blur size (blur-lg[10px]for broad compatibility
              "absolute inset-0 rounded-[6px] bg-[linear-gradient(54deg,#DC0C6A_26.15%,#FF518E_82.62%)] blur-[10px] -z-10"
            )}
          />
          {/* Front (interactive) layer */}
          <Comp
            ref={ref}
            className={cn(
              variantClasses,
              className,
              "relative z-10"
            )}
            data-variant={effectiveVariant}
            {...props}
          >
            {children}
          </Comp>
        </span>
      )
    }

    // Fallback: original single element behavior
    return (
      <Comp
        className={cn(buttonVariants({ variant: effectiveVariant, size, className }))}
        ref={ref}
        data-variant={effectiveVariant}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
