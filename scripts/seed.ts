import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const scholarships = [
  {
    scholarship_name: 'MEXT Embassy Scholarship 2025',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    category: 'mext', level: ['undergraduate'], scholarship_type: 'Government',
    funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000,
    tuition_covered: true, age_limit_min: 17, age_limit_max: 24,
    eligibility: 'National of a country with diplomatic relations with Japan. Completed 12 years of schooling. Strong academic record.',
    nationality: 'all', japanese_requirement: 'none', english_requirement: 'Basic',
    application_deadline: '2025-05-31', notification_date: '2026-01-15',
    exam_subjects: ['Mathematics', 'Science (Physics/Chemistry/Biology)', 'English', 'Japanese (optional)'],
    interview_required: true, duration: '4-5 years (including 1 year language training)',
    university: [], field_of_study: ['All Fields'],
    application_route: 'embassy', official_link: 'https://www.mext.go.jp',
    tags: ['MEXT', 'Fully Funded', 'Embassy Route', 'Government', 'Undergraduate', 'No Japanese Required'],
    description: "Japan's most prestigious government scholarship for international undergraduate students. Covers full tuition, ¥117,000/month stipend, and round-trip airfare. Recipients undergo 1 year of Japanese language training.",
    benefits: ['Full tuition waiver', '¥117,000/month stipend', 'Round-trip airfare', '1-year Japanese language training', 'No repayment required'],
    documents_required: ['Application form', 'Academic transcripts', 'Graduation certificate', '2 recommendation letters', 'Medical certificate', 'Passport copy', 'Personal statement'],
    slug: 'mext-embassy-2025', featured: true, active: true,
  },
  {
    scholarship_name: 'MEXT University Recommendation 2025',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    category: 'mext', level: ['masters', 'phd'], scholarship_type: 'Government',
    funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000,
    tuition_covered: true, age_limit_min: null, age_limit_max: 35,
    eligibility: 'Apply directly through Japanese university. Already admitted to or in contact with a Japanese supervisor.',
    nationality: 'all', japanese_requirement: 'none',
    application_deadline: '2025-06-15',
    exam_subjects: [], interview_required: true,
    duration: '2-3 years (Masters) or 3-5 years (PhD)',
    field_of_study: ['STEM', 'Humanities', 'Social Sciences', 'Arts'],
    application_route: 'university', official_link: 'https://www.mext.go.jp',
    tags: ['MEXT', 'Fully Funded', 'University Route', 'Masters', 'PhD', 'Research'],
    description: 'MEXT scholarship via direct university recommendation. Ideal for graduate students who have already identified a Japanese supervisor. Apply through the Japanese university admissions office.',
    benefits: ['Full tuition waiver', '¥117,000/month stipend', 'Round-trip airfare', 'Research allowance'],
    documents_required: ['Application form', 'Research plan', 'Transcripts', 'Supervisor letter of acceptance', 'Language certificates'],
    slug: 'mext-university-2025', featured: true, active: true,
  },
  {
    scholarship_name: 'JASSO Student Exchange Support Program 2025',
    provider: 'Japan Student Services Organization (JASSO)',
    category: 'jasso', level: ['undergraduate', 'masters'], scholarship_type: 'Government Exchange',
    funding_type: 'partial', stipend: '¥80,000/month', stipend_amount: 80000,
    tuition_covered: false, age_limit_max: 29,
    eligibility: 'Enrolled at a JASSO partner university. GPA 2.8+ recommended. Enrolled in or planning Japanese language study.',
    nationality: 'all', japanese_requirement: 'none',
    application_deadline: '2025-06-30',
    exam_subjects: [], interview_required: false,
    duration: '6-12 months',
    field_of_study: ['All Fields'],
    application_route: 'university', official_link: 'https://www.jasso.or.jp',
    tags: ['JASSO', 'Exchange', 'Monthly Stipend', 'No Japanese Required', 'Undergraduate', 'Masters'],
    description: 'Monthly stipend support for exchange students studying at Japanese partner universities. Apply through your home institution\'s international office.',
    benefits: ['¥80,000/month stipend', 'One-time travel allowance', 'Accident and sickness insurance support'],
    documents_required: ['Application form', 'Enrollment certificate', 'Transcript', 'Study plan', 'Recommendation letter'],
    slug: 'jasso-exchange-2025', featured: true, active: true,
  },
  {
    scholarship_name: 'KOSEN International Exchange Program',
    provider: 'National Institute of Technology (KOSEN)',
    category: 'kosen', level: ['kosen'], scholarship_type: 'Technical Education',
    funding_type: 'fully_funded', stipend: '¥117,000/month', stipend_amount: 117000,
    tuition_covered: true, age_limit_max: 22,
    eligibility: 'Excellent academic record in technical subjects. Interest in engineering and technology. No Japanese required — provided after arrival.',
    nationality: 'all', japanese_requirement: 'none',
    application_deadline: '2025-03-15',
    exam_subjects: ['Mathematics', 'Physics', 'Engineering Fundamentals'],
    interview_required: true, duration: '5 years',
    field_of_study: ['Engineering', 'Technology', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    application_route: 'embassy', official_link: 'https://www.kosen-k.go.jp',
    tags: ['KOSEN', 'Fully Funded', 'Technical', 'Engineering', 'Government'],
    description: 'Fully funded technical education at Japan\'s elite National Institutes of Technology. KOSEN produces world-class engineers with a unique 5-year integrated curriculum combining theory and practice.',
    benefits: ['Full tuition coverage', '¥117,000/month stipend', 'Round-trip airfare', 'On-campus housing support', 'Japanese language training'],
    documents_required: ['MEXT application form', 'Academic records', 'Recommendation letters', 'Medical certificate'],
    slug: 'kosen-international-2025', featured: true, active: true,
  },
  {
    scholarship_name: 'University of Tokyo Global Leaders Program',
    provider: 'University of Tokyo (UTokyo)',
    category: 'university', level: ['masters', 'phd'], scholarship_type: 'University',
    funding_type: 'fully_funded', stipend: '¥150,000/month', stipend_amount: 150000,
    tuition_covered: true, age_limit_max: 35,
    eligibility: 'Exceptional academic record. Strong research proposal. Accepted to UTokyo graduate program.',
    nationality: 'all', japanese_requirement: 'none',
    application_deadline: '2025-07-01',
    exam_subjects: [], interview_required: true,
    duration: '2 years (Masters) or 3 years (PhD)',
    field_of_study: ['All Fields', 'Science', 'Engineering', 'Humanities', 'Social Sciences'],
    application_route: 'university', official_link: 'https://www.u-tokyo.ac.jp',
    tags: ['UTokyo', 'University of Tokyo', 'Fully Funded', 'Masters', 'PhD', 'Prestigious'],
    description: "One of Japan's most prestigious university scholarships for outstanding international researchers. The University of Tokyo Global Leaders Program supports future global leaders across all disciplines.",
    benefits: ['¥150,000/month stipend', 'Full tuition waiver', 'Research funding', 'International networking'],
    documents_required: ['Research proposal', 'CV/Resume', 'Academic transcripts', 'Supervisor acceptance', 'Recommendation letters', 'Language certificates'],
    slug: 'utokyo-global-leaders', featured: true, active: true,
  },
  {
    scholarship_name: 'Rotary Foundation Study Grant — Japan',
    provider: 'Rotary International',
    category: 'foundation', level: ['masters'], scholarship_type: 'Private Foundation',
    funding_type: 'fully_funded', stipend: 'Variable (up to ¥150,000/month)', stipend_amount: 150000,
    tuition_covered: true, age_limit_min: 18, age_limit_max: 30,
    eligibility: 'Community leadership experience. Rotary club connection preferred. Strong character and service commitment.',
    nationality: 'all', japanese_requirement: 'none',
    application_deadline: '2025-07-31',
    exam_subjects: [], interview_required: true,
    duration: '1-2 years',
    field_of_study: ['Vocational Training', 'Leadership', 'Peace Studies', 'Public Health', 'Education'],
    application_route: 'organization', official_link: 'https://www.rotary.org/en/our-programs/scholarships',
    tags: ['Rotary', 'Foundation', 'Fully Funded', 'Leadership', 'Community Service'],
    description: 'Rotary Foundation vocational training grants support community leaders pursuing study in Japan. Recipients must demonstrate commitment to community service and international understanding.',
    benefits: ['Variable monthly stipend', 'Tuition coverage', 'Travel allowance', 'Rotary network access'],
    documents_required: ['Rotary application form', 'Community service record', 'Recommendation from local Rotary club', 'Study plan', 'References'],
    slug: 'rotary-japan-2025', featured: true, active: true,
  },
  {
    scholarship_name: 'Sony Foundation Scholarship 2025',
    provider: 'Sony Corporation',
    category: 'foundation', level: ['masters', 'phd'], scholarship_type: 'Corporate Foundation',
    funding_type: 'fully_funded', stipend: '¥200,000/month', stipend_amount: 200000,
    tuition_covered: true, age_limit_max: 30,
    eligibility: 'Exceptional talent in technology, engineering, or creative arts. Strong research record. Japanese N3 or higher preferred.',
    nationality: 'all', japanese_requirement: 'n3',
    application_deadline: '2025-09-01',
    exam_subjects: [], interview_required: true,
    duration: '2 years',
    field_of_study: ['Engineering', 'Computer Science', 'Creative Arts', 'Technology Innovation'],
    application_route: 'direct', official_link: 'https://www.sony.com',
    tags: ['Sony', 'Corporate', 'Fully Funded', 'Technology', 'Innovation', 'Premium Stipend'],
    description: 'Sony Foundation awards this premium scholarship to future innovators in technology and creative arts. One of Japan\'s highest-value private scholarships at ¥200,000/month.',
    benefits: ['¥200,000/month stipend (highest among private scholarships)', 'Full tuition', 'Sony internship opportunity', 'Industry mentorship'],
    documents_required: ['Portfolio/research samples', 'Academic transcripts', 'Research proposal', 'Recommendation letters', 'Japanese certificate'],
    slug: 'sony-foundation-2025', featured: false, active: true,
  },
  {
    scholarship_name: 'JASSO Honors Scholarship',
    provider: 'Japan Student Services Organization (JASSO)',
    category: 'jasso', level: ['undergraduate'], scholarship_type: 'Merit-based',
    funding_type: 'stipend_only', stipend: '¥48,000/month', stipend_amount: 48000,
    tuition_covered: false, age_limit_max: 30,
    eligibility: 'Enrolled at Japanese university. Excellent academic performance. Financial need considered.',
    nationality: 'all', japanese_requirement: 'n4',
    application_deadline: '2025-10-01',
    exam_subjects: [], interview_required: false,
    duration: '1-4 years',
    field_of_study: ['All Fields'],
    application_route: 'university', official_link: 'https://www.jasso.or.jp',
    tags: ['JASSO', 'Merit', 'Monthly Stipend', 'Undergraduate', 'In-Japan'],
    description: 'Monthly stipend award for high-achieving international undergraduate students already enrolled at Japanese universities. Apply through your university\'s international student office.',
    benefits: ['¥48,000/month stipend', 'No repayment required', 'Academic recognition'],
    documents_required: ['Application form', 'Academic transcript', 'Enrollment certificate', 'Financial need statement'],
    slug: 'jasso-honors-scholarship', featured: false, active: true,
  },
]

async function seed() {
  console.log('🌱 Seeding Japan With Adi database...\n')

  // Insert scholarships
  console.log(`📚 Inserting ${scholarships.length} scholarships...`)
  const { data, error } = await supabase
    .from('scholarships')
    .upsert(scholarships, { onConflict: 'slug' })
    .select('id, scholarship_name')

  if (error) {
    console.error('❌ Error inserting scholarships:', error.message)
    process.exit(1)
  }

  console.log(`✅ Inserted ${data?.length} scholarships`)
  data?.forEach(s => console.log(`   • ${s.scholarship_name}`))

  // Sample webinars
  const webinars = [
    {
      title: 'MEXT Embassy 2025: Complete Application Masterclass',
      speaker: 'Japan With Adi Team',
      speaker_title: 'MEXT Scholarship Advisors',
      date: '2025-06-14T13:30:00Z',
      duration_minutes: 90,
      topics: ['Embassy Route', 'Exam Strategy', 'Interview Tips', 'Documents'],
      registered_count: 1240,
      is_free: true,
    },
    {
      title: 'JASSO Scholarships Deep Dive: All Types Explained',
      speaker: 'Japan With Adi Team',
      speaker_title: 'Scholarship Advisors',
      date: '2025-06-21T12:30:00Z',
      duration_minutes: 75,
      topics: ['JASSO Types', 'Eligibility', 'Application Process'],
      registered_count: 890,
      is_free: true,
    },
  ]

  const { error: webError } = await supabase.from('webinars').upsert(webinars, { onConflict: 'title' })
  if (!webError) console.log(`\n✅ Inserted ${webinars.length} webinars`)

  console.log('\n🎉 Database seeded successfully!')
  console.log('📊 Summary:')
  console.log(`   Scholarships: ${scholarships.length}`)
  console.log(`   Webinars: ${webinars.length}`)
  console.log('\n🚀 Japan With Adi is ready to launch!')
}

seed()
