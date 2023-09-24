import { FormControl, TextField, debounce } from "@mui/material";
import { useState } from "react";

interface Props {
    label: string;
    onChange : (e: any) => void;
}
export default function TextFieldSearch({label, onChange}: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = debounce((e: any) => {
        onChange(e);
    }, 500);
    
    return (
        <FormControl sx={{width: '100%'}} >
            <TextField
                fullWidth
                sx={{background: '#fff'}}
                value={searchTerm ?? ''}
                onChange={(e: any) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e);
                }}
                label={label}
            />
        </FormControl>
    )
}