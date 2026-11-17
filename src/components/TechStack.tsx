import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaPython,
  FaGitAlt,
  FaJira,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiPytorch,
  SiFastapi,
  SiLangchain,
  SiHuggingface,
  SiPostman,
  SiRedux,
  SiMysql,
  SiPostgresql,
  SiCplusplus,
  SiPydantic,
  SiPytest,
  SiStreamlit,
  SiOpenai,
  SiOllama,
} from "react-icons/si";
import { GiBrain, GiProcessor, GiConversation } from "react-icons/gi";
import { MdApi, MdDocumentScanner, MdFactCheck, MdTranslate } from "react-icons/md";
import { TbDatabaseSearch, TbBrandAzure } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import "./styles/TechStack.css";

const techData = [
  // AI & ML
  { name: "RAG", icon: <GiBrain color="#c2a4ff" />, category: "ai" },
  { name: "LangChain", icon: <SiLangchain color="#ffffff" />, category: "ai" },
  { name: "Azure OpenAI", icon: <VscAzure color="#0089D6" />, category: "ai" },
  { name: "OpenAI API", icon: <SiOpenai color="#ffffff" />, category: "ai" },
  { name: "Hybrid Retrieval", icon: <TbDatabaseSearch color="#c2a4ff" />, category: "ai" },
  { name: "RAGAs", icon: <MdFactCheck color="#3ECF8E" />, category: "ai" },
  { name: "Azure OCR", icon: <MdDocumentScanner color="#0089D6" />, category: "ai" },
  { name: "Transformers", icon: <SiHuggingface color="#FFD21E" />, category: "ai" },
  { name: "Prompt Eng.", icon: <GiConversation color="#3ECF8E" />, category: "ai" },
  { name: "Multimodal AI", icon: <GiProcessor color="#ffffff" />, category: "ai" },
  { name: "NLP", icon: <MdTranslate color="#c2a4ff" />, category: "ai" },
  { name: "PyTorch", icon: <SiPytorch color="#EE4C2C" />, category: "ai" },
  { name: "Ollama", icon: <SiOllama color="#ffffff" />, category: "ai" },

  // Languages
  { name: "Python", icon: <FaPython color="#3776AB" />, category: "language" },
  { name: "JavaScript", icon: <FaJs color="#F7DF1E" />, category: "language" },
  { name: "C++", icon: <SiCplusplus color="#00599C" />, category: "language" },

  // Backend & APIs
  { name: "FastAPI", icon: <SiFastapi color="#05998B" />, category: "backend" },
  { name: "Pydantic", icon: <SiPydantic color="#E92063" />, category: "backend" },
  { name: "Node.js", icon: <FaNodeJs color="#339933" />, category: "backend" },
  { name: "Express.js", icon: <SiExpress color="#ffffff" />, category: "backend" },
  { name: "RESTful APIs", icon: <MdApi color="#00ff88" />, category: "backend" },

  // Frontend
  { name: "React", icon: <FaReact color="#61DAFB" />, category: "frontend" },
  { name: "Redux", icon: <SiRedux color="#764ABC" />, category: "frontend" },
  { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" />, category: "frontend" },
  { name: "HTML5", icon: <FaHtml5 color="#E34F26" />, category: "frontend" },
  { name: "CSS3", icon: <FaCss3Alt color="#1572B6" />, category: "frontend" },

  // Databases
  { name: "MySQL", icon: <SiMysql color="#4479A1" />, category: "database" },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" />, category: "database" },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" />, category: "database" },
  { name: "FAISS", icon: <GiBrain color="#ffffff" />, category: "database" },
  { name: "Qdrant", icon: <TbDatabaseSearch color="#DC244C" />, category: "database" },

  // Cloud & Tools
  { name: "Azure AI", icon: <TbBrandAzure color="#0089D6" />, category: "devops" },
  { name: "Docker", icon: <FaDocker color="#2496ED" />, category: "devops" },
  { name: "Streamlit", icon: <SiStreamlit color="#FF4B4B" />, category: "tools" },
  { name: "pytest", icon: <SiPytest color="#0A9EDC" />, category: "tools" },
  { name: "Git", icon: <FaGitAlt color="#F05032" />, category: "tools" },
  { name: "GitHub", icon: <FaGithub color="#ffffff" />, category: "tools" },
  { name: "Jira", icon: <FaJira color="#0052CC" />, category: "tools" },
  { name: "Postman", icon: <SiPostman color="#FF6C37" />, category: "tools" },
];

const TechStack = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = techData.slice(0, Math.ceil(techData.length / 2));
  const row2 = techData.slice(Math.ceil(techData.length / 2));

  return (
    <section className="techstack-container" id="techstack">
      <h2 className="techstack-title">My Techstack</h2>

      {!isMobile && (
        <>
          <div className="marquee-wrapper">
            <Marquee gradient={false} speed={45} pauseOnHover={true} direction="left">
              {row1.map((tech, index) => (
                <div className="tech-card" key={index}>
                  <div className="tech-icon">{tech.icon}</div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </Marquee>
          </div>

          <div className="marquee-wrapper">
            <Marquee gradient={false} speed={45} pauseOnHover={true} direction="right">
              {row2.map((tech, index) => (
                <div className="tech-card" key={index}>
                  <div className="tech-icon">{tech.icon}</div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </>
      )}

      {isMobile && (
        <div className="tech-grid">
          {techData.map((tech, index) => (
            <div className="tech-card" key={index}>
              <div className="tech-icon">{tech.icon}</div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TechStack;


