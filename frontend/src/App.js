import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Mainpage from './Mainpage/Mainpage'
import Login from './Mainpage/Login'
import Mypage from './Mypage/Mypage'
import SnakeGame from './Games/SnakeGame/SnakeGame'
import Pong from './Games/Pong/Pong'
import Ranking from './Ranking'
import PongWaitingHost from './Games/Pong/PongWaitingHost'
import PongWaitingGeust from './Games/Pong/PongWaitingGuest'

function App() {
  const user = 'user'
  return (
    <div>
      {/* temporary navigation Link */}
      <nav>
        <Link to="/">메인페이지</Link> |
        <Link to="/login"> 로그인</Link> |
        <Link to={{
          pathname: `/mypage/${user}`,
          state: { user: user },
        }}>
          마이페이지
        </Link> |
        <Link to="/snake"> 뱀 게임</Link> |
        <Link to="/pong"> 탁구 게임</Link> |
        <Link to="/ranking"> 랭킹</Link> |
        <Link to="/pongwaiting/host"> 호스트 대기실</Link> |
        <Link to="/pongwaiting/guest"> 게스트 대기실</Link> |
      </nav>
      {/* Router setting */}
      <Switch>
        <Route exact path="/" component={Mainpage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/mypage/:user" component={Mypage}></Route>
        <Route path="/snake" component={SnakeGame}></Route>
        <Route path="/pong" component={Pong}></Route>
        <Route path="/ranking" component={Ranking}></Route>
        <Route path="/pongwaiting/host" component={PongWaitingHost}></Route>
        <Route path="/pongwaiting/guest" component={PongWaitingGeust}></Route>
      </Switch>
    </div>
  )
}

  export default App