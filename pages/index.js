import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header /> {/* ✅ เพิ่มตรงนี้ให้ header โผล่ */}
      
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 pt-28">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400 fade-in">
          ScriptWorks
        </h1>

        <p className="text-center max-w-2xl text-gray-300 fade-in-delay-1">
          ยินดีต้อนรับสู่เว็บไซต์ของผมครับ เป็นช่องทางสำหรับโชว์ผลงานและติดตามคิวของตนเองได้เลยครับ :D

          รับทำแมพทุกประเภทนะครับ สามารถทักมาติดต่อสอบถามได้เลย ราคาเริ่มต้นอยู่ที่ 30 บาทครับ ราคาจะขึ้นอยู่กับความยากง่ายของงานครับ
        </p>

        <h2 className="text-2xl font-semibold mt-10 text-cyan-300 fade-in-delay-2">
          วิธีดูคิวงาน
        </h2>

        <p className="text-center max-w-xl text-gray-400 fade-in-delay-3">
          คุณสามารถเข้าไปที่หน้า “ตามคิว” เพื่อดูสถานะงานของคุณ ระบบจะอัปเดตอัตโนมัติเมื่อมีความคืบหน้า
        </p>

        <footer className="mt-16 text-gray-500 text-sm fade-in-delay-4">
          © 2025 ScriptWorks. จัดทำโดย Rutl Chankham.
        </footer>
      </div>

      
    </>
  );
}
