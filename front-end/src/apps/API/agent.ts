import axios, { AxiosError, AxiosResponse } from "axios"
import { store } from "../Redux/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:7076/api/';
axios.defaults.withCredentials = true;;

const responseBody = (response : AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),

    postForm: (url: string, data: FormData) => axios.post(url, data, {headers: {'Content-type': 'multipart/form-data'}}).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {headers: {'Content-type': 'multipart/form-data'}}).then(responseBody),
}

const Category = {
    list: () => requests.get('category'),
}

const Brand = {
    list: () => requests.get('brand'),
}

const Product = {
    list: (params: URLSearchParams) => requests.get('product', params),
    details: (id: number) => requests.get(`product/${id}`),
    filtersValue : () => requests.get('product/filters'),
}

const Basket = {
    get: () => requests.get('/basket'),
    add: (productId: number, quantity: number) => requests.post(`/basket?productId=${productId}&quantity=${quantity}`, {}),
    remove: (productId: number, quantity: number) => requests.delete(`/basket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress'),
}

const Orders = {
    list: () => requests.get('order'),
    fetch: (id: number) => requests.get(`order/${id}`),
    create: (values: any) => requests.post('order', values)
}

const createFormData = (item: any) => {
    let formData = new FormData();
    for(const key in item) {
        formData.append(key, item[key]);
    }
    return formData;
}

const Admin = {
    createCategory: (category: any) => requests.postForm('category', createFormData(category)),
    updateCategory: (category: any) => requests.putForm('category', createFormData(category)),
    deleteCategory: (id: any) => requests.delete(`category/${id}`),

    createBrand: (brand: any) => requests.postForm('brand', createFormData(brand)),
    updateBrand: (brand: any) => requests.putForm('brand', createFormData(brand)),
    deleteBrand: (id: any) => requests.delete(`brand/${id}`),

    createProduct: (product: any) => requests.postForm('product', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('product', createFormData(product)),
    deleteProduct: (id: any) => requests.delete(`product/${id}`),
}

const agent = {
    Category,
    Brand,
    Product,
    Admin,
    Basket,
    Account,
    Orders,
}

export default agent;