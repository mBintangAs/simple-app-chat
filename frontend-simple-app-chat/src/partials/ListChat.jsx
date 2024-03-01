import { Flex } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { FaUserCircle } from "react-icons/fa";
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';

export const ListChat = ({ value,setReciveName,setIdPesan }) => {

    const [name ,setName] = useState()
    const openChat = (event) => {
        try {
            setIdPesan(value._id)
            setReciveName(name)
        } catch (error) {
            
        }
    }
    useEffect(()=>setName(value.participants.filter((value) => value._id != localStorage.getItem('_id'))[0]?.username),[])
    return (
        <Flex cursor={'pointer'} px={5} mb={5} as={'div'} onClick={openChat} key={value._id} columnGap={5} >
            <FaUserCircle fontSize={48} />
            <VStack align='start' w={'full'} spacing={1}>
                <Heading as='h6' fontSize={24} >{name}</Heading>
                <Text fontSize={12} noOfLines={1} >{value.lastMessageId?.text}</Text>
                <Divider colorScheme='teal' ></Divider>
            </VStack>
        </Flex>
    )
}