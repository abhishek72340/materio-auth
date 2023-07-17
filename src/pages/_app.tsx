// ** Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
// ** Loader Import
import NProgress from 'nprogress'
// ** Emotion Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import ThemeComponent from 'src/@core/theme/ThemeComponent'
// ** Config Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
// ** Component Imports
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
// ** Contexts
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// ** Utils Imports
import {AuthProvider} from '../@core/context/authContext';
// ** React Perfect Scrollbar Style
// ** Global css styles
import PrivateRoute from '/src/@core/hooks/usePrivate';

import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
<AuthProvider>
     <PrivateRoute>
      <SettingsProvider>
        <SettingsConsumer>
          
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
          
        </SettingsConsumer>
      </SettingsProvider>
    </PrivateRoute>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
