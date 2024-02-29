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
import {
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

export const Login = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [alert, setAlert] = useState()
    const formik = useFormik({
        initialValues: {
            username: location.state?.username ?? '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username perlu diisi'),
            password: Yup.string().required('Password Harus diisi'),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axios.post('/login', values)
                localStorage.setItem("key", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("_id", data._id);
                navigate('/chat')

            } catch (error) {
                setAlert({ type: 'error', message: error.response.data })
            }
        },
    })
    useEffect(() => {
        localStorage.removeItem("key");
        if (location.state?.username) {
            setAlert({ type: 'success', message: 'Registrasi berhasil silahkan masuk' })
            window.history.replaceState({ state: null }, document.title);
        }
    }, [])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Center w={'full'} h={'100vh'}>
                    <Card w={'70%'}>
                        <CardHeader>
                            <Heading as={'h1'}>Login </Heading>
                        </CardHeader>
                        <CardBody>
                            {alert &&
                                (<Alert mb={5} borderRadius={10} status={alert.type}>
                                    <AlertIcon />
                                    <AlertDescription>
                                        {alert.message}
                                    </AlertDescription>
                                </Alert>)
                            }

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
                            <Text>Belum punya akun?  <Text color='teal.500' to={'/register'} as={NavLink}>
                                registrasi
                            </Text>
                            </Text>
                        </CardFooter>
                    </Card>
                </Center>
            </form>
        </>
    )
}