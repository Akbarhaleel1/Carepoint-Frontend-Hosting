import { io } from 'socket.io-client';

const socketInstance = io("https://redirect.eyescart.shop/communication-service", {
    transports: ["websocket"],
    secure: true, 
    path: "/communication-service/socket.io",
});
