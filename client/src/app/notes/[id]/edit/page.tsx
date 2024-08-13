// src/app/notes/edit/[id]/page.tsx
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
	Spinner,
	Text,
	Textarea,
	VStack
} from "@chakra-ui/react";
import {useParams, useRouter} from 'next/navigation';
import {IconArrowLeft} from "@tabler/icons-react";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchNoteById, updateNote} from '@/lib/features/notesSlice';

const EditNote = () => {
	const router = useRouter();
	const {id} = useParams();
	const dispatch = useDispatch();
	const {selectedNote, status, error} = useSelector((state) => state.notes);
	
	useEffect(() => {
		if (id) {
			dispatch(fetchNoteById(id));
		}
	}, [dispatch, id]);
	
	const formik = useFormik({
		initialValues: {
			title: selectedNote?.title || '',
			body: selectedNote?.body || ''
		},
		enableReinitialize: true,
		onSubmit: async (values: any) => {
			await dispatch(updateNote({
				id,
				note: {
					title: values.title,
					body: values.body
				}
			}));
			router.push('/notes');
		}
	});
	
	const handleBack = () => {
		router.push('/notes');
	};
	
	if (status === 'loading') {
		return (
			<Center minH="100vh">
				<Spinner size="xl" />
			</Center>
		);
	}
	
	if (status === 'failed') {
		return (
			<Center minH="100vh">
				<Text fontSize="xl" color="red.500">Failed to load note</Text>
			</Center>
		);
	}
	
	if (!selectedNote) {
		return (
			<Center minH="100vh">
				<Text fontSize="xl" color="gray.500">Note not found</Text>
			</Center>
		);
	}
	
	return (
		<Center minH="100vh" p={4}>
			<Box p={4} borderWidth="1px" borderRadius="md" width="100%" maxWidth="500px">
				<IconButton
					aria-label="Back"
					icon={<IconArrowLeft />}
					onClick={handleBack}
					mb={4}
				/>
				<Heading as="h1" mb={6} textAlign="center">Edit Note</Heading>
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
						<Button type="submit" colorScheme="teal" width="full">Update Note</Button>
					</VStack>
				</form>
			</Box>
		</Center>
	);
}

export default EditNote;