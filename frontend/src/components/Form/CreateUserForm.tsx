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
import React, { useContext, useState } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { api } from '../../api'
import { AuthResponse } from '../../types'
import { SessionContext } from '../SessionContext'

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
  const { setSession } = useContext(SessionContext)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFormSubmit({ email, password }) {
    const response = await api
      .post<AuthResponse>(`/auth/register`, {
        email,
        password,
      })
      .catch((e) => {
        setErrorMessage(e.response.data)
      })
    if (!response) return
    setSession(response.data.user, response.data.jwt)
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
          type="email"
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

const styles = EStyleSheet.create({
  input: {
    marginBottom: '1rem',
  },
})
