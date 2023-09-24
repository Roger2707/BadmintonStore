import * as yup from 'yup';

export const validationSchema = [
    // Category
    yup.object({
        name: yup.string().required(),
    }),

    // Brand
    yup.object({
        name: yup.string().required(),
        country: yup.string().required(),
    }),

    // Product
    yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required("Price is not an empty value!").moreThan(10000, "Price is more than 10,000 VND"),
        quantityInStock: yup.number().required("Quantity is not an empty value!").moreThan(10, "Quantity is more than 10 in stock"),
        categoryId: yup.number().required().moreThan(0, "Category is not be null"),
        brandId: yup.number().required().moreThan(0, "Brand is not be null"),
        // file: yup.mixed().when('pictureUrl', {
        //     is: (value: string) => !value,
        //     then: (schema) => schema.required('Please provide an image')
        // })
    }),
]