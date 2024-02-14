'use client'

import { DayPicker } from 'react-day-picker';

export default function Home() {
  return (
    <div>
      {/* nav */}
      <div class="h-[70px] bg-slate-50 border-b border-slate-200">
      </div>
      {/* body */}
      <div class="flex ">
        <div class="flex w-3/4 border-r border-slate-200">
          <div class="w-1/4 mt-10">
            <DayPicker/>
          </div>
          <div class="w-3/4 bg-slate-400">
            위크 시간 선택
          </div>
        </div>
        <div class="w-1/4">
          튜터 선택
        </div>
      </div>
      
    </div>
  );
}
