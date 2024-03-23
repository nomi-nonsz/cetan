import { ReactComponent as Logo } from "../../../../public/cetan.svg"

function Footer() {
  return (
    <footer className="end">
      <div className="container">
        <header className="name">
          <Logo />
          <h2>Cetan</h2>
        </header>
        <div className="desc">
          A open-source real-time private chat app for study case, made with
          React and Firebase.{" "}
          <a href="https://github.com/norman-andrians/cetan" target="_blank" rel="noreferrer">
            See source code
          </a>
        </div>
        <div className="copy">
          Copyright © {new Date(Date.now()).getUTCFullYear()} Norman Andrians
        </div>
      </div>
    </footer>
  )
}

export default Footer
