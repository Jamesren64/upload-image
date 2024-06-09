'use client'
// 7271474ddc1d061740e9a0e6
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { useRef } from 'react';
import UploadImage from './UploadImage';
import CurrentStack from './CurrentStack';

export default function Home() {
  const [images, setImages] = React.useState([]);
  const [text, setText] = React.useState(undefined);
  const [translatedText, setTranslatedText] = React.useState(undefined)
  const maxNumber = 69;
  

  const deckId = "[[rYkfrjIi]]"
  const [rows, setRows] = React.useState([]);
  const addFlashcards = () => {
    
    const row = 
        [
          translatedText.replaceAll("\n", " ").replaceAll("\t", " ").replaceAll('&#39;', '\''), 
          text.replaceAll("\n", " ").replaceAll("\t", " ").replaceAll('&#39;', '\'')
        ]
    setRows([
      ...rows,
      row
    ]) 
  }

  const makeFlashcards = () => {
      const tabJoined = rows.map(e => e.join("\t"))
      const newlineJoined = tabJoined.join("\n")
      let tsvContent = "data:text/tab-separated-values;charset=utf-8," 
          + newlineJoined;
      // console.log('tabJoined', tabJoined)
      // console.log('newlineJoined', newlineJoined)
      // console.log('tsvContent', tsvContent)

      var encodedUri = encodeURI(tsvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.tsv");
      document.body.appendChild(link); // Required for FF
      
      link.click();
  }
  
    
 
  useEffect(() => {
    if (images.length > 0) {
      var formData = new FormData();
      formData.append("file", images[0].file);
      axios.post("https://james-image-translation-d10e77b3ae74.herokuapp.com/uploadfile/", formData, {})
        .then(response => {
          console.log(Object.keys(response.data))
          setText(response.data.text)
          setTranslatedText(response.data.translatedText)
        })
    }
  }, [images])
  
  const onOutputTypeSelect = (e) => {
    setOutputType(e.target.value)
  }

  return (
    <>
      <Stack alignItems={'center'}>
        <Typography variant="h4" marginTop={1}>Flashcard Generator</Typography>
        <Typography variant="body1">Upload an image to translate and make into a flashcard.</Typography>
      </Stack>
      
      <Stack className="OUTER_DIV" gap={15} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} height={"100%"}>
        <Stack className="OUTER_STACK1" flexDirection={'column'} width={'50%'} gap={4} height={"100%"} justifyContent={'center'} alignItems={'center'}>
            <UploadImage 
              images = {images}
              setImages = {setImages}
              makeFlashcards = {makeFlashcards}
              addFlashcards = {addFlashcards}
              text = {text}
              translatedText={translatedText}
            />
        </Stack>

        <Stack className='OUTER_STACK2'>
          <Stack height={547.5} justifyContent={'flex-start'} alignItems={'center'}>
            <CurrentStack 
              rows = {rows}
            />
          </Stack>

          <Stack justifyContent={'center'} alignItems={'center'} sx={{minHeight: '100%'}}>
            <Button sx={{width:200, marginTop:3}} variant='contained' onClick={makeFlashcards}>Export To CSV</Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}