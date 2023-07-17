// ** Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import {AuthProvider} from '../@core/context/authContext';

import '../../styles/globals.css'

// ** Loader Import
// ** Emotion Imports
// ** Config Imports
// ** Component Imports
// ** Contexts
// ** Utils Imports
// ** React Perfect Scrollbar Style
// ** Global css styles

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
      <SettingsProvider>
        <SettingsConsumer>
                    {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
                  </SettingsConsumer>
      </SettingsProvider>
         </AuthProvider>
    </CacheProvider>
  )
}

export default App
