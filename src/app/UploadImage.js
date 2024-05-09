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

export default function UploadImage( {images, addFlashcards, makeFlashcards, setImages} ) {
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
          <Stack alignItems={'center'}>
            
            <Stack overflow={'scroll'} >
              {imageList.map((image, index) => (
                <Stack key={index} className="image-item" padding={2} sx={{border: 1, borderColor: 'gray'}}>
                  <img src={image['data_url']} alt="" width="300" />
                  <Stack className="image-item__btn-wrapper" alignItems={'center'} >
                    <Stack flexDirection={'row'} gap={1} marginTop={1}>
                      <Button variant="outlined" onClick={() => onImageUpdate(index)}>Update</Button>
                      <Button variant="outlined" onClick={() => onImageRemove(index)}>Remove</Button>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>

            <Stack flexDirection={'row'} marginTop={2}>
              {images.length == 0 && <Button variant="contained"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Add Image
              </Button>}
              &nbsp;
              <Stack flexDirection={'row'} gap={0.5}>
                <Button variant='contained' onClick={addFlashcards}>Add Flashcards</Button>
            </Stack>
            </Stack>
          </Stack>

        )}
      </ImageUploading>
    )
}