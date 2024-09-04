import { Box, Button, FormControl, FormLabel, Slider, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { Image } from '@mui/icons-material'
import { FaCrop } from 'react-icons/fa'



import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { generateImageUrl } from '../../services/url.service'


export default function FileInput({ file, setFile, type, previousFile, typesAccepted, label, ...props }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    const [crop, setCrop] = useState("");
    const [contrastValue, setContrastValue] = useState(1)
    const id = useMemo(() => nanoid(), [])
    const [finalFile, setFinalFile] = useState(null)
    const previousFileImage = useMemo(() => {
        if (previousFile && typeof previousFile === 'string') {
            const extension = previousFile.slice(previousFile.length - 3)
            if (extension === 'pdf') {
                return false
            }
        }

        return true
    }, [previousFile])

    console.log(previousFile)

    const fileType = useMemo(() => {
        if (type) {
            return type
        }
        return 'photo'
    }, [type])

    const fileTypeRegex = useMemo(() => {
        if (typesAccepted) {
            return typesAccepted
        }
        return 'image/*'
    }, [typesAccepted])

    const [localFile, setLocalFile] = useState(null)

    // useEffect(() => {
    //     setLocalFile(file)
    // }, [file])

    const setfile = (value) => {
        if (setFile) {
            setFile(value)
            setFinalFile(value)
        }
        setLocalFile(value)
    }

    const onChange = (e) => {
        setLoading(true);
        if (e.target.files.length > 0) {
            setfile(e.target.files[0])

        } else {
            setfile(null)
        }
    }

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
     */
    const dropHandler = (ev) => {
        console.log('File(s) dropped')
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault()
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    const file = ev.dataTransfer.items[i].getAsFile()
                    console.log(`… file[${i}].name = ${file.name}`)
                    setfile(ev.dataTransfer.files[i])
                    break
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                setfile(ev.dataTransfer.files[i])
                break
            }
        }
    }

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
     */

    const dragOverHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault()
    }

    const imageRef = useRef()

    ///////converting base64 to file
    function base64toFile(base64String, filename) {
        const arr = base64String.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])

        let n = bstr.length
        const uint8Array = new Uint8Array(n)
        while (n--) {
            uint8Array[n] = bstr.charCodeAt(n)
        }

        const blob = new Blob([uint8Array], { type: mime })
        return new File([blob], filename, { type: mime })
    }

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const imgRef = imageRef.current
        imgRef.crossOrigin = 'Anonymous'

        const img = new Image()
        console.log(localFile?.name, "localFile.name")
        if (localFile && localFile.name) {
            ////////////////////////set the file object here to make a valid source for the canvas to work
            img.src = URL.createObjectURL(localFile)
        } else {
            ///////image from backend
            img.src = generateImageUrl(previousFile)
        }
        /////////////////////////////
        console.log(img, 'img')
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            const contrast = contrastValue // Set your contrast value here

            for (let i = 0; i < data.length; i += 4) {
                const red = data[i]
                const green = data[i + 1]
                const blue = data[i + 2]

                // Apply contrast formula
                const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue
                const newGray = contrast * (gray - 128) + 128

                const newRed = contrast * (red - 128) + 128
                const newBlue = contrast * (blue - 128) + 128
                const newGreen = contrast * (green - 128) + 128

                data[i] = newRed
                data[i + 1] = newGreen
                data[i + 2] = newBlue
            }

            ctx.putImageData(imageData, 0, 0)
            console.log('after load')
            setFinalFile(canvas.toDataURL())

            let filea = base64toFile(
                canvas.toDataURL(),
                localFile?.name ? localFile?.name : previousFile ? previousFile : 'e.png'
            )
            setFile(filea)
            // setFile(tfile)
            ////////////////////conversion of base64 to image file
            console.log(base64toFile(canvas.toDataURL()))
        }
    }, [contrastValue, previousFile, localFile])


    const onImageLoaded = (image) => {
        setLoading(false)
        setCrop({ ...crop, width: image.width });
    };

    const onCropComplete = (crop) => {
        console.log(crop);
        // handleCrop()
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const handleCrop = () => {

        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = finalFile;

        image.onload = () => {
            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );

            let filea = base64toFile(
                canvas.toDataURL(),
                localFile?.name ? localFile?.name : previousFile ? previousFile : 'e.png'
            )
            const newUrl = canvas.toDataURL('image/jpeg');
            setCroppedImageUrl(newUrl);
            setLocalFile(filea);
            setFinalFile(filea)
            setFile(filea)
        };


        // const image = new Image();
        // image.src = finalFileBlob;

        // const canvas = document.createElement('canvas');
        // canvas.width = crop.width;
        // canvas.height = crop.height;

        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(
        //     image,
        //     crop.x,
        //     crop.y,
        //     crop.width,
        //     crop.height,
        //     0,
        //     0,
        //     crop.width,
        //     crop.height
        // );

        // const newUrl = canvas.toDataURL('image/jpeg');
        // setCroppedImageUrl(newUrl);
    };

    return (
        <>

            <FormControl
                sx={{
                    // minWidth: '50vw',
                    // backgroundColor: 'red',
                    width: '100%',
                    position: "relative"
                    // maxWidth: '100%',
                }}
            >
                {/* 
                {loading &&
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
                        <svg viewBox="0 0 24 24" width="100" height="100">
                            <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="3" fill="none">
                                <animate attributeName="stroke-dasharray" values="1, 200;89, 200;89, 200" keyTimes="0; 0.5; 1" dur="1.5s" repeatCount="indefinite" />
                                <animate attributeName="stroke-dashoffset" values="0; -35; -124" keyTimes="0; 0.5; 1" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                } */}
                <FormLabel sx={{ color: 'black', fontSize: '1.2rem', marginBottom: 1 }}>
                    {label}

                    {previousFile && !previousFileImage && (
                        <a href={generateImageUrl(previousFile)} target="_blank" rel="noopener noreferrer">
                            <Typography sx={{ textDecoration: 'underline' }}>View Preview</Typography>
                        </a>
                    )}
                </FormLabel>




                <Button style={{ marginLeft: "auto", textTransform: "capitalize" }} onClick={() => handleOpen()}>
                    <FaCrop />  <span className='ms-2'> Crop</span>
                </Button>


                <Box
                    sx={{
                        minHeight: 120,
                        width: '100%',
                        borderWidth: 2,
                        borderStyle: 'dotted',
                        borderColor: 'lightgray',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                        cursor: 'pointer',
                        position: "relative"
                    }}
                    onDrop={dropHandler}
                    onDragOver={dragOverHandler}
                    component="label"
                    htmlFor={`fileinput_${id}`}
                >





                    {/* ////////final output from the image manipulation function///////// */}
                    <img ref={imageRef} src="" alt="" />
                    {finalFile &&
                        <img width={250} src={finalFile} alt="" />
                    }
                    {/* ////////final output from the image manipulation function///////// */}

                    {!finalFile && previousFile && !localFile?.name ? (
                        previousFileImage && `${previousFileImage}`.includes('base64') ? (
                            <></>
                        ) : (
                            <img src={generateImageUrl(previousFile)} alt="pan" style={{ margin: 10, width: 250 }} />
                        )
                    ) : (
                        <></>
                        //////comented because i had to use javascripts Image function which was colliding with this so i comented it
                        // <Image
                        //     sx={{
                        //         fontSize: '3rem',
                        //         color: '#131F73',
                        //     }}
                        // />
                    )}

                    {localFile?.name ? (
                        <Typography>{localFile?.name}</Typography>
                    ) : (
                        <Typography>
                            Drag the {fileType} here or <b>browse</b>
                        </Typography>
                    )}
                    <input
                        type="file"
                        {...props}
                        onChange={onChange}
                        id={`fileinput_${id}`}
                        style={{ display: 'none' }}
                        accept={fileTypeRegex}
                    />
                </Box>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <Typography variant="overline" sx={{ textAlign: 'center', width: '100%', flex: 1 }}>
                    Contrast:
                </Typography> */}
                {/* <Slider
                    aria-label="Contrast"
                    defaultValue={1}
                    // getAriaValueText={setContrastValue}
                    onChangeCommitted={(e, val) => setContrastValue(val)}
                    // value={contrastValue}
                    valueLabelDisplay="auto"
                    step={0.1}
                    marks
                    min={-1}
                    max={3}
                /> */}
            </Box>


            <Dialog open={open} fullScreen onClose={handleClose} >
                <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box>
                        {finalFile &&
                            <>
                                <ReactCrop crop={crop} keepSelection={false}
                                    onImageLoaded={onImageLoaded}
                                    onComplete={onCropComplete}
                                    onChange={onCropChange}
                                >
                                    <img src={finalFile} alt="" />
                                </ReactCrop>
                            </>
                        }

                        {/* <img src={croppedImageUrl} style={{ marginTop: 30 }} alt="" /> */}
                        {/* ////////final output from the image manipulation function///////// */}

                        {!finalFile && previousFile && !localFile?.name ? (
                            previousFileImage && `${previousFileImage}`.includes('base64') ? (
                                <></>
                            ) : (
                                <img src={generateImageUrl(previousFile)} alt="pan" style={{ margin: 10, width: 250 }} />
                            )
                        ) : (
                            <></>
                            //////comented because i had to use javascripts Image function which was colliding with this so i comented it
                            // <Image
                            //     sx={{
                            //         fontSize: '3rem',
                            //         color: '#131F73',
                            //     }}
                            // />
                        )}


                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 2 }}>
                        <Button sx={{ marginRight: 5 }} onClick={() => { handleCrop() }} variant="contained" color="info">
                            Crop
                        </Button>
                        <Button onClick={() => { handleClose(); }} variant="contained" color="error">
                            Close
                        </Button>
                    </Box>
                </DialogContent>

            </Dialog>


        </>
    )
}
