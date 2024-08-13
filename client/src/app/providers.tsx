'use client';

import {CacheProvider} from '@chakra-ui/next-js';
import {ChakraProvider} from '@chakra-ui/react';
import React, {useRef} from "react";
import {Provider} from 'react-redux'
import {makeStore} from '@/lib/store'

export const Providers = ({children}: { children: React.ReactNode }) => {
	const storeRef = useRef()
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}
	
	return (
		<Provider store={storeRef.current}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</Provider>
	);
}