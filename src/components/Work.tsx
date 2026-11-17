import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaGithub, FaArrowRight, FaTimes, FaLock } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import gsap from "gsap";
import "./styles/Work.css";

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  /** Repo is private: show a "Private repo" badge instead of a link that would 404 for visitors. */
  isPrivate?: boolean;
  /** Public live demo URL, if the project is deployed. */
  live?: string;
  tech: string[];
  vision: string;
  features: string[];
}

const projectsData: Project[] = [
  {
    title: "DocSentinel",
    description:
      "A live, high-trust compliance assistant that answers questions over GDPR and EU AI Act documents with hybrid RAG, cross-encoder reranking and fully cited answers.",
    image: "/images/docsentinel.svg",
    github: "https://github.com/hateemxpam/DocSentinel",
    live: "https://huggingface.co/spaces/hateemxpam/DocSentinel",
    tech: ["Hybrid RAG", "LangChain", "Qdrant", "FastAPI", "RAGAs", "Llama 3.3"],
    vision:
      "Compliance teams can't act on an answer they can't trust. DocSentinel answers only when retrieval confidence clears a gate, audits its own output for hallucinations, and cites every claim back to its source document, page and ingestion version.",
    features: [
      "Hybrid retrieval: BM25 keyword search + Qdrant vector search merged with Reciprocal Rank Fusion, then re-sorted by a cross-encoder reranker",
      "Dual trust gates: a pre-generation confidence check blocks weak context, and a post-generation consistency audit flags hallucination risk",
      "Traceable citations resolved to the source document, page number and ingestion version",
      "Semantic cache on PostgreSQL (cosine similarity) that returns repeat questions in milliseconds",
      "RAGAs evaluation pipeline: faithfulness, answer relevancy, context precision and recall",
      "FastAPI backend and Streamlit dashboard, deployed to Hugging Face Spaces through GitHub Actions",
    ],
  },
  {
    title: "Murabaha OCR Pipeline",
    description:
      "An API and CLI pipeline that turns scanned Murabaha (Islamic financing) transaction packs into review-ready Excel and JSON for Shariah audit, cutting an hour of manual transcription to about a minute per pack.",
    image: "/images/murabaha-ocr.svg",
    github: "https://github.com/hateemxpam/Marhaba-OCR",
    isPrivate: true,
    tech: ["Azure Document Intelligence", "Azure OpenAI", "FastAPI", "Pydantic", "RapidFuzz", "pytest"],
    vision:
      "In audit work, accuracy matters more than automation. Every extracted value is checked against the source OCR text, and anything uncertain is marked “Needs Review” for a human to sign off.",
    features: [
      "Splits scanned packs into 7 Murabaha document types with fuzzy title matching, an LLM fallback for unclear pages and low-confidence pages flagged",
      "Schema-constrained LLM extraction driven by a YAML field spec, including variable-length tables, so new fields or document types need no code changes",
      "Deterministic verification layer that normalizes dates and amounts and checks every value against the OCR text to catch hallucinations",
      "Cross-document validation: transaction timeline order, amount reconciliation and customer/supplier name consistency",
      "One LLM call per document to control cost and latency; OCR text is treated as untrusted input",
      "Job-based REST API with OCR, segment, result and styled Excel export endpoints, covered by automated tests with mocked Azure services",
    ],
  },
  {
    title: "Fake Document Detector",
    description:
      "Explainable fraud screening for documents submitted to banks: CNICs, bank statements and salary slips. Independent forensic inspectors gather evidence and combine it into a transparent risk score for a human reviewer.",
    image: "/images/fake-doc-detector.svg",
    github: "https://github.com/hateemxpam/Fake-document-detector",
    isPrivate: true,
    tech: ["Python", "Document Forensics", "PyMuPDF", "OpenCV", "Azure OCR", "Streamlit"],
    vision:
      "No single signal should call a document fake. Every finding explains what was checked, what was found, why it matters and how reliable it is, which keeps false positives low and lets reviewers trust the score.",
    features: [
      "Pluggable inspectors for PDF revision history, producer metadata, typography and light shapes painted over existing text",
      "Content checks: bank-statement running balances, salary-slip arithmetic (including amounts in words), balance-sheet equations and CNIC digit, date and gender rules",
      "AI-generation and editing signals: C2PA/IPTC provenance, synthetic template markers, IBAN mod-97 checksums and editing-software traces",
      "Image forensics (ELA, noise consistency, copy-move), deliberately capped as weak signals",
      "Case-level consistency of CNIC, name, date of birth and employer across documents, plus near-duplicate detection",
      "Transparent noisy-OR scoring with correlated-flag damping; local OCR (Tesseract) with optional Azure, and offline HTML/JSON reports",
    ],
  },
  {
    title: "AI Crop Advisory System",
    description:
      "A multimodal RAG system that answers image, voice and text queries in English, Urdu and Punjabi, with a vision pipeline for crop disease diagnosis.",
    image: "/images/crop.png",
    github: "https://github.com/hateemxpam/AI-Crop-Advisory-System---Multi-Modal-RAG",
    tech: ["RAG", "LangChain", "FAISS", "Sentence Transformers", "Multimodal AI", "PyTorch"],
    vision:
      "Providing farmers with instant, localized, context-aware advice in their own language, grounded in verified agricultural data instead of model guesswork.",
    features: [
      "Multimodal input: image, voice (Whisper speech-to-text) and text queries in English, Urdu and Punjabi",
      "Semantic search with Sentence Transformers embeddings and a FAISS vector index",
      "LLM APIs orchestrated with LangChain for context-aware crop recommendations",
      "Pretrained vision model (EfficientNet-B2) for crop disease detection, reducing reliance on manual diagnosis",
      "Python backend with FastAPI, and Pandas, NumPy and OpenCV for data and image processing",
    ],
  },
  {
    title: "AutoFiverr",
    description:
      "A Chrome extension and AI backend that automates gig creation and optimization for Fiverr freelancers: competitor analysis, SEO content, visuals and A/B testing.",
    image: "/images/fiverr.png",
    github: "https://github.com/Raffayy/AutoFiverr-FYP",
    tech: ["Ollama", "Llama 3", "Gemini", "FastAPI", "Supabase", "Chrome Extension"],
    vision:
      "Empowering freelancers by bridging the gap between marketplace analytics and AI-driven automation, using local, privacy-focused LLMs where possible.",
    features: [
      "Chrome extension (Manifest V3) that auto-fills gig titles, tags, descriptions and pricing packages",
      "Competitor module that scrapes top-ranking gigs and generates a prioritized improvement plan",
      "Python FastAPI backend with Supabase (PostgreSQL) for persistence",
      "Local Llama 3 via Ollama for strategy, with Gemini 2.5 Flash for image generation and editing",
      "A/B testing dashboard with tamper-evident test logs, plus PDF, DOCX and CSV report export",
    ],
  },
  {
    title: "DPI Engine",
    description:
      "A multithreaded Deep Packet Inspection engine in C++17 that classifies network traffic by extracting the TLS SNI from encrypted HTTPS flows, then applies block rules.",
    image: "/images/dpi.png",
    github: "https://github.com/hateemxpam/Deep-Packet-Inspection",
    tech: ["C++17", "Multithreading", "TLS/SNI", "Networking", "PCAP", "CMake"],
    vision:
      "Applying the technique behind ISP-level firewalls: identifying which application an encrypted flow belongs to without ever decrypting it.",
    features: [
      "Flow-affinity worker routing with per-worker flow tables, so packets of one flow never contend across threads",
      "Byte-level parsing of Ethernet, IPv4, TCP and UDP headers and the TLS ClientHello to extract the SNI",
      "Sustains 100,000+ packets per second on encrypted HTTPS traffic",
      "Rules to block by IP, application or domain, with hot reload, and filtered PCAP output",
      "Built-in benchmarking with throughput and per-worker statistics",
    ],
  },
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const openModal = (e: React.SyntheticEvent, project: Project) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    const body = document.body;

    if (!selectedProject) {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "auto";
      window.scrollTo(0, scrollPositionRef.current);
      return;
    }

    scrollPositionRef.current = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "auto";
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [selectedProject]);

  return (
    <>
      <section className="work-section" id="work">
        <div className="work-container section-container">
          <h2 className="work-title">
            <span>PROJECTS</span>
          </h2>
          <div className="work-grid">
            {projectsData.map((project) => (
              <div
                className="project-card"
                key={project.title}
                role="button"
                tabIndex={0}
                aria-label={`${project.title}: view details`}
                onClick={(e) => openModal(e, project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openModal(e, project);
                }}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-image-overlay"></div>
                  {project.live && <span className="project-live-badge">Live</span>}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    {project.isPrivate ? (
                      <span className="project-link project-link-private">
                        <FaLock /> Private repo
                      </span>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> GitHub Link
                      </a>
                    )}
                    <span className="view-details">
                      Click for Details <FaArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && createPortal(
        <div
          className="modal-overlay"
          ref={overlayRef}
          onClick={closeModal}
          style={{ display: 'flex', zIndex: 99999 }}
        >
          <div
            className="modal-content"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <FaTimes />
            </button>
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-info">
                <div className="modal-header">
                  <h2>{selectedProject.title}</h2>
                  <div className="tech-stack">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-body">
                  <h3 className="section-subtitle">The Vision</h3>
                  <p className="project-detail-text">
                    {selectedProject.vision}
                  </p>

                  <h3 className="section-subtitle">Key Features</h3>
                  <ul className="features-list">
                    {selectedProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-btn live"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {selectedProject.isPrivate ? (
                    <span className="modal-btn private" title="Source code is private">
                      <FaLock /> Private Repository
                    </span>
                  ) : (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-btn github"
                    >
                      <FaGithub /> View Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Work;
