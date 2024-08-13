'use client'

import {Button, Center, Heading} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

const Home = () => {
	const router = useRouter();
	
	return (
		<Center minH="100vh" as="main" flexDirection="column">
			<Heading as="h1" fontSize="40px" mb={4} textAlign="center">Welcome to the Catetan App!</Heading>
			
			<Button colorScheme="teal" rounded="full" size="lg" onClick={() => router.push('/notes')}>Get Started</Button>
		</Center>
	);
}

export default Home