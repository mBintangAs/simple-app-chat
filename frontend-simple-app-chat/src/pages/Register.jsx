import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";
import { Center } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Register = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username perlu diisi'),
            password: Yup.string().required('Password Harus diisi'),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post('/register', values)
                navigate('/login',{state:{username:data}})
            } catch (error) {
                error.response.data.map((values) => {
                    if (values.path == 'username') {
                        formik.errors.username = values.msg
                    }
                    if (values.path == 'password') {
                        formik.errors.password = values.msg
                    }
                });

            }
        },

    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Center w={'full'} h={'100vh'}>
                    <Card w={'70%'}>
                        <CardHeader>
                            <Heading as={'h1'}>Registrasi </Heading>
                        </CardHeader>
                        <CardBody>
                            <FormControl isInvalid={formik.errors.username} mb={5}>
                                <FormLabel>Username</FormLabel>
                                <Input value={formik.values.username} name='username' onChange={formik.handleChange} type='text' />
                                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.password} mb={5}>
                                <FormLabel>Password</FormLabel>
                                <Input type='password' onChange={formik.handleChange} name='password' value={formik.values.password} />
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>

                            <Button type='submit' variant='solid' w={'full'} colorScheme='teal'>
                                Masuk
                            </Button>
                        </CardBody>

                        <CardFooter>
                            <Text>Sudah punya akun?  <Text color='teal.500' to={'/login'} as={NavLink}>
                                Login
                            </Text>
                            </Text>
                        </CardFooter>
                    </Card>
                </Center>
            </form>
        </>
    )
}