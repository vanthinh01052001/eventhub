export class Validate {
    static email(mail: string): { isValid: boolean, error?: string } {
        const outlookOrGmailRegex = /^[a-zA-Z0-9._%+-]+@(outlook\.com|gmail\.com)$/;
        
        if (!mail) {
            return { isValid: false, error: 'Email is required.' };
        }

        if (!outlookOrGmailRegex.test(mail)) {
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
                return { isValid: false, error: 'Invalid email format.' };
            }
            return { isValid: false, error: 'Email must be a Gmail or Outlook address.' };
        }

        return { isValid: true };
    }

    static password(pwd: string): { isValid: boolean, error?: string } {
        const minLength = 8;
        const errors: string[] = [];

        if (pwd.length < minLength) {
            errors.push(`Password must be at least ${minLength} characters long.`);
        }
        if (!/[A-Z]/.test(pwd)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/[a-z]/.test(pwd)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!/\d/.test(pwd)) {
            errors.push('Password must contain at least one number.');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
            errors.push('Password must contain at least one special character.');
        }

        if (errors.length > 0) {
            return { isValid: false, error: errors.join(' ') };
        }

        return { isValid: true };
    }
}
