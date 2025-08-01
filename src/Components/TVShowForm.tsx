import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { TVShow } from '../types/tvshow';
import { TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import { tvShowSchema } from '../types/tvShowSchema';
import type { TVShowFormSchema } from '../types/tvShowSchema'
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";


interface Props {
  onSubmit: (data: Partial<TVShow>, imageUrl?: string) => void;
  closeModal: () => void;

  initialData?: Partial<TVShow>;
}

export const TVShowForm = ({ onSubmit, closeModal, initialData = {} }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue, // ✅ this must be here
  } = useForm<TVShowFormSchema>({
    resolver: yupResolver(tvShowSchema),
    defaultValues: {
    type: 'Movie',
  },
  });

  useEffect(() => {
    Object.entries(initialData).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof TVShowFormSchema, value); // ✅ Correct generic typing
      }
    });
  }, [initialData, setValue]);

  const onFormSubmit = (data: Partial<TVShow>) => {
    onSubmit(data, imageUrl || '');
    closeModal()
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const storage = getStorage();
    const fileRef = ref(storage, `images/${Date.now()}-${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      console.log("✅ Public URL:", downloadUrl);
      setImageUrl(downloadUrl); // Save or use the URL
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-xl mx-auto  shadow-md rounded-2xl p-6 md:p-8 space-y-6 "
    >
      <h1 className="text-2xl font-bold mb-4 text-sky-500">
        {Object.entries(initialData).length !== 0 ? 'Edit Show' : 'Add New Show'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <Controller
          name="type"
          control={control}
          defaultValue="Movie"
          render={({ field }) => (
            <TextField
              select
              label="Type"
              {...field}
              error={!!errors.type}
              helperText={errors.type?.message}
              fullWidth
            >
              <MenuItem value="Movie">Movie</MenuItem>
              <MenuItem value="TV Show">TV Show</MenuItem>
            </TextField>
          )}
        />

        <TextField
          label="Director"
          {...register('director')}
          error={!!errors.director}
          helperText={errors.director?.message}
          fullWidth
        />


        <TextField
          label="Budget"
          type="number"
          {...register('budget')}
          error={!!errors.budget}
          helperText={errors.budget?.message}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />



        <TextField
          label="Location"
          {...register('location')}
          error={!!errors.location}
          helperText={errors.location?.message}
          fullWidth
        />

        <TextField
          label="Duration"
          type="number"
          {...register('duration')}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">mins</InputAdornment>,
          }}
        />

        <TextField
          label="Year"
          type="number"
          {...register('year')}
          error={!!errors.year}
          helperText={errors.year?.message}
          fullWidth
        />
      </div>

      <div className='hidden'>
        <label className="block mb-2 text-sm font-medium text-gray-700">Upload Poster</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded border border-gray-300 p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      <div className="flex justify-end">
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>

  );
};
