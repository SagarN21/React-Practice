import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Spinner,
  Text,
  Checkbox,
  Stack,
  Center,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, updateData } from '../redux/action';
import { FaHeart, FaRegHeart } from 'react-icons/fa';



const MainPage = () => {

  
  const isLoading = useSelector(state=>state.isLoading);
  const dispatch = useDispatch()
 const [data1,setData] = useState(useSelector(state=>state.data))
 const data = useSelector(state=>state.data)
 const [favorites, setFavorites] = useState(() => {
  // Load favorites from local storage on component mount
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : {};
});



  useEffect(()=>{

    dispatch(getData({}))
   
   

  },[])
  const [selectedItems, setSelectedItems] = useState({}); // To track selected items

  const handleChange = (id) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id]: !prevSelectedItems[id], // Toggle the selected state
    }));
  };

  const handleDelete = ()=>{
    const newData = data.filter((elem)=>!selectedItems[elem.id]);
    dispatch(updateData(newData))
  }

  const handleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      updatedFavorites[id] = !updatedFavorites[id];
      // Store updated favorites in local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isDeleteButtonVisible = Object.keys(selectedItems).length > 0;
 
  return (
   <Box>
   

  <Heading>Album</Heading>
  <Center>
  <Stack> 
  {
    isLoading? <Spinner size='xl' />:data.map((elem)=>{
        return(
            <Box key = {elem.id} border='1px'  borderColor={selectedItems[elem.id] ? 'green.200' : 'gray.200'} position={'relative'}> 
             <Box position="absolute" top="5px" right="5px">
                  <IconButton
                    icon={
                      favorites[elem.id] ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart color="gray" />
                      )
                    }
                    size="sm"
                    colorScheme="white"
                    onClick={() => handleFavorite(elem.id)}
                    aria-label={favorites[elem.id] ? 'Unfavorite' : 'Favorite'}
                  />
                </Box>
            <Text>{elem.id}</Text>
            <Center> 
            <Image src={elem.thumbnailUrl}></Image>
            </Center>
            <Text>{elem.title}</Text>
            
            <Checkbox colorScheme='green' onChange={()=>handleChange(elem.id)} isChecked={selectedItems[elem.id]}>
   Select
  </Checkbox>
            </Box>
        )
    })
  }
  {isDeleteButtonVisible && <Button
            position="fixed"
            bottom="20px"
            right="20px"
            backgroundColor="red"
            color="white"
            padding="10px 20px"
            borderRadius="5px"
            cursor="pointer"
            onClick={handleDelete}
            
          >
            Delete Selected
          </Button>}
  </Stack>
  </Center>


   </Box>
  )
}

export default MainPage