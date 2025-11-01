"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/components/Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Loader2 } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';

export default function Attestation() {
  const { data: session } = useSession();
  const { t } = useTranslations();
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current || !session?.user?.email) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        removeContainer: true,
        imageTimeout: 15000,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false
      });

      const imgData = canvas.toDataURL("image/png", 0.8);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const availableWidth = pdfWidth - (2 * margin);
      const availableHeight = pdfHeight - (2 * margin);
      
      const canvasRatio = canvas.width / canvas.height;
      const availableRatio = availableWidth / availableHeight;
      
      let imgWidth, imgHeight, x, y;
      
      if (canvasRatio > availableRatio) {
        imgWidth = availableWidth;
        imgHeight = availableWidth / canvasRatio;
        x = margin;
        y = margin + (availableHeight - imgHeight) / 2;
      } else {
        imgHeight = availableHeight;
        imgWidth = availableHeight * canvasRatio;
        x = margin + (availableWidth - imgWidth) / 2;
        y = margin;
      }

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight, undefined, 'FAST');
      
      pdf.save("certificat.pdf");

      const response = await fetch("/api/certinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update database");
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">{t('certificate.loginRequired')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-screen-lg mx-auto space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold">{t('certificate.title')}</h1>
          <Button onClick={downloadCertificate} disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              t('certificate.download')
            )}
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-auto">
            <div ref={certificateRef}>
              <Certificate
                userName={session.user?.fullName || "Participant"}
                company={session.user?.companyName || "Entreprise"}
                date={new Date()}
                courseName={t('certificate.course')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}