"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { userSchema, mappedPlans } from "./validations/userSchema"

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  weight: string
  plan: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  })

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ))

  console.log(errors)

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password?.message && <p>{errors.password?.message}</p>}
        <label htmlFor="confirmPassword">confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p>{errors.confirmPassword?.message}</p>
        )}

        <label htmlFor="dateOfBirth">Date of birth</label>
        <input type="number" id="dateOfBirth" {...register("dateOfBirth")} />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
        <label htmlFor="weight">Weight</label>
        <input type="number" id="weight" {...register("weight")} />
        {errors.weight?.message && <p>{errors.weight?.message}</p>}
        <label htmlFor="plan">Plan</label>
        <select {...register("plan")} id="plan">
          {plansOptions}
        </select>
        {errors.plan?.message && <p>{errors.plan?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      <div>{JSON.stringify(watch(), null, 2)}</div>
    </div>
  )
}
