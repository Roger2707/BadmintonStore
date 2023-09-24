import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface Props {
    label: string;
    items: any[];
    onChange: (e: any) => void;
}

export default function SelectListButton({ items, onChange, label }: Props) {

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange = (e: any) => {
        setSelectedValue(e.target.value);
        onChange(e);
    }

    return (
        <FormControl sx={{ width: '100%' }} >
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedValue ? selectedValue : ''}
                label='Sort Products:'
                onChange={handleChange}
                fullWidth
                sx={{ backgroundColor: 'white' }}
            >
                {
                    items.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>
                                {item.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}