import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productAPI } from '../services/apiMethods';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productAPI.getAll(params).then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getById(id).then(res => res.data.data),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productAPI.getFeatured().then(res => res.data.data),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (category, params) => {
  return useQuery({
    queryKey: ['products', 'category', category, params],
    queryFn: () => productAPI.getByCategory(category, params).then(res => res.data),
    enabled: !!category,
  });
};