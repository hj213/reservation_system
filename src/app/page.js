'use client'

import { useEffect, useState} from "react"; 
import { useDispatch, useSelector } from "react-redux";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';

import Image from 'next/image';
import Logo from '../image/logo.png';
import { Provider } from "react-redux";
import store from "../store";

export default function Home() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  const [selected, setSelected] = useState(today);
  console.log(selected);

  const disabledDays = [
    { from: new Date(2024, 2, 18), to: new Date(2024, 2, 29) }
  ];

  //튜터
  const tutors = useSelector(state => state.tutors);
  console.log(tutors);

  return (
      <div>
        {/* nav */}
        <div class="flex items-center gap-x-7 h-16 bg-slate-50 border-b border-slate-200">
          <button class="ml-7 text-xs text-violet-600 "> &lt; 나가기 </button>
          <div class="w-7"><Image src={Logo} alt='logo'></Image></div>
          <div class="font-bold text-slate-600"> 수업 예약 </div>
          <div class="text-sm text-slate-600"> STEP 1. 튜터 및 시간 선택 </div>
          <div class="flex-grow text-sm">
            <select class="w-96 h-10 px-4 rounded-md border border-slate-300">
              <option value="20">
                20분 1회 수업권 (0회 남음)
              </option>
              <option>40분 수업</option>
            </select>
          </div>

          <div class="text-sm mr-[-15px] text-slate-600">예약 신청한 수업</div>
          <div class="text-sm text-violet-600">0</div>
          <button class="w-32 h-10 mr-7 rounded-md bg-slate-200 text-sm text-slate-400">다음</button>
        </div>

        {/* body */}
        <div class="flex ">
          <div class="flex w-3/4 border-r border-slate-200">
            <div class="w-1/4 mt-10">
              <DayPicker locale={ko} mode="single" selected={selected} onSelect={setSelected} showOutsideDays/>
            </div>
            <div class="w-3/4 bg-slate-400">
              위크 시간 선택
            </div>
          </div>
          <div class="w-1/4">
            <div>
              {tutors.map((tutor) => (
                <div>{tutor.name}</div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
  );
}
