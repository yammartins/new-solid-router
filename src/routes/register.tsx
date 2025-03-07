import { Logo } from "@/assets/svgs/logo"
import { Button } from "@/components/button"
import { FormErrorDescription, FormLabel, FormWrapper } from "@/components/form"
import { Input } from "@/components/input"
import { zodForm } from "@modular-forms/solid"
import { createForm } from "@modular-forms/solid"
import { Link, createFileRoute, redirect } from "@tanstack/solid-router"
import Cookies from "js-cookie"

import { z } from "zod"

const authLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um e-mail válido" })
    .nonempty({ message: "O valor é obrigatório!" }),
  password: z.string().nonempty({ message: "O valor é obrigatório!" }),
  name: z.string().nonempty({ message: "O campo é obrigatório! " }),
})

type AuthLoginSchema = z.infer<typeof authLoginSchema>

export const Route = createFileRoute("/register")({
  beforeLoad: registerBeforeLoader,
  component: RegisterRoute,
})

function registerBeforeLoader() {
  const authToken = Cookies.get("authToken")
  if (authToken) {
    return redirect({
      from: "/login",
      to: "/",
      replace: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  }
}

function RegisterRoute() {
  const [form, { Field, Form }] = createForm<AuthLoginSchema>({
    validateOn: "submit",
    validate: zodForm(authLoginSchema),
  })

  return (
    <main class="flex h-full w-full items-center justify-center bg-neutral-900">
      <div class="flex h-133 w-136 flex-col items-center gap-5">
        <Logo />
        <p class="text-base text-neutral-50">É simples ser HZC! Registre-se abaixo:</p>
        <Form class="flex w-full flex-col gap-6" shouldFocus={false}>
          <Field name="email">
            {(field, props) => (
              <FormWrapper {...field}>
                <FormLabel>E-mail</FormLabel>
                <Input {...props} placeholder="E-mail" />
                <FormErrorDescription />
              </FormWrapper>
            )}
          </Field>
          <Field name="name">
            {(field, props) => (
              <FormWrapper {...field}>
                <FormLabel>Nome</FormLabel>
                <Input {...props} placeholder="Nome" />
                <FormErrorDescription />
              </FormWrapper>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <FormWrapper {...field}>
                <FormLabel>Senha</FormLabel>
                <Input {...props} type="password" placeholder="Senha" />
                <FormErrorDescription />
              </FormWrapper>
            )}
          </Field>

          <Button type="submit" disabled={form.invalid}>
            {form.submitting ? "..." : "Registrar"}
          </Button>
        </Form>
        <p class="ml-auto text-primary-500 text-sm">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            class="font-bold underline transition-colors duration-200 hover:text-primary-500/80"
          >
            Conecte-se!
          </Link>
        </p>
      </div>
    </main>
  )
}
