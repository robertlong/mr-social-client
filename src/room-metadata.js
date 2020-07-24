import getHubId from "./utils/hub-id";

const roomMapping = window.ROOM_MAPPING || {
  "room2": "/XRfKSWB/room-2",
  "room3": "/fcWA7EE/room-3",
  "lobby": "/3maDzA9/lobby",
};

var roomMetadata = {
  "room1": { // Tianyi's room
    streamUrl: "https://str33m.dr33mphaz3r.com/stream"
  },
  "room2": { // Kynan's room
    streamUrl: "https://str33m.dr33mphaz3r.com/stream"
  },
  "room3": { // Henry's room
    baseSpeed: 100,
    flyMode: true,
    streamUrl: "https://str33m.dr33mphaz3r.com/stream"
  },
  "lobby": {
    streamUrl: "https://str33m.dr33mphaz3r.com/stream"
  }
}

for(var key in roomMapping) {
  roomMetadata[key].url = roomMapping[key];
}

var hubIdToRoomKey = {};
for(var key in roomMapping){
  var url = roomMapping[key];
  var hubId = url.split('/')[1];
  hubIdToRoomKey[hubId] = key;
}

export default function getRoomMetadata(roomKey) {
  if (!roomKey) {
    const hubId = getHubId();
    roomKey = hubIdToRoomKey[hubId]
  }
  return roomMetadata[roomKey] || {}
}