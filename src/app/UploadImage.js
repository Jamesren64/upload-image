import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

const maxNumber = 69;

export default function UploadImage( {images, makeFlashcards, setImages, text, translatedText, addFlashcards} ) {
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI if (true && true); if (false && true)
          
            <Stack alignItems={'center'} justifyContent={'center'} width={"100%"} height={"100%"}>
              <Stack className='CARDS' width={"100%"}>
                <Stack className='OUTER_STACK' width={"100%"} overflow='auto' sx={{border: 1, borderColor: 'gray', borderRadius:"8px"}} height={300} alignItems={"center"} justifyContent={"center"}>
                  <Stack flexDirection={'row'} marginTop={0}>
                    {images.length == 0 && <Button variant="text"
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Add Image
                    </Button>}
                    &nbsp;
                  </Stack>
                  {imageList.map((image, index) => (
                    <Stack key={index} className="image-item" padding={2} width={'100%'} >
                      <img src={image['data_url']} alt="" />
                    </Stack>
                  ))}
                </Stack>
                
                <Stack flexDirection={'row'} width={'100%'} gap={2} marginTop={2}>
                  <Stack flexDirection={'column'} width={'50%'}>
                    <Typography variant='h7'>Original Text</Typography>
                    <Stack width={'100%'} height={200} padding={.5} sx={{border: 1, borderColor: 'gray', borderRadius:"8px"}} overflow={'scroll'}>
                        {text ? <Typography>{text}</Typography> : <Typography sx={{color: 'gray'}}>Upload image to see flashcard</Typography>}
                    </Stack>
                  </Stack>
                  <Stack flexDirection={'column'} width={'50%'}>
                    <Typography variant='h7'>Translated Text</Typography>
                    <Stack width={"100%"} height={200} padding={.5} sx={{border: 1, borderColor: 'gray', borderRadius:"8px"}} overflow={'scroll'}>
                      {translatedText ? <Typography>{translatedText}</Typography> : <Typography sx={{color: 'gray'}}>Upload image to see flashcard</Typography>}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack flexDirection={'row'} gap={1} marginTop={3}>
                <Button sx={{width:200}} variant='contained' onClick={addFlashcards}>Add Flashcards</Button>
                <Button sx={{width:200}} variant='contained' onClick={onImageRemove}>Delete Flashcards</Button>
              </Stack>
              
              
            </Stack>
            

        )}
      </ImageUploading>
    )
}