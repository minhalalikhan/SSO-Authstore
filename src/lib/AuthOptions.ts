
import { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

    pages: {
        signIn: '/',


    },

    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials) {


                return { email: credentials?.email, id: credentials?.email.toString() || '' }



            },

        })
        // GoogleProvider({})
    ],
    cookies: {
        sessionToken: {
            name: 'AuthStore.session-token',
            options: {
                httpOnly: true,
                sameSite: 'Lax',
                path: '/',
            },
        },
    },
    callbacks: {
        async jwt({ token }) {



            return token
        },
        async session({ session }) {



            return session
        }
    },

}