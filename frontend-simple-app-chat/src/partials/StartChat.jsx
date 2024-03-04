
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';

export const StartChat = ({ isOpen, onClose, loadChat }) => {
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username perlu diisi'),
        }),
        onSubmit: async (value, { setErrors, resetForm }) => {
            try {
                resetForm()
                const { username } = value
                const headers = { authorization: localStorage.getItem('key') }
                const { data } = await axios.post('/chat', { username }, { headers });
                console.log(data);
                if (data?.code === 404) {
                    setErrors({ username: data.message });
                    return;
                }
                loadChat()
                onClose()
            } catch (error) {
                console.log(error);
            }

        }
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={formik.handleSubmit}>
                <ModalContent>
                    <ModalHeader>Mulai Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={formik.errors.username}>
                            <FormLabel>Username </FormLabel>
                            <Input value={formik.values.username} name='username' onChange={formik.handleChange} type='text' placeholder='Masukkan Username' />
                            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type='submit' variant='outline' colorScheme='teal'>Mulai Chat</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>

    )
}