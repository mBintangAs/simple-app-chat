import {
    Box, Center, Divider, Heading, Flex, VStack, Textarea, Button, Text
} from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import { IoSend } from "react-icons/io5";
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { io } from 'socket.io-client'
import moment from 'moment'

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
                // data.message.map((value) => dateMessage.add(moment(value.createdAt).format('DD/MM/YYYY')))
                // console.log(dateMessage);
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
                await axios.post('/message', sendMessage, { headers })
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
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
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
    const isMe = (value) => {
        if (localStorage.getItem('_id') == value) {
            return true;
        }
        return false;
    }

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

                        {message?.map((value, index) =>
                            <Box key={value._id}>
                                {index > 0 ?
                                    moment(message[index].createdAt).format('DD/MM/YYYY') != moment(message[index - 1].createdAt).format('DD/MM/YYYY') &&
                                    <Box p={2.5}  rounded={'3xl'} w={'fit-content'} margin={'auto'} bg={'gray.300'} mb={5}>{moment(message[index].createdAt).format('DD/MM/YYYY')}</Box>
                                    :
                                    <Box p={2.5}  rounded={'3xl'} bg={'gray.300'} margin={'auto'} w={'fit-content'} mb={5}>{moment(message[index].createdAt).format('DD/MM/YYYY')}</Box>
                                }
                                <Box  position={'relative'} bg={isMe(value.senderId) ? 'green.600' : 'teal.700'}  mb={5} roundedTopLeft={isMe(value.senderId) ? '3xl' : 'none'} roundedTopRight={!isMe(value.senderId) ? '3xl' : 'none'} roundedBottom={'3xl'} w={'50%'}
                                    marginLeft={isMe(value.senderId) ? 'auto' : 'none'} p={5}>
                                    <Text fontSize={24} color={'white'}>
                                        {value.text}
                                    </Text>
                                    <Text position={'absolute'} bottom={2} right={5} fontSize={12} color={'white'}>
                                        {moment(value.createdAt).format('HH:mm')}
                                    </Text>
                                </Box>
                            </Box>

                        )}

                    </Box>
                    <Flex as={'form'} onSubmit={formik.handleSubmit} w={'container.lg'} px={5} bg={'white'} columnGap={5} h={24} position={'absolute'} bottom={0} >
                        <Textarea isInvalid={formik.errors.text} onChange={formik.handleChange} resize={'none'} name='text' placeholder='Masukkan Text' value={formik.values.text} />
                        <Button type='submit' colorScheme='teal'>
                            <IoSend />
                        </Button>
                    </Flex>

                </VStack >
            }
        </>
    )
}