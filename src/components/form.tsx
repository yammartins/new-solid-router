import { cn } from "@/lib/utils"
import type { FieldPath, FieldPathValue, FieldValues, Maybe } from "@modular-forms/solid"
import { type ComponentProps, Show, createContext, useContext } from "solid-js"

type FormWrapperContextValue<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  name: TFieldName
  value: Maybe<FieldPathValue<TFieldValues, TFieldName>>
  error: string
  active: boolean
  touched: boolean
  dirty: boolean
}

type FormControlProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  name: TFieldName
  value: Maybe<FieldPathValue<FieldValues, TFieldName>>
  error: string
  active: boolean
  touched: boolean
  dirty: boolean
}

const FormWrapperContext = createContext<FormWrapperContextValue<FieldValues, FieldPath<FieldValues>>>(
  {} as FormWrapperContextValue<FieldValues, FieldPath<FieldValues>>
)

export function FormWrapper<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>(
  props: FormControlProps<TFieldValues, TFieldName>
) {
  return (
    <FormWrapperContext.Provider value={props}>
      <div
        {...props}
        class={cn(
          props.error ? "border-b-error-500" : "border-b-primary-500",
          "relative flex h-14 flex-col rounded-t-lg border-b bg-neutral-800 px-4 pt-3 transition-all duration-300 has-placeholder-shown:border-b-neutral-800 focus-within:has-placeholder-shown:border-b-primary-500 focus-within:has-placeholder-shown:pt-5 has-placeholder-shown:[&_label]:top-6 has-placeholder-shown:[&_label]:left-8 has-placeholder-shown:[&_label]:text-white has-placeholder-shown:[&_label]:opacity-0 focus-within:has-placeholder-shown:[&_label]:top-2 focus-within:has-placeholder-shown:[&_label]:left-4 focus-within:has-placeholder-shown:[&_label]:text-primary-500 focus-within:has-placeholder-shown:[&_label]:opacity-100"
        )}
      />
    </FormWrapperContext.Provider>
  )
}

export function FormLabel(props: ComponentProps<"label">) {
  const context = useFormWrapperContext()

  return (
    <label
      {...props}
      for={context.name}
      class={cn(
        props.class,
        context.error ? "text-error-500" : "text-primary-500",
        "absolute top-2 left-4 text-xs transition-all duration-300"
      )}
    >
      {props.children}
    </label>
  )
}

export function FormErrorDescription(props: ComponentProps<"span">) {
  const context = useFormWrapperContext()

  return (
    <Show when={context.error} fallback={<div />}>
      <span {...props} class="-bottom-5 absolute left-2 text-error-500 text-xs">
        {context.error}
      </span>
    </Show>
  )
}

function useFormWrapperContext() {
  const context = useContext(FormWrapperContext)
  if (!context) {
    throw new Error("`FormWrapperContext` must be used within a `FormWrapper`")
  }
  return context
}
