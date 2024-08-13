'use client'

import {Box, Button, Center, Heading, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {deleteNote, fetchNoteById} from '@/lib/features/notesSlice';
import {IconArrowLeft, IconTrash} from "@tabler/icons-react";

const NoteDetail = () => {
	const router = useRouter();
	const {id} = useParams();
	const dispatch = useDispatch();
	const {selectedNote, status, error} = useSelector((state) => state.notes);
	
	useEffect(() => {
		if (id) {
			dispatch(fetchNoteById(id));
		}
	}, [dispatch, id]);
	
	const handleBack = () => {
		router.push('/notes');
	};
	
	const handleDelete = async () => {
		await dispatch(deleteNote(id));
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
				<Button
					aria-label="Back"
					leftIcon={<IconArrowLeft />}
					onClick={handleBack}
					mb={4}
				>
					Back
				</Button>
				<Heading as="h1" mb={6} textAlign="center">{selectedNote.title}</Heading>
				<VStack spacing={4} align="stretch">
					<Text>{selectedNote.body}</Text>
					<Text fontSize="sm" color="gray.500">{new Date(selectedNote.created_at).toLocaleDateString()}</Text>
					<Button
						aria-label="Delete"
						leftIcon={<IconTrash />}
						colorScheme="red"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</VStack>
			</Box>
		</Center>
	);
}

export default NoteDetail;