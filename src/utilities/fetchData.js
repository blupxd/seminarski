import axios from 'axios'

const fetchItems = async (param) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products${param}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchItems