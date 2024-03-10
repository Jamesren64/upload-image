'use client'

import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import ImageUploading from 'react-images-uploading';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  
  useEffect(() => {
    if (images.length > 0) {
      var formData = new FormData();
      // formData.append("file", images[0]);
      axios.post("http://127.0.0.1:8000/uploadfile/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'name': 'input_file'
        }
      })
    }
  }, [images])

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/", {})
  // }, [images])

  return (
    <Stack justifyContent={'center'} alignItems={'center'} marginTop={10}>
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
          // write your building UI
          <Stack alignItems={'center'}>
            <Stack flexDirection={'row'}>
              <Button variant="contained"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </Button>
              &nbsp;
              <Button variant="contained" onClick={onImageRemoveAll}>Remove all images</Button>
            </Stack>
            <Stack height={500} overflow={'scroll'} marginTop={5}>
              {imageList.map((image, index) => (
                <Stack key={index} className="image-item" marginTop={2} padding={2} sx={{border: 1, borderColor: 'gray'}}>
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
          </Stack>
        )}
      </ImageUploading>
    </Stack>
  );
}