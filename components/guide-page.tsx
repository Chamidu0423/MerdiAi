"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, MessageCircle, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function GuidePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayClick = () => {
    setShowVideo(true)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setShowVideo(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0]
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (showVideo && videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log('Video autoplay failed:', error)
        setIsPlaying(false)
      })
    }
  }, [showVideo])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.log('Video play failed:', error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    console.log('Current time:', currentTime, 'Show alert:', showApiKeyAlert)
    if (currentTime >= 12 && currentTime < 13 && !showApiKeyAlert) {
      console.log('Triggering alert at:', currentTime)
      setShowApiKeyAlert(true)
      setTimeout(() => setShowApiKeyAlert(false), 30000)
    }
  }, [currentTime, showApiKeyAlert])

  return (
    <main className="flex-1 w-full relative">
      <div className="fixed inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            MerdiAI Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn how to create beautiful diagrams with MerdiAI in just a few minutes
          </p>
        </div>

        {showApiKeyAlert && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 fade-in duration-300">
            <div className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-lg p-4 max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Get Your API Key</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For API key, go to{" "}
                    <a
                      href="https://openrouter.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                    >
                      https://openrouter.ai/
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => setShowApiKeyAlert(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20" style={{boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 8px 20px rgba(59, 130, 246, 0.2)'}}>
            <div className="w-full h-full rounded-2xl overflow-hidden bg-black">
            {!showVideo ? (
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={handlePlayClick}
              >
                <img
                  src="/guide-thumbnail.png"
                  alt="MerdiAI Guide Thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback')
                    if (fallback) (fallback as HTMLElement).style.display = 'flex'
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </div>

                <div className="fallback absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center hidden">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary ml-1" />
                    </div>
                    <p className="text-muted-foreground">Click to watch the tutorial</p>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={containerRef} className="relative w-full h-full bg-black group cursor-pointer" onClick={togglePlayPause}>
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnd}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  muted={isMuted}
                >
                  <source src="/guide.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-black shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlayPause()
                      }}
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={0.1}
                      onValueChange={handleProgressChange}
                      className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.relative]:bg-white/30 [&_[role=slider]:focus]:ring-white/50"
                    />
                    <div className="flex justify-between text-white text-sm mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlayPause()
                        }}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleMute()
                          }}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <div className="w-20">
                          <Slider
                            value={[isMuted ? 0 : volume]}
                            max={1}
                            step={0.1}
                            onValueChange={handleVolumeChange}
                            className="volume-slider [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.relative]:bg-white/30 [&_[role=slider]:focus]:ring-white/50"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFullscreen()
                      }}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Text to Diagram</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to convert your ideas into professional diagrams using simple text descriptions
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Customization</h3>
              <p className="text-sm text-muted-foreground">
                Discover how to customize themes, layouts, and styles for your diagrams
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Export & Share</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to download and share your diagrams in various formats
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}