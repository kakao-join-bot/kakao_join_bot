// index.js
// 카카오 오픈채팅 입퇴장 + 개인별 입장 횟수 추적 봇 (Node.js)

import fs from "fs";

const userDataFile = "./userData.json";
let userJoinCounts = {};

if (fs.existsSync(userDataFile)) {
  userJoinCounts = JSON.parse(fs.readFileSync(userDataFile, "utf8"));
}

function onUserJoin(userName) {
  if (!userJoinCounts[userName]) {
    userJoinCounts[userName] = 1;
  } else {
    userJoinCounts[userName]++;
  }

  const count = userJoinCounts[userName];
  sendMessage(`🎉 ${userName}님이 입장했습니다! (${count}번째 입장이에요 😎)`);

  fs.writeFileSync(userDataFile, JSON.stringify(userJoinCounts, null, 2));
}

function onUserLeave(userName) {
  sendMessage(`👋 ${userName}님이 퇴장했습니다.`);
}

function sendMessage(msg) {
  console.log(msg);
  // 실제로는 카카오 API 또는 오픈채팅 메시지 전송 코드가 들어감
}

// 테스트용 예시 (Render 서버 테스트 시)
onUserJoin("진형");
onUserJoin("민수");
onUserJoin("진형");
