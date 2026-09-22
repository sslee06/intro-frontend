import { useState } from "react";

export default function App() {
  // 관심사 목록을 상태(State)로 관리합니다. 기본값으로 3가지를 미리 넣어둡니다.
  const [interests, setInterests] = useState([
    { id: 1, text: "AX전략" },
    { id: 2, text: "전략적 투자" },
    { id: 3, text: "AI Agent 개발" }
  ]);
  const [newInterest, setNewInterest] = useState(""); // 입력창 상태

  // 새로운 관심사를 추가하는 함수
  const addInterest = () => {
    if (!newInterest.trim()) return;
    setInterests([...interests, { id: Date.now(), text: newInterest }]);
    setNewInterest("");
  };

  // 관심사 삭제 기능 (필요하다면 사용할 수 있도록 유지)
  const deleteInterest = (id) => {
    setInterests(interests.filter((item) => item.id !== id));
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: "30px", fontFamily: "sans-serif", border: "1px solid #ddd", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      {/* 1. 이름 및 인사말 */}
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
        👨‍💻 이상석
      </h1>

      {/* 2. 소속 정보 (정적 데이터) */}
      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ color: "#34495e", borderBottom: "2px solid #3498db", paddingBottom: "5px", display: "inline-block" }}>
          소속
        </h3>
        <ul style={{ listStyleType: "none", padding: 0, fontSize: "16px", lineHeight: "1.8" }}>
          <li>🎓 DFMBA 8기</li>
          <li>🏢 NH농협은행 AX전략부</li>
        </ul>
      </div>

      {/* 3. 관심사 정보 (동적 데이터 - useState 활용) */}
      <div>
        <h3 style={{ color: "#34495e", borderBottom: "2px solid #2ecc71", paddingBottom: "5px", display: "inline-block" }}>
          관심사
        </h3>
        <ul style={{ fontSize: "16px", lineHeight: "1.8", paddingLeft: "20px" }}>
          {interests.map((item) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              {item.text}
              <button 
                onClick={() => deleteInterest(item.id)} 
                style={{ marginLeft: 10, fontSize: "12px", padding: "2px 6px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff" }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 관심사 추가 입력창 (기존 메모 추가 기능 응용) */}
      <div style={{ display: "flex", gap: 8, marginTop: "20px" }}>
        <input 
          value={newInterest} 
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="새로운 관심사를 입력해보세요" 
          style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} 
        />
        <button 
          onClick={addInterest}
          style={{ padding: "10px 16px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          추가
        </button>
      </div>

    </div>
  );
}