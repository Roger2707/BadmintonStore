import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch } from "../../Redux/configureStore";
import { setProductParams } from "../../Redux/productSlice";
import { useState } from "react";

interface Props {
    items: string[];
    type: string;
}

export default function CheckboxButton({items, type}: Props) {
    const dispatch = useAppDispatch();
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    
    const handleChange = (e: any) => {
        let newCheck = e.target.value;
        let selectedValues : any[] = [];
        const checkIndex = checkedItems.findIndex(value => value === newCheck);
        
        if(checkIndex === -1) selectedValues = [...checkedItems, newCheck];
        else selectedValues =  checkedItems.filter(item => item !== newCheck);

        //console.log(selectedValues);
        setCheckedItems(selectedValues);
        dispatch(setProductParams({[type]: selectedValues}));
    }

    return (
        <FormGroup>
            {items.map((item, index) => (
                <FormControlLabel
                    key={item + index}
                    label={item}
                    onChange={handleChange}
                    control={<Checkbox value={item}  />}
                />
            ))}
        </FormGroup>
    )
}