import { Text } from '@chakra-ui/react'
import { useRouteError } from "react-router-dom";
import { Center } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";
export const Error = () => {
    const error = useRouteError();
    // console.log(error);
    return (
        <>
            <Center w='full' h='100vh'>
                <VStack spacing={5}>

                    <Text fontSize={72}>
                        {error.status}
                    </Text>
                    <Text fontSize={24}>
                        {error.statusText}
                    </Text>
                    <Text fontSize={24} >Oopss... Terjadi masalah pada aplikasi </Text>
                    <Button  to={'/login'}  as={NavLink} colorScheme='teal' >
                        Kembali
                    </Button>
                    
                   
                </VStack>
            </Center>
        </>
    )
}