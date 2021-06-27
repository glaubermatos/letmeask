import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import signInImg from '../assets/images/sign-in.svg'

import { Button } from '../components/Button'
import { Logo } from '../components/Logo'

import '../styles/auth.scss'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'

export function Home() {

    const [roomCode, setRoomCode] = useState('')

    const { user, signInWithGoogle } = useAuth()

    const history = useHistory()

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed.')
            return
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <Logo />
                    {/* <img src={logoImg} alt="Letmeask" /> */}
                    <button
                        className="create-room"
                        onClick={handleCreateRoom}
                    >
                        <GoogleImg />
                        {/* <img src={googleIconImg} alt="Logo do Google" /> */}
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.currentTarget.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            <SignInImg />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

function GoogleImg() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C13.6168 5 15.1013 5.55353 16.2863 6.47406L19.9235 3.00409C17.8088 1.13995 15.0406 0 12 0C7.3924 0 3.39667 2.59991 1.3858 6.40985L5.43024 9.60278C6.40997 6.91937 8.97748 5 12 5Z" fill="#FEFEFE" />
            <path d="M23.8961 13.5018C23.9586 13.0102 24 12.5087 24 12C24 11.1422 23.9063 10.3068 23.7352 9.5H12V14.5H18.4862C17.9615 15.8638 17.0272 17.0178 15.838 17.8195L19.8975 21.0243C22.0494 19.1354 23.522 16.4904 23.8961 13.5018Z" fill="#FEFEFE" />
            <path d="M5 12C5 11.1566 5.15686 10.3516 5.43024 9.60278L1.3858 6.40985C0.504333 8.08002 0 9.98016 0 12C0 13.9973 0.495056 15.8763 1.35822 17.533L5.40778 14.3359C5.14844 13.6044 5 12.8204 5 12Z" fill="#FEFEFE" />
            <path d="M12 19C8.95447 19 6.37042 17.0515 5.40778 14.3359L1.35822 17.533C3.35925 21.3735 7.36981 24 12 24C15.0278 24 17.7888 22.8752 19.8975 21.0243L15.838 17.8195C14.7412 18.5589 13.4284 19 12 19Z" fill="#FEFEFE" />
            <path opacity="0.1" d="M12 23.75C8.46832 23.75 5.29272 22.2928 3.04755 19.9713C5.24536 22.4378 8.43646 24 12 24C15.5306 24 18.6953 22.4686 20.8881 20.0408C18.6496 22.3246 15.4981 23.75 12 23.75Z" fill="#FEFEFE" />
            <path opacity="0.1" d="M12 14.25V14.5H18.4862L18.5875 14.25H12Z" fill="#FEFEFE" />
            <path d="M23.9944 12.147C23.9952 12.0978 24 12.0494 24 12C24 11.986 23.9978 11.9725 23.9977 11.9586C23.9971 12.0215 23.9939 12.0838 23.9944 12.147Z" fill="#E6E6E6" />
            <path opacity="0.2" d="M12 9.5V9.75H23.7856C23.7698 9.66748 23.7526 9.58191 23.7352 9.5H12Z" fill="#FEFEFE" />
            <path d="M23.7352 9.5H12V14.5H18.4862C17.4775 17.1216 14.9772 19 12 19C8.13403 19 5 15.866 5 12C5 8.13397 8.13403 5 12 5C13.4019 5 14.6939 5.43066 15.7885 6.14069C15.9561 6.24957 16.1289 6.35181 16.2863 6.47406L19.9235 3.00409L19.8414 2.94098C17.7369 1.11707 15.0035 0 12 0C5.37256 0 0 5.37256 0 12C0 18.6274 5.37256 24 12 24C18.1177 24 23.1555 19.4188 23.8961 13.5018C23.9586 13.0102 24 12.5087 24 12C24 11.1422 23.9063 10.3068 23.7352 9.5Z" fill="#FEFEFE" />
            <path opacity="0.1" d="M15.7885 5.89069C14.6939 5.18066 13.4019 4.75 12 4.75C8.13403 4.75 5 7.88397 5 11.75C5 11.7922 5.00057 11.8251 5.0013 11.8672C5.06874 8.05951 8.17621 5 12 5C13.4019 5 14.6939 5.43066 15.7885 6.14069C15.9561 6.24957 16.1289 6.35181 16.2863 6.47406L19.9235 3.00409L16.2863 6.22406C16.1289 6.10181 15.9561 5.99957 15.7885 5.89069Z" fill="#FEFEFE" />
            <path opacity="0.2" d="M12 0.25C14.975 0.25 17.6829 1.34839 19.7793 3.1416L19.9235 3.00409L19.8134 2.90827C17.709 1.08436 15.0035 0 12 0C5.37256 0 0 5.37256 0 12C0 12.0422 0.0058594 12.0829 0.0062866 12.125C0.0740356 5.55585 5.41473 0.25 12 0.25Z" fill="#FEFEFE" />
        </svg>
    )
}

function SignInImg() {
    return (
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2.5H16.3333C16.7754 2.5 17.1993 2.67559 17.5118 2.98816C17.8244 3.30072 18 3.72464 18 4.16667V15.8333C18 16.2754 17.8244 16.6993 17.5118 17.0118C17.1993 17.3244 16.7754 17.5 16.3333 17.5H13" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.83331 14.1666L13 9.99998L8.83331 5.83331" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 10H3" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}