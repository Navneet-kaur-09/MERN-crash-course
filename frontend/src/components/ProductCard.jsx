import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Dialog, Heading, HStack, IconButton, VStack } from '@chakra-ui/react'
import React from 'react'
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product.js';
import { Input, Stack } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { Field } from "@/components/ui/field"
import { useRef } from "react"



const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct= async (pid) => {
        const{success, message}  = await deleteProduct(pid)
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
            });
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <Box
	shadow='lg'
	rounded='lg'
	overflow='hidden'
	transition='all 0.3s'
	_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
	bg={bg}
	>
    <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

    <Box p={4}>
    <Heading as='h3' size='md' mb={2}>
        {product.name}
    </Heading>

    <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
        ${product.price}
    </Text>

    <HStack spacing={2}>
        <IconButton icon={<EditIcon />} colorScheme='blue' />
        <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme='red'
        />
    </HStack>
</Box>

<DialogRoot isOpen={isOpen} onClose={onClose} initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <VStack spacing={4}>
            <Input
			    placeholder='Product Name'
				name='name'
				value={updatedProduct.name}
				onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
				/>
			<Input
				placeholder='Price'
				name='price'
				type='number'
				value={updatedProduct.price}
				onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
				/>
			<Input
				placeholder='Image URL'
				name='image'
				value={updatedProduct.image}
				onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
				/>
		    </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </DialogActionTrigger>
          <Button colorScheme='blue'
			mr={3}
			onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>

</Box>
  )
};

export default ProductCard;