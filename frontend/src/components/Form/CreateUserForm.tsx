import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { StyleSheet } from 'react-native'
import { APIROOT } from '../../config'
import { User } from '../../models.types'
import storage from '../../storage'

async function createUser() {
  try {
    const response = await axios.get<User>(`${APIROOT}/user/create`)
    const user = response.data
    storage.set('user', user)
    return user
  } catch (error) {
    console.log(
      '🚀 ~ file: CreateUserForm.tsx ~ line 23 ~ createUser ~ error',
      error,
    )
  }
}

export function CreateUserForm({ navigation }) {
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

  async function handleFormSubmit() {
    createUser()
      .then((user) => {
        console.log(
          '🚀 ~ file: CreateUserForm.tsx ~ line 39 ~ .then ~ user',
          user,
        )
        navigation.navigate('Root')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
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
