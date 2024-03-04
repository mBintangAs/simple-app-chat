import { Box } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import { VStack } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { IoSend } from "react-icons/io5";
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { io } from 'socket.io-client'
export const ChatDetail = ({ _id = null, name }) => {
    const [message, setMessage] = useState()
    const elementRef = useRef(null);

    const socket = io(axios.defaults.baseURL, { transports: ['websocket'], });
    const fetchMessage = async () => {
        try {
            if (_id != null) {
                const headers = { authorization: localStorage.getItem('key') }
                const { data } = await axios.get('/chat/' + _id, { headers })
                setMessage(data.message)
            }
            scrollToBottom()
        } catch (error) {
            console.log(error);
        }

    }

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: Yup.object({
            text: Yup.string().required(),
        }),
        onSubmit: async (value, { setErrors, resetForm }) => {
            try {
                const headers = { authorization: localStorage.getItem('key') }
                const sendMessage = { chatId: _id, text: value.text }
                const { data } = await axios.post('/message', sendMessage, { headers })
                fetchMessage()
                resetForm()
                scrollToBottom()

            } catch (error) {
                console.log(error);
            }
        }
    })
    useEffect(() => {
        if (elementRef.current) {
          // Melakukan scroll ke bagian bawah elemen saat halaman dimuat
          elementRef.current.scrollTop  = elementRef.current.scrollHeight;
        }
      }, [message]);
    useEffect(() => {
        fetchMessage()
        scrollToBottom()
        
    }, [_id])
    const scrollToBottom = () => {
        if (elementRef.current) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    };
    
    socket.on(_id, (msg) => {
        // Menggunakan setMessage untuk menambahkan pesan baru ke dalam array messages
        fetchMessage()
    });
    return (
        <>
            {name &&

                <VStack alignSelf={'start'} spacing={5} h={'full'} position={'relative'}>
                    <Flex w={'container.lg'} px={5} pt={5} columnGap={5}>
                        <FaUserCircle fontSize={48} />
                        <Heading as='h1' fontSize={24} noOfLines={1}>{name}</Heading>
                    </Flex>
                    <Divider></Divider>
                    <Box w={'container.lg'} h={'70%'} ref={elementRef} pb={24} overflowY={'scroll'} >
                        {message?.map((value) =>

                            <Box bg={value.senderId != localStorage.getItem('_id') ? 'green.600' : 'teal.700'} key={value._id} mb={5} rounded={'2xl'} w={'50%'}
                                marginLeft={value.senderId != localStorage.getItem('_id') ? 'none' : 'auto'} p={5}>
                                <Text fontSize={24} color={'white'}>
                                    {value.text}
                                </Text>
                            </Box>
                        )}

                    </Box>
                    <Flex as={'form'} onSubmit={formik.handleSubmit} w={'container.lg'} px={5} bg={'white'} columnGap={5} h={24} position={'absolute'} bottom={0} >
                        <Textarea isInvalid={formik.errors.text} onChange={formik.handleChange} resize={'none'} name='text' placeholder='Masukkan Text' value={formik.values.text} />
                        <Button type='submit' colorScheme='teal'>
                            <IoSend />
                        </Button>
                    </Flex>

                </VStack>
            }
        </>
    )
}