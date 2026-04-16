import { motion } from 'framer-motion'
import { SERIES } from '../data/products'
import CollectionCard from '../components/CollectionCard'
import SectionHeader from '../components/SectionHeader'

export default function CollectionsPage() {
  return (
    <div className="section-pad">
      <div className="container-max">
        <SectionHeader
          tag="Series"
          title="All Collections"
          subtitle="Each series is a little world of its own. Pick your chaos wisely."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERIES.map((series, i) => (
            <CollectionCard key={series.id} series={series} delay={i * 0.1} />
          ))}
        </div>

        {/* Full collection description strips */}
        <div className="mt-16 space-y-5">
          {SERIES.map((series, i) => (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
              style={{ backgroundColor: series.bgColor }}
            >
              {/* Cover image or emoji fallback */}
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                {series.coverImage ? (
                  <img
                    src={series.coverImage}
                    alt={series.name}
                    className="w-full h-full object-contain drop-shadow-md select-none"
                    draggable={false}
                  />
                ) : (
                  <span className="text-6xl">{series.emoji}</span>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display font-bold text-2xl text-charcoal">{series.name}</h3>
                <p className="font-sans text-warm-gray text-sm mt-2 leading-relaxed">{series.description}</p>
              </div>
              <a
                href={`/collections/${series.slug}`}
                className="btn-primary flex-shrink-0 text-sm"
              >
                Explore →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
