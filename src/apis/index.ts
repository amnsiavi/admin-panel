import axios from 'axios';



const Instance = axios.create({
    baseURL:'http://127.0.0.1:8000/car-inventory/',
    headers:{
        'Content-Type':'application/json'
    }
})

export default Instance

