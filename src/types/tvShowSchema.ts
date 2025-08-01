// src/schemas/tvshowSchema.ts
import * as yup from 'yup';

export const tvShowSchema = yup.object({
  title: yup.string().required('Title is required'),
  type: yup.string().oneOf(['Movie', 'TV Show']).required('Type is required'),
  director: yup.string().required('Director is required'),
  budget: yup
    .number()
    .typeError('Budget must be a number')
    .positive('Budget must be positive')
    .required('Budget is required'),
  location: yup.string().required('Location is required'),
  duration: yup.string().required('Duration is required'),
  year: yup.string().required('Year is required'),
});

// 👇 Export schema type using yup.InferType
export type TVShowFormSchema = yup.InferType<typeof tvShowSchema>;
