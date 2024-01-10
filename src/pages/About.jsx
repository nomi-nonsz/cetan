import AnImage from "../assets/img/about.png";

function About () {
    return (
        <div className="home-body">
            <div className="container container-fo-nav">
                <picture>
                    <img style={{ margin: "auto", display: "block" }} src={AnImage} alt="cetan and nola" />
                </picture>
                <h1 className="text-center">Cetan: A Simple Real-time chat</h1>
                <article>
                    <p>
                        My first firebase chat app :D Yayy! i was kinda worried that this project would end just because of stuck skills, but now it's going well.
                    </p>
                </article>
                <article>
                    <h2>About</h2>
                    <p>
                        Cetan is my first real-time private chat app built with React and Firebase. The original purpose of making this web app was to introduce and try to make a real-time app with the help of firebase, besides that this is the first dream, it's a shame that I practiced web programming for more than 3 years and never made something like this.
                    </p>
                    <p>
                        Although we didn't plan the app system in writing (document or visual) from the beginning, because we only followed one procedure. However, I wasn't satisfied with the features provided, the procedure features were too few and felt not production-worthy. And as is my habit, I always make practice projects that, if feasible, I will turn into products.
                    </p>
                    <p>
                        Oh yeah by the way this project is open-source, you can see the codebase of this app on <a href="https://github.com/norman-andrians/cetan" target="_blank" rel="noopener noreferrer">github</a>
                    </p>
                </article>
                <article>
                    <h2>Features</h2>
                    <ul>
                        <li>
                            Mobile Responsive design
                        </li>
                        <li>
                            Realtime Chat
                        </li>
                        <li>
                            Passwordless Authentication
                        </li>
                        <li>
                            Send multiple images and files included
                        </li>
                    </ul>
                </article>
                <article>
                    <h2>Upcoming Features</h2>
                    <ul>
                        <li>
                            Theme costumization
                        </li>
                        <li>
                            Group Chat
                        </li>
                        <li>
                            Sound Recording
                        </li>
                        <li>
                            GPT-3.5 Chatbot
                        </li>
                        <li>
                            Generate AI images with chat
                        </li>
                    </ul>
                </article>
                <article>
                    <h2>Vulnerabilities</h2>
                    <ul>
                        <li>
                            It's not recommended to send highly sensitive data or information
                        </li>
                        <li>
                            Lack of caching and some resource tests may impact performance
                        </li>
                        <li>
                            And some lack of knowledge, it affects the magnitude of vulnerabilities in the security system
                        </li>
                    </ul>
                </article>
                <article>
                    <h2>Migration Plans</h2>
                    <p>
                        If I get good enough at fullstack web development with Next.js maybe I'll migrate this React + Vite project with Next and without the need for backend services from firebase, we'll create our own real-time app.
                    </p>
                </article>
                <article>
                    <h2>Credits</h2>
                    <ul>
                        <li>
                            <div className="font-bold">Norman Andrians</div>
                            Programmer, Designer, Founder.
                        </li>
                        <li>
                            <div className="font-bold">Just Me</div>
                        </li>
                        <li>
                            <div className="font-bold">Just Me</div>
                        </li>
                        <li>
                            <div className="font-bold">Just Me :')</div>
                        </li>
                    </ul>
                </article>
                <article className="pb-large">
                    <h2>Special Thanks ♥️</h2>
                    <p>
                        Cetan web app is made based on the guidance and reference from the <b><a href="https://www.youtube.com/@LamaDev/featured" target="_blank" rel="noopener noreferrer">Lama Dev</a></b> tutorial. If you don't know, a lot of my dream projects got stuck due to lack of direction and procedures that made me stop working on the project forever.
                    </p>
                    <p>
                        This app may not be able to proceed if it does not follow the procedure. Although many things are lacking from the video but from a little study of this tutorial, I can build my first dream web app with Firebase without getting stuck.
                    </p>
                    <p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/k4mjF4sPITE?si=whb_baIjkkDWwmFu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </p>
                </article>
            </div>
        </div>
    )
}

export default About;