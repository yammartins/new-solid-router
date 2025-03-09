import { cn } from "@/lib/utils"
import type { ComponentProps } from "solid-js"

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      class={cn(
        props.class,
        "absolute inset-0 h-full translate-x-4 not-placeholder-shown:translate-y-2 translate-y-0 text-white leading-8 transition-all duration-300 placeholder:text-neutral-500 focus:translate-y-2 focus:outline-none focus:placeholder:text-neutral-800 focus-visible:translate-y-2"
      )}
    />
  )
}
