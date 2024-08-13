'use client'

import {
	Box,
	Button,
	Center,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	Textarea,
	VStack
} from "@chakra-ui/react";
import {useRouter} from 'next/navigation';
import {IconArrowLeft} from "@tabler/icons-react";
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {createNote} from '@/lib/features/notesSlice';

const CreateNote = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	
	const formik = useFormik({
		initialValues: {
			title: '',
			body: ''
		},
		onSubmit: async (values: any) => {
			await dispatch(createNote({
				title: values.title,
				body: values.body
			}));
			router.push('/notes');
		}
	});
	
	const handleBack = () => {
		router.push('/notes');
	};
	
	return (
		<Center minH="100vh" p={4}>
			<Box p={4} borderWidth="1px" borderRadius="md" width="100%" maxWidth="500px">
				<IconButton
					aria-label="Back"
					icon={<IconArrowLeft />}
					onClick={handleBack}
					mb={4}
				/>
				<Heading as="h1" mb={6} textAlign="center">Create Note</Heading>
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={4} align="stretch">
						<FormControl id="title" isRequired>
							<FormLabel>Title</FormLabel>
							<Input
								type="text"
								name="title"
								value={formik.values.title}
								onChange={formik.handleChange}
							/>
						</FormControl>
						<FormControl id="body" isRequired>
							<FormLabel>Body</FormLabel>
							<Textarea
								name="body"
								value={formik.values.body}
								onChange={formik.handleChange}
							/>
						</FormControl>
						<Button type="submit" colorScheme="teal" width="full">Create Note</Button>
					</VStack>
				</form>
			</Box>
		</Center>
	);
}

export default CreateNote;