export type ClientStatus = 'active' | 'paused' | 'completed' | 'lead'
export type LeadStage = 'new' | 'contacted' | 'call_scheduled' | 'proposal_sent' | 'converted' | 'lost'
export type PostStatus = 'draft' | 'published' | 'scheduled'
export type PaymentStatus = 'paid' | 'pending' | 'overdue'
export type ProgramTier = '1on1' | 'group' | 'course'

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  program: ProgramTier
  status: ClientStatus
  startDate: string
  goals: string[]
  notes: string
  avatar?: string
}

export interface CreateClientDto {
  name: string
  email: string
  program: ProgramTier
  status: ClientStatus
  startDate: string
  goals?: string[]
  notes?: string
}

export type UpdateClientDto = Partial<CreateClientDto>

export interface Booking {
  id: string
  clientId: string
  clientName: string
  date: string
  duration: number // minutes
  type: 'discovery' | 'coaching'
  notes?: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export type UpdateBookingDto = Partial<Omit<Booking, 'id' | 'clientId'>>

export interface RevenueRecord {
  id: string
  clientId: string
  clientName: string
  amount: number
  program: ProgramTier
  status: PaymentStatus
  date: string
  invoiceUrl?: string
}

export interface Lead {
  id: string
  name: string
  email: string
  monthlyRevenue: string
  challenge: string
  preferredCallTime: string
  stage: LeadStage
  source: string
  createdAt: string
}

export type UpdateLeadDto = Partial<Omit<Lead, 'id' | 'createdAt'>>

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  source: string
}

export interface Campaign {
  id: string
  name: string
  sentAt: string
  openRate: number
  clickRate: number
}

export interface Post {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  status: PostStatus
  publishedAt?: string
  metaTitle?: string
  metaDescription?: string
  content: string
}

export type CreatePostDto = Omit<Post, 'id'>
export type UpdatePostDto = Partial<CreatePostDto>

export interface Testimonial {
  id: string
  clientName: string
  avatar?: string
  quote: string
  resultHighlight?: string
  category: string
  visible: boolean
}

export type CreateTestimonialDto = Omit<Testimonial, 'id'>
export type UpdateTestimonialDto = Partial<CreateTestimonialDto>

export interface AnalyticsSummary {
  totalVisitors: number
  pageViews: number
  conversionRate: number
  topPages: { page: string; views: number }[]
  trafficByDay: { date: string; visitors: number }[]
}

export interface SiteSettings {
  coachName: string
  coachTitle: string
  coachBio: string
  coachPhoto?: string
  email: string
  phone?: string
  socialLinks: Record<string, string>
  programs: { id: string; name: string; price: number; features: string[] }[]
  seoTitle: string
  seoDescription: string
  leadMagnetUrl?: string
}

export type UpdateSettingsDto = Partial<SiteSettings>

export interface Notification {
  id: string
  type: 'booking' | 'lead' | 'payment'
  message: string
  read: boolean
  createdAt: string
}
