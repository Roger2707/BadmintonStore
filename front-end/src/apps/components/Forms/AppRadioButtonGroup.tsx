import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label:string;
    options: any[];
}

export default function AppRadioButtonGroup(props: Props) {

    const {field, fieldState} = useController({...props, defaultValue: ''});

    return (
        <FormControl component="fieldset" error={!!fieldState.error} >
            <FormLabel>{props.label}</FormLabel>
            <RadioGroup {...field}>
                {props.options.map(({ value, label }) => (
                        <FormControlLabel
                            value={value}
                            control={<Radio />}
                            label={label} key={value}
                        />
                ))}
            </RadioGroup>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}