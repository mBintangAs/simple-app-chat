import { Flex } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { FaUserCircle } from "react-icons/fa";
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

export const ListChat = ({value}) => {
    return (
        <Flex px={5} mb={5} key={value._id} columnGap={5} >
            <FaUserCircle fontSize={48} />
            <VStack align='start' w={'full'} spacing={1}>
                <Heading as='h6' fontSize={24} >{value.participants.filter((value) => value._id != localStorage.getItem('_id'))[0]?.username}</Heading>
                <Text fontSize={12} noOfLines={1} >{value.lastMessageId?.text}</Text>
                <Divider colorScheme='teal' ></Divider>
            </VStack>
        </Flex>
    )
}