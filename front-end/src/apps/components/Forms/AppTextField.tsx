import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    fullWidth?: boolean;
    defaultValue? : number;
    styles?: any, 
}

export default function AppTextField(props: Props) {
    const {field, fieldState} = useController({...props, defaultValue: props?.defaultValue ? 0 : ''});

    return (
        <TextField
            {...props}
            {...field}
            type={props?.type}
            multiline={props?.multiline}
            rows={props?.rows}
            variant="outlined"
            fullWidth = {props.fullWidth === true ? true : false}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{backgroundColor: '#fff', borderRadius: '10px', ...props.styles}}
        />
    )
}