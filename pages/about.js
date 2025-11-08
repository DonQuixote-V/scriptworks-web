import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">เกี่ยวกับเรา</h1>
        <p className="text-gray-300 leading-relaxed">
          ผมคือนักพัฒนาเว็บหรือเกมครับ
          รับทั้งเว็บ Roblox และอื่นๆ
          สามารถติดต่อได้เลยครับ

          ถ้าสนใจจ้างทำเว็บก็ทักมาได้นะครับ :3
        </p>
      </main>
      <Footer />
    </div>
  );
}
