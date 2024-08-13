// src/app/notes/page.tsx
'use client'

import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Heading,
	HStack,
	IconButton,
	Spinner,
	Text,
	Tooltip,
	VStack
} from "@chakra-ui/react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
import {IconEdit, IconEye, IconNote, IconTrash} from "@tabler/icons-react";
import {deleteNote, fetchNotes} from '@/lib/features/notesSlice';
import {useEffect} from 'react';
import {format} from 'date-fns';

const Notes = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const {notes, status, error} = useSelector((state) => state.notes);
	
	useEffect(() => {
		dispatch(fetchNotes());
	}, [dispatch]);
	
	const handleCreateNote = () => {
		router.push('/notes/create');
	};
	
	const handleShowNote = (id: string) => {
		router.push(`/notes/${id}`);
	};
	
	const handleEditNote = (id: string) => {
		router.push(`/notes/${id}/edit`);
	};
	
	const handleDeleteNote = async (id: string) => {
		await dispatch(deleteNote(id));
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
				<Text fontSize="xl" color="red.500">Failed to load notes</Text>
			</Center>
		);
	}
	
	if (!Array.isArray(notes) || notes.length === 0) {
		return (
			<Center minH="100vh" flexDirection="column">
				<IconNote size={48} stroke={1.5} />
				<Heading as="h2" size="lg" mt={4} mb={2}>No Notes Available</Heading>
				<Text fontSize="xl" color="gray.500" mb={4}>It looks like you haven't created any notes yet.</Text>
				<Button colorScheme="teal" onClick={handleCreateNote}>Create Your First Note</Button>
			</Center>
		);
	}
	
	return (
		<Box p={4}>
			<Heading as="h1" mb={4}>Notes</Heading>
			
			<Button colorScheme="teal" w="full" mb={4} onClick={handleCreateNote}>Add Note</Button>
			
			<VStack spacing={4} align="stretch">
				{notes.map(note => (
					<Box key={note.id} p={8} borderWidth="1px" borderRadius="md">
						<Heading as="h2" size="md">{note.title}</Heading>
						<Text mt={2}>
							{note.body.length > 100 ? `${note.body.substring(0, 100)}...` : note.body}
						</Text>
						<Text mt={2} fontSize="sm" color="gray.500">{format(new Date(note.created_at), 'PPP')}</Text>
						<HStack mt={4} spacing={4}>
							
							<ButtonGroup size="sm" isAttached variant="ghost" w="full">
								<Tooltip label="Show">
									<IconButton w="full" aria-label="Show" icon={<IconEye />} colorScheme="blue"
									            onClick={() => handleShowNote(note.id)} />
								</Tooltip>
								<Tooltip label="Edit">
									<IconButton w="full" aria-label="Edit" icon={<IconEdit />} colorScheme="yellow"
									            onClick={() => handleEditNote(note.id)} />
								</Tooltip>
								<Tooltip label="Delete">
									<IconButton w="full" aria-label="Delete" icon={<IconTrash />} colorScheme="red"
									            onClick={() => handleDeleteNote(note.id)} />
								</Tooltip>
							</ButtonGroup>
						</HStack>
					</Box>
				))}
			</VStack>
		</Box>
	);
}

export default Notes;