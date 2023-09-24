import { UploadFile } from '@mui/icons-material'
import { FormControl, Typography, FormHelperText } from '@mui/material'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, UseControllerProps } from 'react-hook-form'
import { uploadURL } from '../../utils/utils'

interface Props extends UseControllerProps {
    watchFile: any;
    selectedObject: any;
}

export default function AppDropzone(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: null })

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: 200,
        width: 400,
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles[0] = Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) });
        field.onChange(acceptedFiles[0]);
    }, [field])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <FormControl style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} error={!!fieldState.error} >
                <input {...getInputProps()} />
                {props.watchFile ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <img src={props.watchFile.preview} alt="preview" style={{ width: 200, height: 200 }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <UploadFile sx={{ fontSize: '50px' }} />
                            <Typography variant='h6'>Change image !</Typography>
                            <Typography variant='h6'>{props.watchFile.path}</Typography>
                        </div>
                    </div>
                ) : (

                    props.selectedObject ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <img src={uploadURL + props.selectedObject.pictureUrl} alt="preview" style={{ width: 200, height: 200 }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <UploadFile sx={{ fontSize: '50px' }} />
                                <Typography variant='h6'>Change image !</Typography>
                                <Typography variant='h6'>{props.watchFile?.path}</Typography>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 30 }} >
                            <UploadFile sx={{ fontSize: '100px' }} />
                            <Typography variant='h4'>Drop image here</Typography>

                        </div>
                    )

                )
                }
                <FormHelperText> {fieldState.error?.message}</FormHelperText>
            </FormControl >

        </div >
    )
}