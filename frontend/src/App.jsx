import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <div className="app">
        {/* 상단바 */}
        <div className="header-bar">
          <h1 className="title">Daily Task</h1>
        </div>

        {/* 카드 영역 */}
        <div className="card-container">
          <div className="card">
            <div className="card-header">달력</div>
            <div className="card-body">달력 위젯</div>
          </div>
          <div className="card">
            <div className="card-header">메모</div>
            <div className="card-body">메모 작성</div>
          </div>
          <div className="card">
            <div className="card-header">ToDo</div>
            <div className="card-body">할 일 리스트</div>
          </div>
          <div className="card wide-card">
            <div className="card-header">디데이</div>
            <div className="card-body">디데이 목록</div>
          </div>
          <div className="card">
            <div className="card-header">날씨</div>
            <div className="card-body">날씨 보기</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
