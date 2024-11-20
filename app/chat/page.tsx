'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Send, AlertCircle, RefreshCw, MessageCircle, User } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { ChatHeader } from "@/components/chat-header"

type Message = {
  role: 'user' | 'assistant' | 'error' | 'system'
  content: string
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsTyping(true)
    setError(null)

    try {
      const response = await fetch('https://api.hostbrev.online/webhook/agent_tiktok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`)
      }

      const data = await response.json()
      let assistantMessage = ''
      
      if (Array.isArray(data) && data.length > 0) {
        assistantMessage = data[0].saída || data[0].output || JSON.stringify(data[0])
      } else if (typeof data === 'object' && data !== null) {
        assistantMessage = data.saída || data.output || JSON.stringify(data)
      } else {
        assistantMessage = JSON.stringify(data)
      }

      if (!assistantMessage) {
        throw new Error('Resposta vazia do servidor')
      }

      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantMessage }])
      setRetryCount(0)
    } catch (error) {
      console.error('Erro:', error)
      setError(`Ocorreu um erro ao processar sua solicitação. (Tentativa ${retryCount + 1})`)
      const errorMessage: Message = { 
        role: 'error', 
        content: `Desculpe, houve um erro ao processar sua solicitação. Detalhes do erro: ${error.message}`
      }
      setMessages(prevMessages => [...prevMessages, errorMessage])
      setRetryCount(prevCount => prevCount + 1)
    } finally {
      setIsTyping(false)
    }
  }

  const handleRetry = () => {
    const lastUserMessage = messages.findLast(msg => msg.role === 'user')
    if (lastUserMessage) {
      setInput(lastUserMessage.content)
      handleSubmit(new Event('submit') as any)
    }
  }

  return (
    <div className="min-h-screen pt-4">
      <div className="bg-gray-50 min-h-[calc(100vh-1rem)] rounded-t-[1.5rem]">
        <div className="max-w-[1800px] mx-auto p-8">
          <ChatHeader />
          
          <div className="mt-8">
            <Card className="border-0 shadow-none bg-transparent">
              <div className="relative flex-grow overflow-hidden p-6 h-[calc(100vh-15rem)]">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  <AnimatePresence>
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center items-center h-32"
                      >
                        <div className="text-center text-gray-500">
                          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                          <p className="text-lg">Como posso ajudar você hoje?</p>
                        </div>
                      </motion.div>
                    )}
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className={`mb-4 flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex items-end space-x-2 ${
                            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            message.role === 'user' ? 'bg-blue-600' : 'bg-blue-600'
                          }`}>
                            {message.role === 'user' ? 
                              <User size={24} className="text-white" /> : 
                              <MessageCircle size={24} className="text-white" />
                            }
                          </div>
                          <div
                            className={`max-w-[70%] p-4 rounded-2xl ${
                              message.role === 'user'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : message.role === 'error'
                                ? 'bg-red-100 text-red-900'
                                : message.role === 'system'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-blue-600 text-white shadow-sm'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <MessageCircle size={24} className="text-white" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </ScrollArea>
              </div>
              <div className="p-6 bg-white border-t">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>
                      {error}
                      <Button variant="outline" size="sm" onClick={handleRetry} className="mt-2">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Tentar novamente
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-grow rounded-full border-2 border-blue-600/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    aria-label="Mensagem"
                  />
                  <Button 
                    type="submit" 
                    disabled={isTyping} 
                    className="rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6"
                  >
                    {isTyping ? 
                      <Loader2 className="h-5 w-5 animate-spin" /> : 
                      <Send className="h-5 w-5" />
                    }
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}