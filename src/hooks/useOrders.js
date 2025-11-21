import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderAPI } from '../services/apiMethods';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData) => orderAPI.create(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useOrder = (orderNumber) => {
  return useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => orderAPI.getByNumber(orderNumber).then(res => res.data.data),
    enabled: !!orderNumber,
  });
};

export const useUserOrders = (params) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderAPI.getUserOrders(params).then(res => res.data),
  });
};