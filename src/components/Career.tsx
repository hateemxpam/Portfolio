import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box fulltime">
            <div className="career-info-in">
              <div className="career-role">
                <span className="type-tag">Full-time</span>
                <h4>Junior Data Scientist</h4>
                <h5>United Bank Limited (UBL), Lahore</h5>
              </div>
              <div className="career-date">
                <h3>Jul 2026 - Present</h3>
              </div>
            </div>
            <p>
              Built an OCR extraction pipeline on Azure Document Intelligence and Azure
              OpenAI for Murabaha financing (Shariah audit) that turns scanned transaction
              packs into review-ready Excel and JSON, cutting processing from an hour or
              more of manual work to about a minute per pack. Also validated amended
              fraud-detection rules for U Secure on live pipeline runs.
            </p>
          </div>

          <div className="career-info-box internship">
            <div className="career-info-in">
              <div className="career-role">
                <span className="type-tag">Internship</span>
                <h4>AI Full Stack Developer Intern</h4>
                <h5>DevMind, Islamabad</h5>
              </div>
              <div className="career-date">
                <h3>Sep 2025 - Nov 2025</h3>
              </div>
            </div>
            <p>
              Delivered LLM-backed modules across multiple AI-integrated MERN
              applications and owned debugging and QA end to end, tightening the
              integration between AI inference layers and REST API endpoints.
            </p>
          </div>

          <div className="career-info-box internship">
            <div className="career-info-in">
              <div className="career-role">
                <span className="type-tag">Internship</span>
                <h4>Full Stack Developer Intern</h4>
                <h5>Nayatel, Islamabad</h5>
              </div>
              <div className="career-date">
                <h3>Jul 2025 - Aug 2025</h3>
              </div>
            </div>
            <p>
              Shipped full-stack features and bug fixes on a production MERN codebase
              with cross-functional teams under senior developer mentorship, resolving
              frontend-backend integration issues to improve REST API reliability.
            </p>
          </div>

          <div className="career-info-box education">
            <div className="career-info-in">
              <div className="career-role">
                <span className="type-tag">Education</span>
                <h4>BS Software Engineering</h4>
                <h5>FAST-NUCES, Islamabad</h5>
              </div>
              <div className="career-date">
                <h3>Aug 2022 - June 2026</h3>
              </div>
            </div>
            <p>
              Graduated with a focus on web development and AI-driven systems.
              Recognized twice on the Dean's List of Honors (Fall 2025 and
              Spring 2026).
            </p>
          </div>

          <div className="career-info-box education">
            <div className="career-info-in">
              <div className="career-role">
                <span className="type-tag">Education</span>
                <h4>FSc Pre-Engineering</h4>
                <h5>Sadiq Public School, Bahawalpur</h5>
              </div>
              <div className="career-date">
                <h3>Mar 2019 - June 2021</h3>
              </div>
            </div>
            <p>
              Completed higher secondary education in core engineering fundamentals
              with 88.7%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

