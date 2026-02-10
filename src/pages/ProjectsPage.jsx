import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ProjectsPage() {
  const animationRef = useScrollAnimation();

  useEffect(() => {
    document.title = 'Projects - DigiScribe Transcription Corp.';
  }, []);

  const heroContent = (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-7xl font-bold text-dark-text mb-4">
            <span className="gradient-text">Our Previous Projects</span>
          </h1>
          <p className="text-gray-text text-sm max-w-2xl mx-auto leading-relaxed">
            Founded in 2005, Digiscribe Transcription Corp. has grown from a small transcription service into a leading provider of medical documentation and back-office solutions in the Philippines and beyond.
          </p>
        </div>

        {/* Project 1: App Marketplace */}
        <div id="app-marketplace" className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left - Screenshot with dashed decoration */}
            <div className="lg:w-1/2 relative">
              <div className="dashed-curve-left hidden lg:block"></div>
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg relative z-10">
                <img src="/images/practice_fusion_3.png" alt="App Marketplace Screenshot" className="w-full" />
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="project-number">1</div>
                <h2 className="text-xl font-bold text-dark-text">App Marketplace</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Target</h4>
                  <p className="text-sm text-gray-text">Doctors, Nurses, and Medical Staff.</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Purpose</h4>
                  <p className="text-sm text-gray-text">The daily "operating system" for a medical clinic.</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Details</h4>
                  <ul className="text-sm text-gray-text space-y-1 list-disc list-inside">
                    <li>Clinical Workflow: Features like Smart Charting, e-Prescribing, and lab integrations.</li>
                    <li>Dashboarding: A high-level view of the day's appointments and pending tasks.</li>
                    <li>Compliance: Built-in tools for HIPAA and MIPS reporting.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator 1 */}
        <hr className="project-separator my-12 max-w-4xl mx-auto" />

        {/* Project 2: Patient Fusion */}
        <div id="patient-fusion" className="mb-12">
          <div className="flex flex-col lg:flex-row-reverse items-start gap-8">
            {/* Right - Screenshot with dashed decoration */}
            <div className="lg:w-1/2 relative">
              <div className="dashed-curve-right hidden lg:block"></div>
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg relative z-10">
                <img src="/images/practice_fusion_2.png" alt="Patient Fusion Screenshot" className="w-full" />
              </div>
            </div>

            {/* Left - Details */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="project-number">2</div>
                <h2 className="text-xl font-bold text-dark-text">Patient Fusion</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Purpose</h4>
                  <p className="text-sm text-gray-text">A secure window for patients to access their own data.</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Details</h4>
                  <ul className="text-sm text-gray-text space-y-1 list-disc list-inside">
                    <li>Engagement: Tools for patients to book appointments online and message their doctors.</li>
                    <li>Personal Health Record (PHR): Immediate access to lab results, immunization records, and diagnoses.</li>
                    <li>Intake Automation: Digital "check-in" forms that save time in the waiting room.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator 2 */}
        <hr className="project-separator my-12 max-w-4xl mx-auto" />

        {/* Project 3: Practice Fusion */}
        <div id="practice-fusion" className="mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left - Screenshot with dashed decoration */}
            <div className="lg:w-1/2 relative">
              <div className="dashed-curve-left hidden lg:block"></div>
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg relative z-10">
                <img src="/images/practice_fusion_1.png" alt="Practice Fusion Screenshot" className="w-full" />
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="project-number">3</div>
                <h2 className="text-xl font-bold text-dark-text">Practice Fusion</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Target</h4>
                  <p className="text-sm text-gray-text">Developers, Billing Partners, and Third-Party Integrations.</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Purpose</h4>
                  <p className="text-sm text-gray-text">Third Party Portal for company/large health insurance, connect systems to Digiscribe services.</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-dark-text mb-1">Details</h4>
                  <ul className="text-sm text-gray-text space-y-1 list-disc list-inside">
                    <li>Ability to Signup/Generate or API Keys for complete connection</li>
                    <li>Activity logs, Charts to display live activity data</li>
                    <li>Built in Kanban Board, File Document of the system</li>
                    <li>API Sandbox to test data connectivity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout heroContent={heroContent}>
      <div ref={animationRef}>
        {/* No content below the hero for this page */}
      </div>
    </Layout>
  );
}
