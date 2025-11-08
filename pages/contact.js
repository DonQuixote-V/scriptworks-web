import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaDiscord, FaFacebook, FaLine } from "react-icons/fa"; // ✅ เพิ่มชุดไอคอน

export default function Contact() {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">ติดต่อเรา</h1>
        <p className="text-gray-300 mb-4">สามารถติดต่อผมได้ผ่านช่องทางดังนี้</p>

        <div className="mt-6 space-y-4 text-cyan-300 text-left w-fit mx-auto">
          {/* Discord */}
          <div className="flex items-center gap-3 hover:scale-105 transition-transform">
            <FaDiscord className="text-[#5865F2] text-2xl drop-shadow-[0_0_6px_#5865F2]" />
            <p>
              Discord:{" "}
              <span className="text-white font-medium">kiagshop_88783</span>
            </p>
          </div>

          {/* Line */}
          <div className="flex items-center gap-3 hover:scale-105 transition-transform">
            <FaLine className="text-[#00B900] text-2xl drop-shadow-[0_0_6px_#00B900]" />
            <p>
              Line: <span className="text-white font-medium">donquixote.8</span>
            </p>
          </div>

          {/* Facebook */}
          <div className="flex items-center gap-3 hover:scale-105 transition-transform">
            <FaFacebook className="text-[#1877F2] text-2xl drop-shadow-[0_0_6px_#1877F2]" />
            <p>
              Facebook:{" "}
              <a
                href="https://facebook.com/rutl.chankham"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline hover:no-underline transition"
              >
                Rutl Chankham
              </a>
            </p>
          </div>

          {/* Discord Group */}
          <div className="flex items-center gap-3 hover:scale-105 transition-transform">
            <FaDiscord className="text-[#5865F2] text-2xl drop-shadow-[0_0_6px_#5865F2]" />
            <p>
              Discord Group:{" "}
              <a
                href="https://discord.gg/38sYz837Pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline hover:no-underline transition"
              >
                เข้าร่วม
              </a>
            </p>
          </div>
        </div>

        {/* ปุ่มลิงก์ Facebook */}
        <div className="mt-10">
          <a
            href="https://facebook.com/rutl.chankham"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            เยี่ยมชม Facebook ผม
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
