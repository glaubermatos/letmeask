import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg'

import { Button } from '../components/Button'
import { Logo } from '../components/Logo'

import '../styles/auth.scss'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom() {

    const [newRoom, setNewRoom] = useState('')

    const history = useHistory()

    const { user } = useAuth()
    if (!user) {
        history.push('/')
    }

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
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
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.currentTarget.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                        <p>
                            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )
}