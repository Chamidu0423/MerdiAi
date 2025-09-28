'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion'

const FaqPage = () => {
  const router = useRouter()

  const faqItems = [
    {
      question: "What is Merdiai?",
      answer: "Merdiai is an AI-powered text-to-diagram conversion tool that allows you to quickly create flowcharts, sequence diagrams, mind maps, and other visual representations from plain text descriptions. Simply describe your diagram in natural language, and Merdiai will generate a visual representation for you."
    },
    {
      question: "What types of diagrams can I create with Merdiai?",
      answer: "Merdiai supports various diagram types including flowcharts, sequence diagrams, entity-relationship diagrams, class diagrams, state diagrams, network diagrams, gantt charts, and more. The tool uses the Mermaid syntax behind the scenes, so any diagram type supported by Mermaid can be generated."
    },
    {
      question: "How do I export or share my diagrams?",
      answer: "Once you've generated a diagram, you can export it as SVG, PNG, or as a Mermaid code snippet. You can also copy a shareable link to your diagram or embed it directly into documentation, presentations, or websites."
    },
    {
      question: "Do I need to know Mermaid syntax to use Merdiai?",
      answer: "Not at all! That's the beauty of Merdiai. You can describe your diagram in plain English, and our AI will convert it to Mermaid syntax automatically. However, if you're familiar with Mermaid syntax, you can also provide it directly and edit the generated code manually for more precise control."
    },
    {
      question: "What AI models power Merdiai?",
      answer: "Merdiai is flexible and can work with various AI models through OpenRouter. You can configure your preferred AI model in the Settings page by providing your own API key and model name. This allows you to choose models that best suit your specific needs and budget."
    }
  ]

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,192,203,0.6),_rgba(221,160,221,0.4),_rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_center,_rgba(139,0,139,0.6),_rgba(75,0,130,0.5),_rgba(18,18,18,1))] transition-colors">
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={handleBack}
            className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-7 h-7 text-black dark:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
            <h1 className="text-2xl font-semibold text-black dark:text-white">Frequently Asked Questions</h1>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-white/10 p-8 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  <p className="text-sm md:text-base leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg border border-blue-300/50 dark:border-blue-700/50">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Need more help?
          </h3>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            If your question isn't answered here, feel free to contact us through our <span 
            onClick={() => router.push('/contact')}
            className="underline cursor-pointer">contact page</span> or check our documentation for more detailed information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FaqPage