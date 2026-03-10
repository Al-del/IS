import { Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthSession, AuthResponse, User } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signals for reactive state
    public session = signal<AuthSession | null>(null);
    public user = signal<User | null>(null);

    constructor(private readonly supabaseService: SupabaseService) {
        this.supabaseService.client.auth.getSession().then(({ data: { session } }) => {
            this.updateState(session);
        });

        this.supabaseService.client.auth.onAuthStateChange((_event, session) => {
            this.updateState(session);
        });
    }

    private updateState(session: AuthSession | null) {
        this.session.set(session);
        this.user.set(session?.user ?? null);
    }

    async signUp(email: string, passwordRaw: string, firstName?: string, lastName?: string): Promise<AuthResponse> {
        return this.supabaseService.client.auth.signUp({
            email,
            password: passwordRaw,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName
                }
            }
        });
    }

    async signIn(email: string, passwordRaw: string): Promise<AuthResponse> {
        return this.supabaseService.client.auth.signInWithPassword({
            email,
            password: passwordRaw,
        });
    }

    async signInWithGoogle() {
        return this.supabaseService.client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin, // Redirect back to the app after login
            }
        });
    }

    async signOut(): Promise<void> {
        await this.supabaseService.client.auth.signOut();
    }
}
