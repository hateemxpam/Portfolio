import { FiDownload, FiExternalLink } from "react-icons/fi";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <h3 className="title">About Me</h3>
        </div>

        <div className="about-content">
          <div className="about-text-wrapper">
            <div className="intro-badge">
              <span className="dot"></span>
              <span className="badge-text">Junior Data Scientist · UBL</span>
            </div>
            <h2 className="hello-text">Hello, I'm</h2>
            <h1 className="name-text">
              <span className="gradient-text">Hateem</span>
            </h1>
            <p className="description para">
              A Software Engineering graduate from FAST-NUCES, Islamabad, and a Junior
              Data Scientist at United Bank Limited. I build RAG and LLM-based systems,
              from document intelligence and OCR automation for banking workflows to
              cited, hallucination-checked answers over policy documents. I work across
              the full AI lifecycle (retrieval, pipeline design, LLM integration,
              evaluation and deployment) on a full-stack foundation of the MERN stack
              and FastAPI.
            </p>

            <div className="about-buttons">
              <a
                href="/Hateem_CV.pdf"
                download="Hateem_Khush_Bakht_CV.pdf"
                type="application/pdf"
                className="btn btn-primary"
                data-cursor="disable"
              >
                <FiDownload /> Download CV
              </a>

              <a
                href="#work"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  // Using the global smoother instance for correct navigation
                  import("./Navbar").then((module) => {
                    module.smoother?.scrollTo("#work", true, "top top");
                  });
                }}
              >
                <FiExternalLink /> View Projects
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;


