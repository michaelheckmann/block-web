import { AuthProvider } from '@redwoodjs/auth'
import WebAuthnClient from '@redwoodjs/auth/webAuthn'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { Toaster } from '@redwoodjs/web/toast'
import './index.css'
import './scaffold.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth" client={WebAuthnClient}>
        <RedwoodApolloProvider>
          <Routes />
          <Toaster />
          <div id="toast-overlay"></div>
          <div id="popover-root"></div>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
