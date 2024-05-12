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

export default function Home() {
  const [images, setImages] = React.useState([]);
  const [text, setText] = React.useState(undefined);
  const [translatedText, setTranslatedText] = React.useState(undefined)
  const [outputType, setOutputType] = React.useState('mochi')
  const maxNumber = 69;
  
  console.log(outputType)

  
  const deckId = "[[rYkfrjIi]]"
  const rowsRef = useRef([]);
  const addFlashcards = () => {
    
    const row = 
        [
          translatedText.replaceAll("\n", " ").replaceAll("\t", " ").replaceAll('&#39;', '\''), 
          text.replaceAll("\n", " ").replaceAll("\t", " ").replaceAll('&#39;', '\'')
        ]
    rowsRef.current = [
      ...rowsRef.current,
      row
    ]
  }

  const makeFlashcards = () => {
    if (outputType === 'mochi') {
      const headers = {
        "Authorization": "Basic NzI3MTQ3NGRkYzFkMDYxNzQwZTlhMGU2Og=="
      }
      axios.post(`https://app.mochi.cards/api/cards/?deck-id=${deckId}&content=card`, {
        "content": "front/back test.",
        "deck-id": "nXXd2JvP",
        "fields": {
          "name": {
            "id": "name",
            "value": text
          },
          "V72yjxYh": {
            "id": "V72yjxYh",
            "value": translatedText
          }
        }
      }, {
        "headers": headers
      })
      }
    else {
      const tabJoined = rowsRef.current.map(e => e.join("\t"))
      const newlineJoined = tabJoined.join("\n")
      let tsvContent = "data:text/tab-separated-values;charset=utf-8," 
          + newlineJoined;
      console.log('tabJoined', tabJoined)
      console.log('newlineJoined', newlineJoined)
      console.log('tsvContent', tsvContent)

      var encodedUri = encodeURI(tsvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.tsv");
      document.body.appendChild(link); // Required for FF
      
      link.click();
    }
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
    <Stack gap={15} justifyContent={'center'} alignItems={'center'} marginTop={10} flexDirection={'row'} >
      <UploadImage 
        images = {images}
        setImages = {setImages}
        makeFlashcards = {makeFlashcards}
        addFlashcards = {addFlashcards}
      />
      
      <Stack>
      
      {!!text && 
        <>
          <Typography variant='h5'>Original Text</Typography>
          <Stack padding={2} width={400} height={200} marginBottom={3} sx={{border: 1, borderColor: 'gray'}} overflow={'scroll'}>
            {text}
          </Stack>
        </>
      }
      
      
      {!!translatedText && 
      <>
      <Typography variant='h5'>Translated Text</Typography>
      <Stack padding={2} width={400} height={200} marginBottom={3} sx={{border: 1, borderColor: 'gray'}} overflow={'scroll'}>
        {translatedText}
      </Stack>
      </>
      }
      
      <Stack flexDirection={'row'} gap={1}>
        <RadioGroup>
          <FormControl>
            <FormControlLabel value="mochi" onChange={onOutputTypeSelect} checked={outputType === 'mochi'} control={<Radio />} label="Mochi" />
            <FormControlLabel value="csv" onChange={onOutputTypeSelect} checked={outputType === 'csv'} control={<Radio />} label="CSV File" />
          </FormControl>
        </RadioGroup>
        <Stack justifyContent={'center'} sx={{minHeight: '100%'}}>
          <Button sx={{height: 50}} variant='contained' onClick={makeFlashcards}>Make Flashcards</Button>
        </Stack>
      </Stack>
    </Stack>

      
    </Stack>
  );
}