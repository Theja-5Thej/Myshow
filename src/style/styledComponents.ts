import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import { Field, ErrorMessage } from 'formik';
export const Search = styled('div')(({ }) => ({
   position: 'relative',
   borderRadius: '8px',
   backgroundColor: '#fff',
   marginLeft: 0,
   width: '100%',
   paddingLeft: '10px',
   paddingRight: '10px'
}));
export const SearchIconWrapper = styled('div')(({ }) => ({
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));
export const StyledInputBase = styled(InputBase)(({ }) => ({
   color: 'inherit',
   width: '100%',
   paddingLeft: '24px',
   height: '100%'
}));

export const MainContainer = styled.div`
  padding: 30px 27px;
 
  `;
export const CardItem = styled.div`
max-width: 250px;
min-height: 300px;
border: 1px solid grey;
border-radius:8px;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: white;
gap: 8px;
padding: 8px;
.title {
    font-size: 14px;
    font-weight: bold;
    /* color: whitesmoke; */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  .price{
   font-size: 14px;
    font-weight: bold;
    /* color: whitesmoke; */
  }
  .btn1{
   
  }
  p{
margin: 0;
  }
`;

export const StyledField = styled(Field)`
height: 24px; 
padding: 2px 8px; 
border: 1px solid #ccc; 
border-radius: 4px;
font-size: 14px;
width: 100%;
color: black;
outline: none !important;
&:focus{
   border: 1px solid orange; 
}
`;
export const ErrorMsg = styled(ErrorMessage)`
font-size: 12px;
font-weight: 400;
color: red;
`;