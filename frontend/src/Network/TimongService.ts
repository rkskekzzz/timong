// import axios from 'axios';
// import { User, Notification } from '../Entities';
// import * as API from './APIType';
// // # 유저 /users

// // - 인증
// //     - 로그아웃 DELETE /users/logout
// //     - 깃헙 로그인 인증 POST /users/github
// //     - 유저 42 인증 요청
// //         - 42 로그인으로 인증 요청 POST /users/42auth/login
// //         - 42 이메일로 인증 요청 POST /users/42auth/email
// //     - 회원 탈퇴 DELETE /users
// // - 정보
// //     - 로그인 및 내 정보 가져오기  GET /users
// //     - 프로필  정보 수정 PUT /users/profile
// //     - 닉네임 중복확인 GET /users/nickname
// // - 알람
// //     - 가져오기 GET /users/alarm
// //     - 읽음 PUT /users/alarm/readall <❗️추후 수정 여지 있음❗️>

// const generateRandomUser = () => {
//   const id = 1;
//   const nickname = 'ycha';
//   const is_authenticated = true;
//   const role = 'CADET';
//   const charactor = 'https://picsum.photos/200/200';

//   return new User(id, nickname, is_authenticated, role, charactor);
// };

// const UserService = {
//   signOut: () => {},
//   validateGithub: (token) => {
//     return true;
//   },
//   validate42Login: (intra_token) => {
//     return true;
//   },
//   validate42Email: (intra_id) => {
//     return true;
//   },
//   deleteUser: () => {},
// };

// export default UserService;
