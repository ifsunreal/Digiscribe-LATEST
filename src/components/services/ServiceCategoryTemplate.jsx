import { Link } from 'react-router-dom';
import SoundWaveHeader from '../ui/SoundWaveHeader';
import BackToServices from '../ui/BackToServices';
import CTACard from '../ui/CTACard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ServiceCategoryTemplate({ data }) {
  const animationRef = useScrollAnimation();

  if (!data) return null;

  return (
    <div ref={animationRef}>
      <BackToServices href={data.backLink} label={data.backLabel} />

      {/* Title Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SoundWaveHeader title={data.title} />

          {/* Description Section - Image Left, Text Right */}
          {data.description && (
            <div className="flex flex-col lg:flex-row gap-10 items-center mb-16 fade-in-up">
              <div className="lg:w-1/2">
                <img
                  src={data.description.image}
                  alt={data.title}
                  className="w-full rounded-2xl shadow-lg object-cover"
                />
              </div>
              <div className="lg:w-1/2">
                {data.description.subtitle && (
                  <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                    {data.description.subtitle}
                  </p>
                )}
                {data.description.heading && (
                  <h2
                    className="text-2xl md:text-3xl font-bold text-dark-text mb-4"
                    dangerouslySetInnerHTML={{ __html: data.description.heading }}
                  />
                )}
                {data.description.paragraphs?.map((p, i) => (
                  <p key={i} className="text-gray-text text-sm leading-relaxed mb-4">{p}</p>
                ))}
                {data.description.badges && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {data.description.badges.map((badge, i) => (
                      <span key={i} className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                        <i className={badge.icon}></i>
                        {badge.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sub-Services Grid */}
      {data.subServices && data.subServices.length > 0 && (
        <section id="our-services" className="py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.subServices.map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className={`service-card relative rounded-2xl p-6 shadow-lg overflow-hidden min-h-[280px] group fade-in-up delay-${(index + 1) * 100}`}
                  style={{
                    background: `url('${service.image}') center/cover no-repeat`
                  }}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-sky-600/60 group-hover:from-slate-900/80 group-hover:to-cyan-500/70 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      <i className={`${service.icon} text-white text-xl`}></i>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-xs text-white/80 leading-relaxed mb-4">{service.description}</p>
                    <span className="learn-more-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors bg-white text-primary hover:bg-dark-text hover:text-white">
                      Learn More
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Card */}
            {data.ctaCard && (
              <CTACard
                icon={data.ctaCard.icon}
                title={data.ctaCard.title}
                description={data.ctaCard.description}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}
