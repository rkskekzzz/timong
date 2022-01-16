// import React, { useState, useContext } from 'react';
// import { useFormik } from 'formik';
// import { Input } from '@mui/material';
// import { validForm } from '../../Utils/validForm';
// import { UserContext } from '../Timong';
// import { User } from 'src/Entities/User';
// import Styled from './NameInput.styled';

// const NameInput: React.FC<{ color: string }> = ({ color }) => {
//   const dispatch = useContext(UserContext);
//   const [isError, setIsError] = useState<{ color: boolean; name: boolean }>({
//     color: false,
//     name: false,
//   });

//   const formik = useFormik({
//     initialValues: {
//       userName: '',
//     },
//     onSubmit: () => {
//       console.log('submit');
//     },
//   });

//   const toggleError = (error: string) => {
//     const initError = { color: false, name: false };
//     const newError = { color: false, name: false };

//     if (error === 'color') newError.color = true;
//     else newError.name = true;

//     setIsError(newError);
//     setTimeout(() => setIsError(initError), 1000);
//   };

//   const handleSubmitButton = () => {
//     if (isError.color || isError.name) return;

//     try {
//       validForm(formik.values);
//     } catch (error) {
//       const _err = error as string;
//       return toggleError(_err);
//     }

//     if (!dispatch) throw new Error('no dispatch');
//     const user = new User(formik.values.userName, color, []);
//     dispatch({ type: 'ADD', user });
//     resetScrollEffect(scrollRef);
//     formik.resetForm();
//   };

//   return (
//     <>
//       <Input
//         error={isError.name ? true : false}
//         autoComplete="false"
//         id="userName"
//         placeholder="닉네임을 입력하세요..."
//         value={formik.values.userName}
//         onChange={formik.handleChange}
//       />
//       <Styled.ModalBoxButton
//         onClick={handleSubmitButton}
//         variant="contained"
//         color="primary"
//         sx={{ bgcolor: 'Background.paper' }}
//       >
//         <Styled.ModalBoxSpan>확인</Styled.ModalBoxSpan>
//       </Styled.ModalBoxButton>
//     </>
//   );
// };

// export default React.memo(NameInput);
