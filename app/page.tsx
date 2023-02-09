import React from "react";

import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="w-8 h-8 "></SunIcon>
            <h2>一些例子</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">“给我解释一下什么东西”</p>
            <p className="infoText">"狗和猫之间有什么区别？"</p>
            <p className="infoText">“太阳是什么颜色？”</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="w-8 h-8 "></BoltIcon>
            <h2>能力范围</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">“模仿北京人 和我聊天”</p>
            <p className="infoText">"制造一个架空朝代"</p>
            <p className="infoText">“理解你的话语”</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="w-8 h-8 "></ExclamationTriangleIcon>
            <h2>限制</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">不能和我说有害言论</p>
            <p className="infoText">不会告诉你有害言论</p>
            <p className="infoText">不要用来做坏事</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
