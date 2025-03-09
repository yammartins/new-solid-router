import { cn } from "@/lib/utils"
import type { ComponentProps } from "solid-js"

interface ButtonProps extends ComponentProps<"button"> {
  size?: "sm" | "base"
}

export function Button({ size = "base", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      aria-disabled={props.disabled}
      class={cn(
        props.class,
        size === "base" ? "p-4" : "p-3",
        "flex cursor-pointer items-center justify-center rounded-lg bg-primary-500 text-center font-semibold text-white transition-colors duration-200 hover:bg-primary-600 active:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-700 disabled:opacity-50 aria-[disabled=true]:bg-primary-700"
      )}
    />
  )
}
