/**
 * Example User model interface mapping to the application's domain.
 * Note: Supabase provides its own User interface from '@supabase/supabase-js',
 * but this can be used to extend or define custom backend profiles.
 */
export interface UserProfile {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    // Add additional app-specific fields here (e.g. role)
}
