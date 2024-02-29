import { HStack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center } from '@chakra-ui/react'
import { ListChat } from '../partials/ListChat';
import { HiOutlinePlusSm } from "react-icons/hi";
import { Flex } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { StartChat } from '../partials/StartChat';
import axios from 'axios';
import { ChatDetail } from '../partials/ChatDetail';
import { io } from 'socket.io-client';



export const Chat = () => {
    const [chat, setChat] = useState([])
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const socket = io('http://localhost:3001');
    const loadChat = async () => {
        try {
            const headers = { authorization: localStorage.getItem('key') }
            const { data } = await axios.get('/chat', { headers })
            if (data.code == 401) {
                navigate('/login')
            }
            setChat(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadChat()
        socket.on('connection', (msg) => {
            console.log('Pesan baru diterima:', msg);
            // Lakukan logika untuk menangani pesan di sini
          });
    }, [])
    return (
        <>
            <HStack h={'100vh'} spacing={5}>
                <Box w={'lg'} h={'100vh'} overflowY={'scroll'}   >
                    <Flex justifyContent={'space-between'} p={5} mb={5} fontSize={24} >
                        <Heading as='h1' noOfLines={1}>Simple App Chat</Heading>
                        <Button colorScheme='teal' onClick={onOpen} variant='solid' >
                            <HiOutlinePlusSm />
                        </Button>
                    </Flex>
                    {chat?.length > 0 ?
                        chat.map((value) =>
                            <ListChat value={value} />
                        )
                        :
                        <Center>Belum ada percakapan</Center>
                    }

                </Box>
                <Divider orientation='vertical'></Divider>
                <ChatDetail/>
            </HStack>
            <StartChat isOpen={isOpen} onClose={onClose} loadChat={loadChat} />
        </>
    )
}