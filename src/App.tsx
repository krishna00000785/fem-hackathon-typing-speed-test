import './App.css'
import { Controls } from './components/Controls'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TypingArea } from './components/TypingArea'
import { Container } from './layout/Container'

function App() {
    return (
      <Container>
        <div className='space-y-6'>
          <Header />
          <StatsBar />
          <Controls />
          <TypingArea />
        </div>
      </Container>
  )
}

export default App
