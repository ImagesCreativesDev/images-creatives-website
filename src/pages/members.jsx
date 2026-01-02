import Head from 'next/head'
import MemberCard from '../components/MemberCard'
import { getAllMembers } from '../lib/sanity'

export default function MembersPage({ members }) {
  return (
    <div className='min-h-screen bg-[#433F59]'>
      <Head>
        <title>Members - Image Creatives</title>
        <meta name="description" content="Meet the talented photographers and creatives of Image Creatives of Southwest Florida." />
      </Head>
      
      {/* Page Header */}
      <section className='py-16 bg-[#593831]'>
        <div className='max-w-6xl mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-poppins font-bold text-white mb-4'>
            Our Members
          </h1>
          <p className='text-xl text-gray-300 font-inter'>
            Meet the talented photographers and creatives of Image Creatives of Southwest Florida
          </p>
        </div>
      </section>

      {/* Members Masonry Grid */}
      <section className='py-12 md:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          {members && members.length > 0 ? (
            <div 
              className='members-masonry'
              style={{
                columnCount: 1,
                columnGap: '1.5rem',
              }}
            >
              {members.map((member) => (
                <div 
                  key={member._id} 
                  className='break-inside-avoid mb-6'
                  style={{ pageBreakInside: 'avoid' }}
                >
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <p className='text-gray-400 font-inter text-lg'>
                No members found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 768px) {
          .members-masonry {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .members-masonry {
            column-count: 3;
          }
        }
        @media (min-width: 1280px) {
          .members-masonry {
            column-count: 4;
          }
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const members = await getAllMembers()
    return {
      props: {
        members: members || []
      }
    }
  } catch (error) {
    console.error('Error fetching members for listing page:', error)
    return {
      props: {
        members: []
      }
    }
  }
}

