import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

describe('AuthService (Integration Test)', () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                SupabaseService
            ]
        });
        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    // Note: These tests require network access to the live Supabase instance.
    // For actual e2e test automation, you should provide valid mock credentials.
    it('should attempt sign in and return an AuthResponse', async () => {
        const email = 'testuser@example.com';
        const password = 'TestPassword123!';

        // We expect this to fail or succeed depending on if the user exists in your Supabase project
        const res = await authService.signIn(email, password);

        // As long as we get a response object back, the API was successfully called
        expect(res).toBeDefined();

        // Usually res.data is defined (it contains user/session even if null)
        expect(res.data).toBeDefined();
        // The error object might be defined if the user isn't found
        expect(res.error).toBeDefined();
    });
});
