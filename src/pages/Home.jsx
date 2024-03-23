import { useContext } from "react"

import ConnectedPPL from "../assets/svg/homepage/connected-ppl.svg"
import SyncFeature from "../assets/svg/homepage/sync-feature.svg"
import FilesConnected from "../assets/svg/homepage/files-connected.svg"
import AIAssistant from "../assets/svg/homepage/ai-assistant.svg"

import { ReactComponent as Interconnected1 } from "../assets/svg/homepage/interconnected-1.svg"
import { ReactComponent as Interconnected2 } from "../assets/svg/homepage/interconnected-2.svg"

import Lain from "../assets/img/lain-iwakura.jpg"

import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

function Feature({ gap, reverse, className, id, children }) {
  return (
    <section
      className={`container feature ${className}`}
      id={id}
      style={{ gap, flexDirection: reverse ? "row-reverse" : "row" }}
    >
      {children}
    </section>
  )
}

function Home() {
  const { currentUser } = useContext(AuthContext)

  const _route_to_enter = currentUser ? "/chats" : "/signup"

  return (
    <main className="home-body">
      <main className="home-main-container">
        <section className="container hero">
          <div className="image">
            <img src={ConnectedPPL} alt="Connected People" />
          </div>
          <div className="contain">
            <header>
              <h1 className="header">Start your private chat with cetan -</h1>
              <p className="content">idk what content need to show</p>
            </header>
            <div className="buttons">
              <Link to={_route_to_enter}>
                <div className="btn-primary">
                  {currentUser ? "Continue Chating" : "Start Chating"}
                </div>
              </Link>
              <Link to={"/"}>
                <div className="btn-secondary">Learn more</div>
              </Link>
            </div>
          </div>
        </section>
        <Feature className="feature-sync" id={"sync-chat"}>
          <div className="image">
            <picture>
              <img src={SyncFeature} alt="Sync Feature" />
            </picture>
          </div>
          <div className="contain">
            <h1 className="header">Synchronize chats in real-time</h1>
            <p className="content">
              When you successfully send a message, your message will instantly
              appear to the receiver
            </p>
          </div>
        </Feature>
        <Feature className="feature-sync" reverse={true}>
          <div className="image">
            <picture>
              <img src={FilesConnected} alt="File Connected" />
            </picture>
          </div>
          <div className="contain">
            <h1 className="header">Send images and documents</h1>
            <p className="content">
              Cetan is capable of sending pictures and documents, share your
              moments with your friends and family. Also share your work with
              your coworkers or teachers.
            </p>
          </div>
        </Feature>
        <Feature className="feature-sync">
          <div className="image">
            <picture>
              <img src={AIAssistant} alt="AI Assistant" />
            </picture>
          </div>
          <div className="contain">
            <h1 className="header">
              Ask the AI Assistant (GPT-3.5) (Coming soon)
            </h1>
            <p className="content">
              Cetan is capable of sending pictures and documents, share your
              moments with your friends and family. Also share your work with
              your coworkers or teachers.
            </p>
          </div>
        </Feature>
        <section className="qoutes lain-qoutes">
          <div className="text">
            <header className="container">
              <h1 className="header">
                “No matter where you are, everyone is always connected”
              </h1>
              <p>- Iwakura Lain</p>
            </header>
          </div>
          <div
            className="lain-bg"
            style={{ backgroundImage: `url(${Lain})` }}
          ></div>
        </section>
        <section className="last">
          <div className="contain">
            <h1 className="header">
              {!currentUser
                ? "Now let's start your first conversation"
                : "Now let's continue your conversation"}
            </h1>
            <Link to={_route_to_enter}>
              <div className="btn-primary">
                {!currentUser ? "Get Started" : "Continue"}
              </div>
            </Link>
          </div>
          <Interconnected1 />
          <Interconnected2 />
        </section>
      </main>
    </main>
  )
}

export default Home
