'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';

export default function PostQuiz() {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslations(); // Add translation hook

  const [formData, setFormData] = useState({
    dispositif: '',
    engagement: '',
    identification: '',
    formation: '',
    procedure: '',
    dispositifAlert: '',
    certifierISO: '',
    mepSystem: '',
    intention: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          ...formData
        }),
      });
  
      if (response.ok) {
        setFormData({
          dispositif: '',
          engagement: '',
          identification: '',
          formation: '',
          procedure: '',
          dispositifAlert: '',
          certifierISO: '',
          mepSystem: '',
          intention: '',
        });
        router.push('/dashboard');
      } else {
        alert(t('questionnaire.updateFailed'));
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert(t('questionnaire.updateError'));
    } finally {
      setLoading(false);
    }
  };

  // Questions array with translated labels
  const questions = [
    { id: 'dispositif', label: t('questionnaire.questions.dispositif') },
    { id: 'engagement', label: t('questionnaire.questions.engagement') },
    { id: 'identification', label: t('questionnaire.questions.identification') },
    { id: 'formation', label: t('questionnaire.questions.formation') },
    { id: 'procedure', label: t('questionnaire.questions.procedure') },
    { id: 'dispositifAlert', label: t('questionnaire.questions.dispositifAlert') },
    { id: 'certifierISO', label: t('questionnaire.questions.certifierISO') },
    { id: 'mepSystem', label: t('questionnaire.questions.mepSystem') },
    { id: 'intention', label: t('questionnaire.questions.intention') },
  ];

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md bg-white-500 rounded-lg shadow-lg border-none">
        <CardHeader className="space-y-2 p-4">
          <CardTitle className="text-2xl font-bold text-center text-blue-500">
            {t('questionnaire.title')}
          </CardTitle>
          <CardDescription className="text-center text-gray-500 text-sm">
            {t('questionnaire.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id} className="text-sm font-medium text-gray-600">
                  {question.label}
                </Label>
                <Input
                  id={question.id}
                  name={question.id}
                  value={formData[question.id as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  placeholder={t('questionnaire.placeholder')}
                  className="w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                />
              </div>
            ))}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 text-white-500 rounded-md py-2 text-sm font-medium ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('questionnaire.submitting')}
                </span>
              ) : t('common.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}