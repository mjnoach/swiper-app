import {
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { api } from '../../api'
import { AuthResponse, User } from '../../types'
import { useSession } from '../SessionContext'

async function createUser({ email, password }: Partial<User>) {
  const response = await api.post<AuthResponse>(`/auth/register`, {
    email,
    password,
  })
  console.log(
    '🚀 ~ file: CreateUserForm.tsx ~ line 24 ~ createUser ~ response?.data',
    response?.data,
  )
  return response?.data
}

export function CreateUserForm() {
  const form = useForm({
    initialValues: {
      email: 'test@mail.com',
      password: 'aUbu5D8ZPyVSS6W',
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 0 ? null : 'Invalid password'),
    },
  })
  const { setSession } = useSession()
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFormSubmit(values) {
    const { email, password } = values
    createUser({ email, password })
      .then(({ user, jwt }) => user && setSession(user, jwt))
      .catch((e) => {
        console.log(
          '🚀 ~ file: CreateUserForm.tsx ~ line 65 ~ handleFormSubmit ~ e',
          e?.response?.data,
        )
        setErrorMessage(e?.response?.data)
      })
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      {errorMessage && (
        <Alert title={errorMessage} color="red" children={undefined} />
      )}
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <TextInput
          style={styles.input}
          variant="filled"
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          autoComplete="email"
          textcontenttype="email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          style={styles.input}
          variant="filled"
          withAsterisk
          label="Password"
          placeholder="Password"
          autoComplete="new-password"
          description="Password must include at least one letter, number and special character"
          {...form.getInputProps('password')}
        />
        <Checkbox
          color="dark"
          mt="md"
          label="I agree"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: '1rem',
  },
})
