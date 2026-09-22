import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [interests, setInterests] = useState([]); // 관심사 목록 (백엔드에서 불러옴)
  const [newInterest, setNewInterest] = useState(""); // 입력창 상태

  // 처음 화면이 뜰 때 서버에서 기존 데이터(관심사)를 불러옵니다.
  useEffect(() => { 
    loadInterests(); 
  }, []);

  // [GET] 목록 조회
  const loadInterests = async () => {
    const res = await fetch(`${API_URL}/memos`);
    setInterests(await res.json());
  };

  // [POST] 새로운 관심사 추가
  const addInterest = async () => {
    if (!newInterest.trim()) return;
    await fetch(`${API_URL}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newInterest }), // 백엔드가 content를 받으므로 유지
    });
    setNewInterest(""); 
    loadInterests(); // 추가 후 목록 다시 불러오기
  };

  // [DELETE] 관심사 삭제
  const deleteInterest = async (id) => {
    await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
    loadInterests(); // 삭제 후 목록 다시 불러오기
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: "30px", fontFamily: "sans-serif", border: "1px solid #ddd", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      {/* 1. 이름 및 인사말 */}
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
        👨‍💻 이상석
      </h1>

      {/* 2. 소속 정보 */}
      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ color: "#34495e", borderBottom: "2px solid #3498db", paddingBottom: "5px", display: "inline-block" }}>
          소속
        </h3>
        <ul style={{ listStyleType: "none", padding: 0, fontSize: "16px", lineHeight: "1.8" }}>
          <li>🎓 DFMBA 8기</li>
          <li>🏢 NH농협은행 AX전략부</li>
        </ul>
      </div>

      {/* 3. 관심사 정보 (백엔드 연동) */}
      <div>
        <h3 style={{ color: "#34495e", borderBottom: "2px solid #2ecc71", paddingBottom: "5px", display: "inline-block" }}>
          관심사
        </h3>
        <ul style={{ fontSize: "16px", lineHeight: "1.8", paddingLeft: "20px" }}>
          {interests.map((item) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              {item.content}
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

      {/* 4. 관심사 추가 입력창 */}
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