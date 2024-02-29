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
export const ChatDetail = () => {
    return (
        <>
            <VStack alignSelf={'start'} spacing={5} h={'full'} position={'relative'}>
                <Flex w={'container.lg'} px={5} pt={5} columnGap={5}>
                    <FaUserCircle fontSize={48} />
                    <Heading as='h1' fontSize={24} noOfLines={1}>Jane Doe</Heading>
                </Flex>
                <Divider></Divider>
                <Box w={'container.lg'} pb={10} overflowY={'scroll'} >
                    <Box bg={'teal.400'} mb={5} rounded={'2xl'} w={'50%'} marginLeft={'none'} p={5}>
                        <Text fontSize={24} color={'white'}>
                            Halo
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequatur tempora dicta qui animi voluptates ipsam voluptatibus recusandae, magni soluta laboriosam nulla cumque atque, quae porro, libero debitis provident earum.
                        </Text>
                    </Box>
                   
                </Box>
                <Flex w={'container.lg'} px={5} bg={'white'} columnGap={5} h={24} position={'absolute'} bottom={0} >
                    <Textarea resize={'none'} placeholder='Masukkan Text' />
                    <Button colorScheme='teal'>
                        <IoSend />
                    </Button>
                </Flex>
            </VStack>
        </>
    )
}