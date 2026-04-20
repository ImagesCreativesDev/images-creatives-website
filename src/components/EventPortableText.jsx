import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../lib/sanity'

const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-300 font-inter leading-relaxed last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-poppins font-bold text-white mb-3 mt-6 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-poppins font-bold text-white mb-2 mt-4 first:mt-0">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-flame pl-4 my-4 text-gray-400 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-gray-300 font-inter space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-gray-300 font-inter space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-900 px-1.5 py-0.5 rounded text-sm text-flame">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="text-flame underline hover:text-ember"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      try {
        const src = urlFor(value).width(900).url()
        return (
          <figure className="my-6">
            <Image
              src={src}
              alt={value.alt || ''}
              width={900}
              height={600}
              className="rounded-lg w-full h-auto object-cover max-h-[480px]"
            />
            {value.caption && (
              <figcaption className="text-sm text-gray-500 mt-2 font-inter">{value.caption}</figcaption>
            )}
          </figure>
        )
      } catch {
        return null
      }
    },
  },
}

export default function EventPortableText({ value }) {
  if (!value) return null
  if (typeof value === 'string') {
    return (
      <p className="text-gray-300 font-inter leading-relaxed whitespace-pre-line">{value}</p>
    )
  }
  if (!Array.isArray(value) || value.length === 0) return null
  return (
    <div className="event-portable-text">
      <PortableText value={value} components={components} />
    </div>
  )
}
