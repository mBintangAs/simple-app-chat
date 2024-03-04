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
    const [idPesan,setIdPesan] =useState()
    const [reciveName,setReciveName] =useState()

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                            <ListChat key={value._id} setReciveName={setReciveName} setIdPesan={setIdPesan} value={value} loadChat={loadChat} />
                        )
                        :
                        <Center>Belum ada percakapan</Center>
                    }

                </Box>
                <Divider orientation='vertical'></Divider>
                <ChatDetail _id={idPesan}  name={reciveName}/>
            </HStack>
            <StartChat isOpen={isOpen} onClose={onClose} loadChat={loadChat} />
        </>
    )
}