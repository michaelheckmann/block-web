import { AuthContext } from '@redwoodjs/auth/dist/AuthProvider'

export const decorators = [
  (Story) => (
    <AuthContext.Provider
      value={{
        isAuthenticated: true,
        userMetadata: {
          id: 1,
        },
      }}
    >
      <Story />
    </AuthContext.Provider>
  ),
]
