import Stripe from 'stripe'

// MARK: Song
export interface Song {
  id: string
  user_id: string
  author: string
  title: string
  song_path: string
  image_path: string
}

export interface Singer {
  id: string

}

export interface UserDetails {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}
