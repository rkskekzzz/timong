## 노드를 빌드하고 실행시키는 이미지를 가져온다.
FROM node:20 as builder

#Proejct의 모든 파일을 WORKDIR == /app 으로 복사한다.
WORKDIR /app
COPY ./ ./

#빌드
RUN npm i
RUN npm run build

#serve로 구동하기 위해 설치
RUN npm i -g serve

ENTRYPOINT [ "serve" ]
CMD [ "-s", "./build", "-l", "3000" ]
