


'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Phone, MessageSquare, User } from 'lucide-react';
import { useRouter } from 'next/navigation';


const UserVideoCall = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const router = useRouter()

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // const socketInstance = io("https://carepointcommunication.eyescart.shop");
    const socketInstance = io("https://carepointcommunication.eyescart.shop", {
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);  
    });

    socketInstance.on('ice-candidate', (data) => {
      console.log('ICE candidate received:', data);
      const peerConnection = peerConnectionRef.current;
      if (peerConnection && data.candidate) {
        const candidate = new RTCIceCandidate(data.candidate);
        peerConnection.addIceCandidate(candidate)
          .then(() => {
            console.log('Successfully added ICE candidate');
          })
          .catch((error) => {
            console.error('Error adding ICE candidate', error);
          });
      }
    });

    socketInstance.on('call-created', async (call) => {
      console.log('Call created:', call);
      const peerConnection = peerConnectionRef.current;
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(call.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socketInstance.emit('answer', { roomId, answer });
        console.log('answer-call is created', answer);
      }
    });

    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //   .then(stream => {
    //     localStreamRef.current = stream;
    //     if (localVideoRef.current) {
    //       localVideoRef.current.srcObject = stream;
    //     }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localStreamRef.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      console.log('Local stream set to video element:', stream);
    } else {
      console.warn('Local video element not found.');
    }


        // const peerConnection = new RTCPeerConnection({
        //   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        // });

        const peerConnection = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:51.21.131.193:3478' }
          ]
        });
        

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        peerConnectionRef.current = peerConnection;

        peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
          if (event.candidate && socketInstance) {
            socketInstance.emit('ice-candidate', {
              roomId: roomId,
              candidate: event.candidate,
            });
          }
        };

        // peerConnection.ontrack = (event: RTCTrackEvent) => {
        //   if (remoteVideoRef.current) {
        //     remoteVideoRef.current.srcObject = event.streams[0];
        //   }
        // };
        peerConnection.ontrack = (event: RTCTrackEvent) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            console.log('Remote stream added:', event.streams[0]);
          } else {
            console.warn('Remote video element not found.');
          }
        };
        
      });

    return () => {
      if (socketInstance) socketInstance.disconnect();
      if (peerConnectionRef.current) peerConnectionRef.current.close();
    };
  }, [roomId]);

  useEffect(() => {
    const doctorData = localStorage.getItem('doctorOnlineAppoinemnets')
    const userData = localStorage.getItem('user')
    console.log('userData',userData)
    console.log('doctorData',doctorData)
    if(doctorData && userData){
      const parseDocData = JSON.parse(doctorData)
      const parseUserData = JSON.parse(userData)
      const doctorEmail = parseDocData.email;
      const userEmail = parseUserData.email;
      console.log('doctor',doctorEmail)
      console.log('doctor',userEmail)
      setRoomId(btoa(`${userEmail}`));
    }
  }, []);

  const startCall = async () => {
    console.log('jeeee',peerConnectionRef.current)
    if (!peerConnectionRef.current || !socket || !roomId) return;
    socket.emit('join-room', { roomId });
    setIsCallActive(true);
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCallActive(false);
    router.push('/user/Home')
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="w-full max-w-6xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h2 className="text-3xl font-extrabold tracking-wider">Video Consultation</h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 bg-gray-900 rounded-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  You
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  Doctor
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-white text-gray-800'
                } hover:shadow-lg`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-white text-gray-800'
                } hover:shadow-lg`}
              >
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
              </button>
              <button
                onClick={isCallActive ? endCall : startCall}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isCallActive ? 'bg-red-500' : 'bg-green-500'
                } text-white hover:shadow-lg`}
              >
                {isCallActive ? <PhoneOff size={24} /> : <Phone size={24} />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserVideoCall;