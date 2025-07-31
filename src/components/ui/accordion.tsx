import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-4 transition-all hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <div className="relative h-8 w-8">
        <svg 
          className="absolute h-full w-full transition-opacity group-data-[state=closed]:opacity-100 group-data-[state=open]:opacity-0"
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15.9974 10.666V21.3327M10.6641 15.9993H21.3307M29.3307 15.9993C29.3307 23.3631 23.3612 29.3327 15.9974 29.3327C8.6336 29.3327 2.66406 23.3631 2.66406 15.9993C2.66406 8.63555 8.6336 2.66602 15.9974 2.66602C23.3612 2.66602 29.3307 8.63555 29.3307 15.9993Z" 
            stroke="#234ED9" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <svg 
          className="absolute h-full w-full transition-opacity group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100"
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12.2256 12.2288L19.768 19.7712M12.2256 19.7712L19.768 12.2288M25.4249 6.57191C30.6319 11.7789 30.6319 20.2211 25.4249 25.4281C20.2179 30.6351 11.7757 30.6351 6.56871 25.4281C1.36172 20.2211 1.36172 11.7789 6.56871 6.57191C11.7757 1.36492 20.2179 1.36492 25.4249 6.57191Z" 
            stroke="#D92D20"
            stroke-opacity="0.8"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("py-4 border-t border-[#D9D9D9]", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
