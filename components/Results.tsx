import React from 'react'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import { useTranslations } from '@/hooks/useTranslations'

interface ResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const { t } = useTranslations()
  const percentage = (score / totalQuestions) * 100

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">{t('quiz.results.title')}</h2>
      <p className="text-2xl mb-4">
        {t('quiz.results.yourScore')} {score} / {totalQuestions}
      </p>
      <Progress value={percentage} className="mb-4" />
      <div className="flex justify-center space-x-4 mt-6">
        <button 
          onClick={onRestart} 
          className="px-4 py-2 bg-blue-500 text-white-500 rounded hover:bg-blue-600 transition-colors"
        >
          {t('quiz.results.restart')}
        </button>

        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-blue-500 text-white-500 rounded hover:bg-blue-600 transition-colors"
        >
          {t('quiz.results.backToDashboard')}
        </Link>

        <Link 
          href="/questionnaire" 
          className="px-4 py-2 bg-blue-500 text-white-500 rounded hover:bg-blue-600 transition-colors"
        >
          {t('quiz.results.goToQuestionnaire')}
        </Link>
      </div>
    </div>
  )
}

export default Results