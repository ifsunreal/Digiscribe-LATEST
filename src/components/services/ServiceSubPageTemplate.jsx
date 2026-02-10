import { Link } from 'react-router-dom';
import SoundWaveHeader from '../ui/SoundWaveHeader';
import BackToServices from '../ui/BackToServices';
import FeatureBar from '../ui/FeatureBar';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ServiceSubPageTemplate({ data }) {
  const animationRef = useScrollAnimation();

  if (!data) return null;

  return (
    <div ref={animationRef}>
      <BackToServices href={data.backLink} label={data.backLabel} />

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SoundWaveHeader title={data.title} />

          {/* Two Column Layout - Text Left, Image Right */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 items-start mb-12 fade-in-up">
              {/* Left - Text Content */}
              <div className="lg:w-1/2">
                {data.paragraphs?.map((p, i) => (
                  <p key={i} className="text-gray-text text-sm leading-relaxed mb-4">{p}</p>
                ))}

                {/* Features List */}
                {data.features && data.features.length > 0 && (
                  <div className="mt-6">
                    {data.featuresTitle && (
                      <h3 className="text-lg font-semibold text-dark-text mb-4">{data.featuresTitle}</h3>
                    )}
                    <ul className="space-y-3">
                      {data.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-text">
                          <i className="fas fa-check-circle text-primary mt-0.5 flex-shrink-0"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right - Image */}
              <div className="lg:w-1/2 fade-in-up delay-200">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>

            {/* CTA Button */}
            {data.ctaButton && (
              <div className="text-center mb-12 fade-in-up delay-300">
                <Link
                  to={data.ctaButton.href || '/quote'}
                  className="inline-flex items-center gap-2 btn-gradient text-white px-8 py-3 rounded-full text-sm font-medium"
                >
                  {data.ctaButton.text}
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            )}

            {/* Feature Bar */}
            {data.featureBar && (
              <div className="fade-in-up delay-400">
                <FeatureBar items={data.featureBar} />
              </div>
            )}

            {/* Extra Sections */}
            {data.extraSections?.map((section, sIdx) => (
              <div key={sIdx} className="mt-16 fade-in-up">
                {section.title && (
                  <h2 className="text-2xl md:text-3xl font-bold text-dark-text text-center mb-8">
                    {section.title}
                  </h2>
                )}

                {section.type === 'cardGrid' && (
                  <div className={`grid grid-cols-1 md:grid-cols-${section.columns || 3} gap-6`}>
                    {section.items?.map((item, i) => (
                      <div key={i} className="glow-card bg-white rounded-xl p-6 border border-gray-100">
                        <div className={`w-12 h-12 ${item.iconBg || 'bg-primary/10'} rounded-xl flex items-center justify-center mb-4`}>
                          <i className={`${item.icon} ${item.iconColor || 'text-primary'} text-xl`}></i>
                        </div>
                        <h3 className="text-base font-semibold text-dark-text mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-text leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'linkGrid' && (
                  <div className={`grid grid-cols-1 md:grid-cols-${section.columns || 3} gap-6`}>
                    {section.items?.map((item, i) => (
                      <Link
                        key={i}
                        to={item.link || '/quote'}
                        className="glow-card bg-white rounded-xl p-6 border border-gray-100 hover:border-primary/30 transition-all group"
                      >
                        <div className={`w-12 h-12 ${item.iconBg || 'bg-primary/10'} rounded-xl flex items-center justify-center mb-4`}>
                          <i className={`${item.icon} ${item.iconColor || 'text-primary'} text-xl`}></i>
                        </div>
                        <h3 className="text-base font-semibold text-dark-text mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-text leading-relaxed">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
