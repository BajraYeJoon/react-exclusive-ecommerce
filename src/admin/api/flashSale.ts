import { Axios } from './../../common/lib/axiosInstance';
import { handleRequest } from '../../common/api/handleRequest';

export const addProductToFlashSale = async (productId: number[]) => {