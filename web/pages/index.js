import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import AnnouncementList, {
  ALL_ANNOUNCEMENTS_QUERY } from '../components/AnnouncementList'
import CreateAnnouncement from '../components/CreateAnnouncement'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <Submit />
    <CreateAnnouncement/>
    <AnnouncementList />
  </App>
)

export async function getStaticProps() {
  
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_ANNOUNCEMENTS_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
