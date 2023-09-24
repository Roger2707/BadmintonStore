import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    items?: any[];
    onChange?: any;
}

export default function AppSelectList(props: Props) {
    const {field, fieldState} = useController({...props, defaultValue: ''});

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value}
                label={props.label}
                onChange={field.onChange}
                sx={{backgroundColor: '#fff', borderRadius: '10px'}}
            >
                <MenuItem value={0} selected hidden ></MenuItem>
                {
                    props.items!.map((item: any) => {
                        return (
                            <MenuItem key={item.id + item.name} value={item.id} >
                                {item.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}