import { useState } from "react";

function Dday() {
  const [ddays, setDdays] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // 남은 일 수 계산
  const calculateDday = (targetDate) => {
    const today = new Date();
    const dday = new Date(targetDate);
    const diffTime = dday - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 계산
  };

  const addDday = () => {
    if (!title || !date) return;
    const newDday = {
      id: Date.now(),
      title,
      date,
    };
    setDdays([...ddays, newDday]);
    setTitle("");
    setDate("");
  };

  const removeDday = (id) => {
    setDdays(ddays.filter((d) => d.id !== id));
  };

  return (
    <div className="card">
        <div className="card-header">D-Day</div>
        <div className="card-body">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="제목 입력"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={addDday}>추가</button>
            </div>

            <ul className="dday-list">
                {ddays.map((d) => {
                    const remain = calculateDday(d.date);
                    return (
                        <li key={d.id}>
                        <span className="dday-title">{d.title}</span> :{" "}
                        <span className="dday-count">
                            {remain > 0
                            ? `D-${remain}`
                            : remain === 0
                            ? "D-Day!"
                            : `D+${Math.abs(remain)}`}
                        </span>
                        <button onClick={() => removeDday(d.id)}>삭제</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
  );
}

export default Dday;