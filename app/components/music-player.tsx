'use client'

import Script from 'next/script'
import { useCallback, useRef, useState } from 'react'

const albums = [
  {
    url: 'https://soundcloud.com/nataliagranato/sets/celestial',
    label: 'Ato I',
    title: 'Ascensão e Fagulhas',
  },
  {
    url: 'https://soundcloud.com/nataliagranato/sets/celeste',
    label: 'Ato II',
    title: 'A Colisão, o Encanto e a Luz de Kandinsky',
  },
] as const

type Sound = { title?: string; duration?: number }
type Widget = {
  bind: (event: string, callback: (event?: { currentPosition?: number }) => void) => void
  getCurrentSound: (callback: (sound: Sound) => void) => void
  getDuration: (callback: (duration: number) => void) => void
  getPosition: (callback: (position: number) => void) => void
  isPaused: (callback: (paused: boolean) => void) => void
  load: (url: string, options: Record<string, unknown>) => void
  next: () => void
  pause: () => void
  play: () => void
  prev: () => void
  seekTo: (milliseconds: number) => void
}

declare global {
  interface Window {
    SC?: {
      Widget: ((iframe: HTMLIFrameElement) => Widget) & {
        Events: Record<string, string>
      }
    }
  }
}

function formatTime(milliseconds: number) {
  if (!Number.isFinite(milliseconds)) return '0:00'
  const seconds = Math.max(0, Math.floor(milliseconds / 1000))
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

function Icon({ name }: { name: 'play' | 'pause' | 'previous' | 'next' }) {
  if (name === 'play') {
    return <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />
  }
  if (name === 'pause') {
    return <path d="M9 7v10M15 7v10" />
  }
  if (name === 'previous') {
    return <path d="M7 6v12M17 7l-7 5 7 5V7Z" />
  }
  return <path d="M17 6v12M7 7l7 5-7 5V7Z" />
}

export function MusicPlayer() {
  const widgetRef = useRef<Widget | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [albumIndex, setAlbumIndex] = useState(0)
  const [trackTitle, setTrackTitle] = useState('HEAVENLY')
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  const syncTrack = useCallback(() => {
    const widget = widgetRef.current
    if (!widget) return
    widget.getCurrentSound((sound) => {
      setTrackTitle(sound?.title || 'HEAVENLY')
      if (sound?.duration) setDuration(sound.duration)
    })
    widget.getDuration(setDuration)
    widget.getPosition(setPosition)
    widget.isPaused((paused) => setPlaying(!paused))
  }, [])

  const initializeWidget = useCallback((iframe: HTMLIFrameElement | null) => {
    if (!iframe || !window.SC || widgetRef.current) return

    const widget = window.SC.Widget(iframe)
    const events = window.SC.Widget.Events
    widgetRef.current = widget
    widget.bind(events.READY, () => {
      setReady(true)
      syncTrack()
    })
    widget.bind(events.PLAY, syncTrack)
    widget.bind(events.PAUSE, () => setPlaying(false))
    widget.bind(events.PLAY_PROGRESS, (event) => {
      if (event?.currentPosition != null) setPosition(event.currentPosition)
    })
    widget.bind(events.FINISH, syncTrack)
  }, [syncTrack])

  function changeAlbum(index: number) {
    const widget = widgetRef.current
    if (!widget || index === albumIndex) return
    setAlbumIndex(index)
    setPosition(0)
    setDuration(0)
    setTrackTitle('Carregando…')
    setPlaying(false)
    widget.load(albums[index].url, {
      auto_play: false,
      hide_related: true,
      show_comments: false,
      show_user: false,
      show_reposts: false,
      show_teaser: false,
    })
  }

  function togglePlayback() {
    const widget = widgetRef.current
    if (!widget || !ready) return
    widget.isPaused((paused) => (paused ? widget.play() : widget.pause()))
  }

  const album = albums[albumIndex]
  const progress = duration ? Math.min(100, (position / duration) * 100) : 0

  return (
    <section id="musica" className="music-player" aria-label="Player de música">
      <Script
        src="https://w.soundcloud.com/player/api.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      {scriptReady && (
        <iframe
          ref={initializeWidget}
          title="Fonte de áudio"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(albums[0].url)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
          allow="autoplay"
          className="music-player-source"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      <div className="music-player-heading">
        <div className="music-player-mark" aria-hidden="true">NG</div>
        <div className="min-w-0">
          <p className="music-player-kicker">Natália Granato · HEAVENLY</p>
          <p className="music-player-title" title={trackTitle}>{trackTitle}</p>
        </div>
      </div>

      <div className="music-player-controls">
        <button type="button" onClick={() => widgetRef.current?.prev()} disabled={!ready} aria-label="Faixa anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true"><Icon name="previous" /></svg>
        </button>
        <button type="button" className="music-player-play" onClick={togglePlayback} disabled={!ready} aria-label={playing ? 'Pausar' : 'Reproduzir'}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><Icon name={playing ? 'pause' : 'play'} /></svg>
        </button>
        <button type="button" onClick={() => widgetRef.current?.next()} disabled={!ready} aria-label="Próxima faixa">
          <svg viewBox="0 0 24 24" aria-hidden="true"><Icon name="next" /></svg>
        </button>
      </div>

      <div className="music-player-timeline">
        <span>{formatTime(position)}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={(event) => widgetRef.current?.seekTo((Number(event.target.value) / 100) * duration)}
          disabled={!duration}
          aria-label="Posição da faixa"
          style={{ '--player-progress': `${progress}%` } as React.CSSProperties}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="music-player-albums" aria-label="Escolher álbum">
        {albums.map((item, index) => (
          <button
            key={item.url}
            type="button"
            className={index === albumIndex ? 'is-active' : ''}
            onClick={() => changeAlbum(index)}
            aria-pressed={index === albumIndex}
            title={item.title}
          >
            {item.label}
          </button>
        ))}
        <span className="sr-only">{album.title}</span>
      </div>
    </section>
  )
}
