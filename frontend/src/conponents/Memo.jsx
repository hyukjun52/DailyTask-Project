import { useState, useEffect } from "react";
import axios from "axios";

export default function Memo() {
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState("");
  const [showInput, setShowInput] = useState(false); // 입력창 표시 여부

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/memos");
      setMemos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addMemo = async () => {
    if (!newMemo.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/memos", { content: newMemo });
      setNewMemo("");
      setShowInput(false); // 입력창 닫기
      fetchMemos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMemo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/memos/${id}`);
      fetchMemos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card wide-card">
      <div className="card-header">📝 메모</div>
      <div className="card-body">
        {/* 메모가 없고 입력창도 안 보일 때 → + 버튼 */}
        {memos.length === 0 && !showInput && (
          <button
            onClick={() => setShowInput(true)}
            style={{
              fontSize: "2rem",
              width: "100%",
              height: "100px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            ＋
          </button>
        )}

        {/* 입력창 보이기 */}
        {showInput && (
          <div style={{ marginBottom: "10px" }}>
            <textarea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              style={{ width: "100%", height: "60px", marginBottom: "10px" }}
            />
            <button onClick={addMemo}>추가</button>
          </div>
        )}

        {/* 메모 목록 */}
        {memos.length > 0 && (
          <ul>
            {memos.map((memo) => (
              <li
                key={memo.id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{memo.content}</span>
                <button onClick={() => deleteMemo(memo.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
